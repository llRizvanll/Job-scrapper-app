import type { Job, JobSource, ScrapeConfig } from '../entities';

export type ScrapeProgressCallback = (
  source: string,
  sourceId: string,
  count: number,
  total: number,
  newJobs?: Job[]
) => void;

export interface IJobScraperGateway {
  scrapeJobs(config: ScrapeConfig, onProgress?: ScrapeProgressCallback): Promise<Job[]>;
  fetchFromSource(source: JobSource, keywords: string[]): Promise<Job[]>;
  testCustomSource(url: string, type: 'rss' | 'json' | 'html'): Promise<boolean>;
  abort(): void;
}
