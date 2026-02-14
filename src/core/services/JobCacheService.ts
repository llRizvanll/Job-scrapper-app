import type { Job } from '../entities';

const CACHE_KEY = 'remote-scrapper-jobs-cache';

export const JobCacheService = {
  saveJobs: (jobs: Job[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(jobs));
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

  /**
   * Returns jobs from 'fresh' that are not present in 'cached' (by ID or URL).
   */
  getNewJobs: (fresh: Job[], cached: Job[]): Job[] => {
    const cachedIds = new Set(cached.map(j => j.id || j.url));
    return fresh.filter(j => !cachedIds.has(j.id || j.url));
  },

  clearCache: () => {
    localStorage.removeItem(CACHE_KEY);
  }
};
