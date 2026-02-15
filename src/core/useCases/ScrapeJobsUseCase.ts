import type { Job, ScrapeConfig, ScrapeProgress } from '../entities';
import type { IJobScraperGateway, ScrapeProgressCallback } from '../ports';

export interface ScrapeJobsInput {
  keywords: string[];
  selectedSources: string[];
  maxJobsPerSource?: number;
}

export interface ScrapeJobsOutput {
  jobs: Job[];
}

export interface ScrapeJobsUseCaseDeps {
  jobScraper: IJobScraperGateway;
}

export class ScrapeJobsUseCase {
  private readonly deps: ScrapeJobsUseCaseDeps;
  constructor(deps: ScrapeJobsUseCaseDeps) {
    this.deps = deps;
  }

  async execute(
    input: ScrapeJobsInput,
    onProgress?: (progress: ScrapeProgress) => void
  ): Promise<ScrapeJobsOutput> {
    const config: ScrapeConfig = {
      keywords: input.keywords,
      selectedSources: input.selectedSources,
      maxJobsPerSource: input.maxJobsPerSource ?? 100,
    };

    let totalFound = 0;

    const progressCallback: ScrapeProgressCallback = (sourceName, sourceId, count, completed, newJobs = []) => {
      totalFound += count;
      onProgress?.({
        current: completed,
        total: config.selectedSources.length,
        currentSource: sourceName,
        currentSourceId: sourceId,
        jobsFound: totalFound,
        isComplete: false,
        newJobs,
      });
    };

    const jobs = await this.deps.jobScraper.scrapeJobs(config, progressCallback);

    const totalSources = config.selectedSources.length;
    onProgress?.({
      current: totalSources,
      total: totalSources,
      currentSource: '',
      jobsFound: jobs.length,
      isComplete: true,
      newJobs: [],
    });

    return { jobs };
  }
}
