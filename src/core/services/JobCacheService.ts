import type { Job } from '../entities';

const CACHE_KEY = 'remote-scrapper-jobs-cache';
const CACHE_META_KEY = 'remote-scrapper-jobs-cache-meta';

interface CacheMeta {
  updatedAt: string;
}

export const JobCacheService = {
  saveJobs: (jobs: Job[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(jobs));
      const meta: CacheMeta = { updatedAt: new Date().toISOString() };
      localStorage.setItem(CACHE_META_KEY, JSON.stringify(meta));
    } catch (error) {
      console.error('Failed to save jobs to cache', error);
    }
  },

  getCachedJobs: (): Job[] => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch (error) {
      console.error('Failed to load jobs from cache', error);
      return [];
    }
  },

  getLastUpdated: (): Date | null => {
    try {
      const raw = localStorage.getItem(CACHE_META_KEY);
      if (!raw) return null;
      const meta = JSON.parse(raw) as CacheMeta;
      if (!meta?.updatedAt) return null;
      const dt = new Date(meta.updatedAt);
      return Number.isNaN(dt.getTime()) ? null : dt;
    } catch {
      return null;
    }
  },

  isCacheFresh: (maxAgeMs: number): boolean => {
    const updatedAt = JobCacheService.getLastUpdated();
    if (!updatedAt) return false;
    return Date.now() - updatedAt.getTime() <= maxAgeMs;
  },

  /**
   * Returns jobs from 'fresh' that are not present in 'cached' (by ID or URL).
   */
  getNewJobs: (fresh: Job[], cached: Job[]): Job[] => {
    const cachedIds = new Set(cached.map(j => j.id || j.url));
    return fresh.filter(j => !cachedIds.has(j.id || j.url));
  },

  clearCache: () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_META_KEY);
    localStorage.removeItem('remote-scrapper-jobs-session');
  },

  // --- Session Management for Resume ---
  startSession: (totalSources: number) => {
    const session: ScrapeSession = {
      id: Date.now().toString(),
      startedAt: Date.now(),
      totalSources,
      completedSources: [],
      status: 'running'
    };
    localStorage.setItem('remote-scrapper-jobs-session', JSON.stringify(session));
    return session;
  },

  getSession: (): ScrapeSession | null => {
    try {
      const raw = localStorage.getItem('remote-scrapper-jobs-session');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  markSourceComplete: (sourceId: string) => {
    const session = JobCacheService.getSession();
    if (session && session.status === 'running') {
      if (!session.completedSources.includes(sourceId)) {
        session.completedSources.push(sourceId);
        localStorage.setItem('remote-scrapper-jobs-session', JSON.stringify(session));
      }
    }
  },

  endSession: () => {
    const session = JobCacheService.getSession();
    if (session) {
      session.status = 'completed';
      localStorage.setItem('remote-scrapper-jobs-session', JSON.stringify(session));
    }
  }
};

export interface ScrapeSession {
  id: string;
  startedAt: number;
  totalSources: number;
  completedSources: string[];
  status: 'running' | 'completed';
}
