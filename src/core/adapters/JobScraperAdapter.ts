/**
 * Infrastructure Adapter - Job Scraper
 * Implements IJobScraperGateway using fetch, RSS/JSON/HTML parsing and ATS-specific scraping.
 */
import type { Job, JobSource, ScrapeConfig } from '../entities';
import type { IJobScraperGateway, ScrapeProgressCallback } from '../ports';
import { getConfig } from '@/config';
import { ATS_CONFIG } from '@/data/atsConfig';

// Fast in-memory cache with LRU eviction
class FastCache {
  private cache = new Map<string, { jobs: Job[]; timestamp: number }>();
  private readonly maxSize: number;
  private readonly ttl: number;

  constructor() {
    const cfg = getConfig().scraping;
    this.maxSize = cfg.cacheMaxSize;
    this.ttl = cfg.cacheTtlMs;
  }

  get(key: string): Job[] | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.jobs;
  }

  set(key: string, jobs: Job[]): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
    this.cache.set(key, { jobs, timestamp: Date.now() });
  }
}

// Rate limiter: delay between requests to be respectful to job boards
function createRateLimiter(delayMs: number): { wait: () => Promise<void> } {
  let lastRequest = 0;
  return {
    async wait(): Promise<void> {
      const now = Date.now();
      const elapsed = now - lastRequest;
      if (elapsed < delayMs) {
        await new Promise((r) => setTimeout(r, delayMs - elapsed));
      }
      lastRequest = Date.now();
    },
  };
}

// Worker pool for parallel scraping
class WorkerPool {
  private readonly maxConcurrency: number;
  private queue: (() => Promise<void>)[] = [];
  private running = 0;

  constructor() {
    this.maxConcurrency = getConfig().scraping.maxConcurrency;
  }

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const wrappedTask = async () => {
        this.running++;
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.running--;
          this.processQueue();
        }
      };
      if (this.running < this.maxConcurrency) {
        wrappedTask();
      } else {
        this.queue.push(wrappedTask);
      }
    });
  }

  private processQueue(): void {
    if (this.queue.length > 0 && this.running < this.maxConcurrency) {
      const next = this.queue.shift();
      next?.();
    }
  }

  async drain(): Promise<void> {
    while (this.running > 0 || this.queue.length > 0) {
      await new Promise((r) => setTimeout(r, 50));
    }
  }
}

export interface JobScraperAdapterDeps {
  builtInSources: JobSource[];
  customSources: () => JobSource[];
  corsProxies?: string[];
}

const DEFAULT_REQUEST_HEADERS: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  DNT: '1',
  Connection: 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
};

export class JobScraperAdapter implements IJobScraperGateway {
  private readonly builtInSources: JobSource[];
  private readonly getCustomSources: () => JobSource[];
  private readonly corsProxies: string[];
  private cache = new FastCache();
  private workerPool = new WorkerPool();
  private rateLimiter = createRateLimiter(getConfig().scraping.rateLimitDelayMs ?? 2000);
  private abortController: AbortController | null = null;

  constructor(
    builtInSources: JobSource[],
    getCustomSources: () => JobSource[],
    corsProxies: string[] = getConfig().corsProxies
  ) {
    this.builtInSources = builtInSources;
    this.getCustomSources = getCustomSources;
    this.corsProxies = corsProxies;
  }

  private async ensureRateLimit(): Promise<void> {
    await this.rateLimiter.wait();
  }

