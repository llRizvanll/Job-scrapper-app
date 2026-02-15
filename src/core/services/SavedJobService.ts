import type { Job } from '../entities';

const SAVED_JOBS_KEY = 'remote-scrapper-saved-jobs';

export const SavedJobService = {
  getSavedJobs: (): Job[] => {
    try {
      const stored = localStorage.getItem(SAVED_JOBS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveJob: (job: Job): Job[] => {
    const jobs = SavedJobService.getSavedJobs();
    if (!jobs.some(j => j.id === job.id)) {
      const updated = [job, ...jobs];
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
      return updated;
    }
    return jobs;
  },

  removeJob: (jobId: string): Job[] => {
    const jobs = SavedJobService.getSavedJobs();
    const updated = jobs.filter(j => j.id !== jobId);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
    return updated;
  },

  isJobSaved: (jobId: string): boolean => {
    const jobs = SavedJobService.getSavedJobs();
    return jobs.some(j => j.id === jobId);
  }
};
