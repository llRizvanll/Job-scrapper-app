export interface ScrapeProgress {
  current: number;
  total: number;
  currentSource: string;
  jobsFound: number;
  isComplete: boolean;
}
