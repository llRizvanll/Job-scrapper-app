import type { Job } from './Job';

export interface ScrapeProgress {
  current: number;
  total: number;
  currentSource: string;
  currentSourceId?: string;
  jobsFound: number;
  isComplete: boolean;
  newJobs?: Job[];
}