  abort(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  async testCustomSource(url: string, type: 'rss' | 'json' | 'html'): Promise<boolean> {
    const { requestTimeoutMs } = getConfig().scraping;
    for (const proxy of this.corsProxies) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
        const response = await fetch(`${proxy}${encodeURIComponent(url)}`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (response.ok) {
          const content = await response.text();
          if (type === 'rss') {
            return (
              content.includes('<rss') ||
              content.includes('<feed') ||
              content.includes('<channel')
            );
          }
          if (type === 'json') {
            try {
              const json = JSON.parse(content);
              return Array.isArray(json) || typeof json === 'object';
            } catch {
              return false;
            }
          }
          return content.includes('<html') && content.length > 1000;
        }
      } catch {
        continue;
      }
    }
    return false;
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries?: number
  ): Promise<Response> {
    const maxRetries = retries ?? getConfig().scraping.maxRetries;
    const { requestTimeoutMs } = getConfig().scraping;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeout);
        if (response.ok) return response;
        if (i < maxRetries) {
          await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
        }
      } catch (error) {
        if (i === maxRetries) throw error;
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
      }
    }
    throw new Error('Max retries exceeded');
  }

  private async parseRSSFeed(source: JobSource, keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `rss-${source.id}-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      await this.ensureRateLimit();
      let xmlText = '';
      for (const proxy of this.corsProxies) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          const response = await fetch(`${proxy}${encodeURIComponent(source.url)}`, {
            signal: controller.signal,
          });
          clearTimeout(timeout);
          if (response.ok) {
            xmlText = await response.text();
            break;
          }
        } catch {
          continue;
        }
      }

      if (!xmlText) throw new Error('Failed to fetch RSS');

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      if (xmlDoc.querySelector('parsererror')) throw new Error('XML parse error');

      const items = xmlDoc.querySelectorAll('item');
      const jobs: Job[] = [];

      items.forEach((item, index) => {
        const title = item.querySelector('title')?.textContent?.trim() || '';
        const description = item.querySelector('description')?.textContent?.trim() || '';
        const link = item.querySelector('link')?.textContent?.trim() || '';
        const pubDate =
          item.querySelector('pubDate')?.textContent ||
          item.querySelector('dc\\:date')?.textContent ||
          new Date().toISOString();

        let company = 'Unknown Company';
        const patterns = [
          /at\s+([^\-–]+)(?:\s*[-–]|\s*$|\s+\()/i,
          /\|\s*([^\-–|]+)(?:\s*[-–]|\s*$)/i,
          /@\s+([^\s]+)/i,
        ];
        for (const pattern of patterns) {
          const match = title.match(pattern);
          if (match) {
            company = match[1].trim();
            break;
          }
        }

        let cleanTitle = title;
        for (const pattern of patterns) {
          cleanTitle = cleanTitle.replace(pattern, '').trim();
        }
        cleanTitle = cleanTitle.replace(/^[\-–|]+|[\-–|]+$/g, '').trim();
        if (!cleanTitle) cleanTitle = title;

        if (keywords.length > 0) {
          const searchText = `${cleanTitle} ${description}`.toLowerCase();
          const hasMatch = keywords.some((kw) => searchText.includes(kw.toLowerCase()));
          if (!hasMatch) return;
        }

        jobs.push({
          id: `${source.id}-${index}-${Date.now()}`,
          title: cleanTitle,
          company,
          location: 'Remote',
          jobType: 'Full-time',
          description: description.replace(/<[^>]*>/g, '').slice(0, 400),
          url: link,
          postedAt: new Date(pubDate).toISOString(),
          tags: [source.category],
          source: source.name,
          category: source.category,
        });
      });

      this.cache.set(cacheKey, jobs);
      return jobs;
    } catch (error) {
      console.warn(`RSS parse error for ${source.name}:`, error);
      return [];
    }
  }

  private async parseJSONApi(source: JobSource, keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `json-${source.id}-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      await this.ensureRateLimit();
      let jsonData: unknown = null;
      for (const proxy of this.corsProxies) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 10000);
          const response = await fetch(`${proxy}${encodeURIComponent(source.url)}`, {
            signal: controller.signal,
          });
          clearTimeout(timeout);
          if (response.ok) {
            jsonData = await response.json();
            break;
          }
        } catch {
          continue;
        }
      }

      if (!jsonData || typeof jsonData !== 'object') throw new Error('Failed to fetch JSON');

      const data = jsonData as Record<string, unknown>;
      let jobArray: unknown[] = [];
      if (Array.isArray(data)) jobArray = data;
      else if (Array.isArray(data.jobs)) jobArray = data.jobs;
      else if (Array.isArray(data.data)) jobArray = data.data;
      else if (Array.isArray(data.results)) jobArray = data.results;
      else if (Array.isArray(data.items)) jobArray = data.items;
      else {
        for (const key of Object.keys(data)) {
          const val = data[key];
          if (Array.isArray(val) && val.length > 0) {
            jobArray = val;
            break;
          }
        }
      }

      const jobs: Job[] = [];
      const items = jobArray as Record<string, unknown>[];

      items.forEach((item: Record<string, unknown>, index: number) => {
        const title =
          (item.title as string) ||
          (item.position as string) ||
          (item.name as string) ||
          (item.job_title as string) ||
          '';
        const company =
          (item.company as string) ||
          (item.company_name as string) ||
          (item.organization as string) ||
          (item.employer as string) ||
          'Unknown Company';
        const description =
          (item.description as string) ||
          (item.summary as string) ||
          (item.details as string) ||
          '';
        const url =
          (item.url as string) ||
          (item.link as string) ||
          (item.apply_url as string) ||
          (item.job_url as string) ||
          '';
        const location = (item.location as string) || (item.place as string) || (item.city as string) || 'Remote';
        const salary = (item.salary as string) || (item.compensation as string) || (item.pay as string) || undefined;
        const postedAt =
          (item.posted_at as string) ||
          (item.date as string) ||
          (item.created_at as string) ||
          (item.published as string) ||
          new Date().toISOString();

        if (!title) return;

        if (keywords.length > 0) {
          const searchText = `${title} ${description} ${company}`.toLowerCase();
          const hasMatch = keywords.some((kw) => searchText.includes(kw.toLowerCase()));
          if (!hasMatch) return;
        }

        jobs.push({
          id: `${source.id}-${index}-${Date.now()}`,
          title,
          company,
          location,
          salary,
          jobType: ((item.job_type as string) || (item.type as string) || 'Full-time') as string,
          description: String(description).slice(0, 400),
          url,
          postedAt: new Date(postedAt).toISOString(),
          tags: [source.category],
          source: source.name,
          category: source.category,
        });
      });

      this.cache.set(cacheKey, jobs);
      return jobs;
    } catch (error) {
      console.warn(`JSON parse error for ${source.name}:`, error);
      return [];
    }
  }

  private async parseHTMLPage(source: JobSource, keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `html-${source.id}-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      await this.ensureRateLimit();
      let htmlText = '';
      for (const proxy of this.corsProxies) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 10000);
          const response = await fetch(`${proxy}${encodeURIComponent(source.url)}`, {
            signal: controller.signal,
          });
          clearTimeout(timeout);
          if (response.ok) {
            htmlText = await response.text();
            break;
          }
        } catch {
          continue;
        }
      }

      if (!htmlText) throw new Error('Failed to fetch HTML');

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const jobs: Job[] = [];

      const selectors = [
        '[class*="job"]',
        '[class*="position"]',
        '[class*="opening"]',
        '[class*="career"]',
        '[data-testid*="job"]',
        'article',
        '.listing',
        '.posting',
      ];

      let jobElements: Element[] = [];
      for (const selector of selectors) {
        const elements = doc.querySelectorAll(selector);
        if (elements.length > 0 && elements.length < 100) {
          jobElements = Array.from(elements);
          break;
        }
      }

      jobElements.forEach((el, index) => {
        const titleEl = el.querySelector('h1, h2, h3, h4, [class*="title"], [class*="position"]');
        const title = titleEl?.textContent?.trim() || '';
        if (!title || title.length < 3) return;

        const descEl = el.querySelector('p, [class*="description"], [class*="summary"]');
        const description = descEl?.textContent?.trim() || '';

        const linkEl = el.querySelector('a') || titleEl?.closest('a');
        let url = linkEl?.getAttribute('href') || '';
        if (url && !url.startsWith('http')) {
          const baseUrl = new URL(source.url);
          url = url.startsWith('/') ? `${baseUrl.origin}${url}` : `${baseUrl.origin}/${url}`;
        }

        const locationEl = el.querySelector('[class*="location"], [class*="place"]');
        const location = locationEl?.textContent?.trim() || 'Remote';

        if (keywords.length > 0) {
          const searchText = `${title} ${description}`.toLowerCase();
          const hasMatch = keywords.some((kw) => searchText.includes(kw.toLowerCase()));
          if (!hasMatch) return;
        }

        jobs.push({
          id: `${source.id}-${index}-${Date.now()}`,
          title,
          company: source.name.replace(' (Custom HTML)', ''),
          location,
          jobType: 'Full-time',
          description: description.slice(0, 400),
          url: url || source.url,
          postedAt: new Date().toISOString(),
          tags: [source.category],
          source: source.name,
          category: source.category,
        });
      });

      this.cache.set(cacheKey, jobs);
      return jobs;
    } catch (error) {
      console.warn(`HTML parse error for ${source.name}:`, error);
      return [];
    }
  }

  private async parseATSPage(source: JobSource, keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `ats-${source.id}-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const atsKey = source.ats;
    if (!atsKey) return [];
    const config = ATS_CONFIG[atsKey];
    if (!config) return [];

    try {
      await this.ensureRateLimit();
      let htmlText = '';
      for (const proxy of this.corsProxies) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), getConfig().scraping.requestTimeoutMs);
          const response = await fetch(`${proxy}${encodeURIComponent(source.url)}`, {
            signal: controller.signal,
            headers: DEFAULT_REQUEST_HEADERS,
          });
          clearTimeout(timeout);
          if (response.ok) {
            htmlText = await response.text();
            break;
          }
        } catch {
          continue;
        }
      }

      if (!htmlText) throw new Error('Failed to fetch ATS page');

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const jobs: Job[] = [];
      const { selectors } = config;
      const companyName = source.companyName || source.name.replace(/\s*\([^)]*\)\s*$/, '').trim();

      const containers = doc.querySelectorAll(selectors.jobContainer);
      containers.forEach((container, index) => {
        const titleEl = container.querySelector(selectors.title);
        const title = titleEl?.textContent?.trim() || '';
        if (!title || title.length < 2) return;

        const locationEl = container.querySelector(selectors.location);
        const location = locationEl?.textContent?.trim() || 'Remote';

        const linkEl = container.querySelector(selectors.link);
        let url = linkEl?.getAttribute('href') || '';
        if (url && !url.startsWith('http')) {
          const baseUrl = new URL(source.url);
          url = url.startsWith('/') ? `${baseUrl.origin}${url}` : `${baseUrl.origin}/${url}`;
        }

        const departmentEl = container.querySelector(selectors.department);
        const department = departmentEl?.textContent?.trim() || '';

        if (keywords.length > 0) {
          const searchText = `${title} ${location} ${department}`.toLowerCase();
          const hasMatch = keywords.some((kw) => searchText.includes(kw.toLowerCase()));
          if (!hasMatch) return;
        }

        jobs.push({
          id: `${source.id}-${index}-${Date.now()}`,
          title,
          company: companyName,
          location,
          jobType: 'Full-time',
          description: department ? `Department: ${department}` : '',
          url: url || source.url,
          postedAt: new Date().toISOString(),
          tags: [config.name, source.category],
          source: source.name,
          category: source.category,
        });
      });

      this.cache.set(cacheKey, jobs);
      return jobs;
    } catch (error) {
      console.warn(`ATS parse error for ${source.name}:`, error);
      return [];
    }
  }

  private async fetchRemoteOk(keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `api-remoteok-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const tagParam = keywords.length > 0 ? `?tags=${keywords.join(',')}` : '';
      const response = await this.fetchWithRetry(`https://remoteok.io/api${tagParam}`);
      const data = (await response.json()) as Record<string, unknown>[];
      const jobs = data.slice(1).map((item: Record<string, unknown>) => ({
        id: `remoteok-${item.id}`,
        title: (item.position as string) || (item.title as string) || 'Unknown Position',
        company: (item.company as string) || 'Unknown Company',
        companyLogo: item.logo as string | undefined,
        location: (item.location as string) || 'Remote',
        salary: (item.salary as string) || (item.salary_min as string) || undefined,
        jobType: (item.tags as string[])?.includes('contract')
          ? 'Contract'
          : (item.tags as string[])?.includes('freelance')
            ? 'Freelance'
            : 'Full-time',
        description: (item.description as string) || '',
        url: (item.apply_url as string) || (item.url as string) || `https://remoteok.io/${item.id}`,
        postedAt: (item.date as string) || new Date().toISOString(),
        tags: (item.tags as string[]) || [],
        source: 'RemoteOK',
        category: 'Remote Specialists',
      }));

      this.cache.set(cacheKey, jobs);
      return jobs;
    } catch (error) {
      console.warn('RemoteOK error:', error);
      return [];
    }
  }

  private async fetchRemotive(keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `api-remotive-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const searchParam =
        keywords.length > 0
          ? `?search=${encodeURIComponent(keywords.join(' '))}&limit=1000`
          : '?limit=1000';
      const response = await this.fetchWithRetry(`https://remotive.com/api/remote-jobs${searchParam}`);
      const data = (await response.json()) as { jobs?: Record<string, unknown>[] };
      const rawJobs = data.jobs || [];
      const jobs = rawJobs.map((item: Record<string, unknown>) => ({
        id: `remotive-${item.id}`,
        title: (item.title as string) || 'Unknown Position',
        company: (item.company_name as string) || 'Unknown Company',
        companyLogo: item.company_logo as string | undefined,
        location: (item.candidate_required_location as string) || 'Remote',
        salary: item.salary as string | undefined,
        jobType:
          item.job_type === 'full_time'
            ? 'Full-time'
            : item.job_type === 'contract'
              ? 'Contract'
              : item.job_type === 'part_time'
                ? 'Part-time'
                : item.job_type === 'freelance'
                  ? 'Freelance'
                  : 'Full-time',
        description: (item.description as string) || '',
        url: (item.url as string) || `https://remotive.com/remote-jobs/${item.id}`,
        postedAt: (item.publication_date as string) || new Date().toISOString(),
        tags: ((item.tags as string[]) || [item.category]).filter(Boolean) as string[],
        source: 'Remotive',
        category: 'Remote Specialists',
      }));

      this.cache.set(cacheKey, jobs);
      return jobs;
    } catch (error) {
      console.warn('Remotive error:', error);
      return [];
    }
  }

  /**
   * Parse "X hours ago", "X days ago" into an approximate Date (past).
   */
  private static parseHnAge(text: string): Date {
    const now = Date.now();
    const m = text.trim().match(/^(\d+)\s*(minute|hour|day|week)s?\s+ago$/i);
    if (!m) return new Date(now);
    const n = parseInt(m[1], 10);
    const unit = m[2].toLowerCase();
    let ms = 0;
    if (unit.startsWith('minute')) ms = n * 60 * 1000;
    else if (unit.startsWith('hour')) ms = n * 60 * 60 * 1000;
    else if (unit.startsWith('day')) ms = n * 24 * 60 * 60 * 1000;
    else if (unit.startsWith('week')) ms = n * 7 * 24 * 60 * 60 * 1000;
    return new Date(now - ms);
  }

  private async fetchHackerNewsJobs(keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `hn-jobs-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      await this.ensureRateLimit();
      let htmlText = '';
      for (const proxy of this.corsProxies) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), getConfig().scraping.requestTimeoutMs);
          const response = await fetch(`${proxy}${encodeURIComponent('https://news.ycombinator.com/jobs')}`, {
            signal: controller.signal,
          });
          clearTimeout(timeout);
          if (response.ok) {
            htmlText = await response.text();
            break;
          }
        } catch {
          continue;
        }
      }

      if (!htmlText) throw new Error('Failed to fetch HN jobs');

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const jobs: Job[] = [];
      const rows = doc.querySelectorAll('tr.athing');

      rows.forEach((row, index) => {
        const titleEl = row.querySelector('td.title span.titleline a, td.title a');
        if (!titleEl) return;
        const title = titleEl.textContent?.trim() || '';
        let url = titleEl.getAttribute('href') || '';
        if (!title || title.length < 2) return;
        if (url && !url.startsWith('http')) {
          url = url.startsWith('/') ? `https://news.ycombinator.com${url}` : `https://news.ycombinator.com/${url}`;
        }

        let postedAt = new Date().toISOString();
        let next: Element | null = row.nextElementSibling;
        while (next) {
          const subtext = next.querySelector('td.subtext');
          if (subtext) {
            const ago = subtext.textContent?.trim() || '';
            if (ago.includes('ago')) {
              postedAt = JobScraperAdapter.parseHnAge(ago).toISOString();
            }
            break;
          }
          next = next.nextElementSibling;
        }

        const companyMatch = title.match(/^([^–—-]+?)\s*\(YC\s+/i) || title.match(/^([^–—-]+?)\s+[Ii]s\s+Hiring/i);
        const company = companyMatch ? companyMatch[1].trim() : 'YC Startup';

        if (keywords.length > 0) {
          const searchText = `${title} ${company}`.toLowerCase();
          const hasMatch = keywords.some((kw) => searchText.includes(kw.toLowerCase()));
          if (!hasMatch) return;
        }

        jobs.push({
          id: `hn-jobs-${index}-${Date.now()}`,
          title,
          company,
          location: 'Remote',
          jobType: 'Full-time',
          description: '',
          url: url || 'https://news.ycombinator.com/jobs',
          postedAt,
          tags: ['Community', 'YC'],
          source: 'Hacker News Jobs (YC)',
          category: 'Community',
        });
      });

      this.cache.set(cacheKey, jobs);
      return jobs;
    } catch (error) {
      console.warn('Hacker News Jobs fetch error:', error);
      return [];
    }
  }

  private async fetchArbeitnow(keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `api-arbeitnow-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const allJobs: Job[] = [];
      const maxPages = 5;

      for (let page = 1; page <= maxPages; page++) {
        const response = await this.fetchWithRetry(
          `https://www.arbeitnow.com/api/job-board-api?page=${page}`,
          {},
          1
        );
        const data = (await response.json()) as { data?: Record<string, unknown>[] };
        const pageJobs = (data.data || [])
          .filter((item: Record<string, unknown>) => item.remote === true)
          .map((item: Record<string, unknown>) => ({
            id: `arbeitnow-${item.slug}`,
            title: (item.title as string) || 'Unknown Position',
            company: (item.company_name as string) || 'Unknown Company',
            location: (item.location as string) || 'Remote',
            salary: item.salary as string | undefined,
            jobType: ((item.job_types as string[])?.[0] as string) || 'Full-time',
            description: (item.description as string) || '',
            url: (item.url as string) || `https://www.arbeitnow.com/job/${item.slug}`,
            postedAt: (item.created_at as string) || new Date().toISOString(),
            tags: (item.tags as string[]) || [],
            source: 'Arbeitnow',
            category: 'Regional',
          }));

        allJobs.push(...pageJobs);
        if (pageJobs.length < 100) break;
      }

      let filteredJobs = allJobs;
      if (keywords.length > 0) {
        const keywordLower = keywords.map((k) => k.toLowerCase());
        filteredJobs = allJobs.filter((job) =>
          keywordLower.some(
            (kw) =>
              job.title.toLowerCase().includes(kw) ||
              job.tags.some((tag) => tag.toLowerCase().includes(kw))
          )
        );
      }

      this.cache.set(cacheKey, filteredJobs);
      return filteredJobs;
    } catch (error) {
      console.warn('Arbeitnow error:', error);
      return [];
    }
  }

  async fetchFromSource(source: JobSource, keywords: string[] = []): Promise<Job[]> {
    const cacheKey = `${source.type}-${source.id}-${keywords.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    let jobs: Job[] = [];

    switch (source.id) {
      case 'remoteok':
        jobs = await this.fetchRemoteOk(keywords);
        break;
      case 'remotive':
        jobs = await this.fetchRemotive(keywords);
        break;
      case 'arbeitnow':
        jobs = await this.fetchArbeitnow(keywords);
        break;
      case 'hn-jobs':
        jobs = await this.fetchHackerNewsJobs(keywords);
        break;
      default:
        if (source.type === 'ats') {
          jobs = await this.parseATSPage(source, keywords);
        } else if (source.type === 'rss') {
          jobs = await this.parseRSSFeed(source, keywords);
        } else if (source.type === 'json') {
          jobs = await this.parseJSONApi(source, keywords);
        } else if (source.type === 'html') {
          jobs = await this.parseHTMLPage(source, keywords);
        }
        break;
    }

    return jobs;
  }

  /** Category treated as remote-first; these sources are scraped first and listed first in results. */
  private static readonly REMOTE_FIRST_CATEGORY = 'Remote Specialists';

  async scrapeJobs(
    config: ScrapeConfig,
    onProgress?: ScrapeProgressCallback
  ): Promise<Job[]> {
    this.abortController = new AbortController();

    const allSources = [...this.builtInSources, ...this.getCustomSources()];
    let sourcesToScrape =
      config.selectedSources.length > 0
        ? allSources.filter((s) => config.selectedSources.includes(s.id))
        : allSources.filter((s) => s.enabled);

    // Remote-first: scrape remote specialist sources first, then the rest
    sourcesToScrape = this.orderSourcesRemoteFirst(sourcesToScrape);

    const allJobs: Job[] = [];
    let completedCount = 0;

    const tasks = sourcesToScrape.map((source) =>
      this.workerPool.add(async () => {
        try {
          const jobs = await this.fetchFromSource(source, config.keywords);
          jobs.forEach((job) => {
            const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;
            const exists = allJobs.some(
              (j) => `${j.title.toLowerCase()}-${j.company.toLowerCase()}` === key
            );
            if (!exists) allJobs.push(job);
          });
          completedCount++;
          onProgress?.(source.name, jobs.length, completedCount);
        } catch {
          completedCount++;
          onProgress?.(source.name, 0, completedCount);
        }
      })
    );

    await Promise.all(tasks);
    await this.workerPool.drain();

    const remoteFirstNames = new Set(
      sourcesToScrape
        .filter((s) => s.category === JobScraperAdapter.REMOTE_FIRST_CATEGORY)
        .map((s) => s.name)
    );

    allJobs.sort((a, b) => {
      const aRemoteFirst = remoteFirstNames.has(a.source);
      const bRemoteFirst = remoteFirstNames.has(b.source);
      if (aRemoteFirst && !bRemoteFirst) return -1;
      if (!aRemoteFirst && bRemoteFirst) return 1;
      const dateA = new Date(a.postedAt).getTime();
      const dateB = new Date(b.postedAt).getTime();
      return dateB - dateA;
    });

    return allJobs;
  }

  /** Puts Remote Specialists (and other remote-first) sources first, then the rest. */
  private orderSourcesRemoteFirst(sources: JobSource[]): JobSource[] {
    const remoteFirst = sources.filter(
      (s) => s.category === JobScraperAdapter.REMOTE_FIRST_CATEGORY
    );
    const rest = sources.filter(
      (s) => s.category !== JobScraperAdapter.REMOTE_FIRST_CATEGORY
    );
    return [...remoteFirst, ...rest];
  }
}
