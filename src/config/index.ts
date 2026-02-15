/**
 * Application Configuration
 * Centralized, type-safe configuration
 */
export interface AppConfig {
  scraping: {
    jobsPerBatch: number;
    maxConcurrency: number;
    cacheTtlMs: number;
    cacheMaxSize: number;
    requestTimeoutMs: number;
    maxRetries: number;
    /** Delay in ms between requests (rate limit). Keep low because source list is large; cache handles refresh frequency. */
    rateLimitDelayMs: number;
  };
  keywords: {
    /** Not used for scraping; scrape fetches all jobs. */
    default: string[];
    /** Optional suggestions for client-side filter (e.g. quick keyword chips). */
    suggested?: string[];
  };
  corsProxies: string[];
}

const DEFAULT_CONFIG: AppConfig = {
  scraping: {
    jobsPerBatch: 30,
    maxConcurrency: 8,
    cacheTtlMs: 24 * 60 * 60 * 1000, // 24h – run once per day to update
    cacheMaxSize: 500,
    requestTimeoutMs: 10000,
    maxRetries: 2,
    rateLimitDelayMs: 150,
  },
  keywords: {
    default: [], // No keyword filter at scrape time; load all jobs. User filters client-side via search & filters.
    suggested: [
      'software engineer',
      'full stack developer',
      'frontend developer',
      'backend developer',
      'devops engineer',
      'product manager',
      'react native',
    ],
  },
  corsProxies: [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest=',
  ],
};

let config: AppConfig = { ...DEFAULT_CONFIG };

/**
 * Get current configuration (read-only)
 */
export function getConfig(): Readonly<AppConfig> {
  return config;
}

/**
 * Override configuration - useful for testing or runtime config
 */
export function setConfig(overrides: Partial<AppConfig>): void {
  config = { ...config, ...overrides };
}

/**
 * Reset to default configuration
 */
export function resetConfig(): void {
  config = { ...DEFAULT_CONFIG };
}
