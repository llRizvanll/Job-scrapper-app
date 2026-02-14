import type { JobSource } from './entities';
import {
  ScrapeJobsUseCase,
  FilterJobsUseCase,
  GetSourcesUseCase,
  ManageCustomSourcesUseCase,
  ComputeStatsUseCase,
} from './useCases';
import {
  JobScraperAdapter,
  LocalStorageSourceStorageAdapter,
  SourceRepositoryAdapter,
} from './adapters';

let builtInSources: JobSource[] = [];
let _scrapeJobsUseCase: ScrapeJobsUseCase | null = null;
let _getSourcesUseCase: GetSourcesUseCase | null = null;
let _manageCustomSourcesUseCase: ManageCustomSourcesUseCase | null = null;

const storageAdapter = new LocalStorageSourceStorageAdapter();

function getCustomSources(): JobSource[] {
  return storageAdapter.getCustomSources();
}

function getSourceRepository() {
  return new SourceRepositoryAdapter(builtInSources, getCustomSources);
}

function getJobScraper() {
  return new JobScraperAdapter(builtInSources, getCustomSources);
}

export function initializeContainer(sources: JobSource[]): void {
  builtInSources = sources;
}

export const filterJobsUseCase = new FilterJobsUseCase();
export const computeStatsUseCase = new ComputeStatsUseCase();

function ensureScrapeJobsUseCase(): ScrapeJobsUseCase {
  if (!_scrapeJobsUseCase) {
    _scrapeJobsUseCase = new ScrapeJobsUseCase({ jobScraper: getJobScraper() });
  }
  return _scrapeJobsUseCase;
}

function ensureGetSourcesUseCase(): GetSourcesUseCase {
  if (!_getSourcesUseCase) {
    _getSourcesUseCase = new GetSourcesUseCase({ sourceRepository: getSourceRepository() });
  }
  return _getSourcesUseCase;
}

function ensureManageCustomSourcesUseCase(): ManageCustomSourcesUseCase {
  if (!_manageCustomSourcesUseCase) {
    _manageCustomSourcesUseCase = new ManageCustomSourcesUseCase({
      jobScraper: getJobScraper(),
      sourceStorage: storageAdapter,
    });
  }
  return _manageCustomSourcesUseCase;
}

export const scrapeJobsUseCase = new Proxy({} as ScrapeJobsUseCase, {
  get(_, prop) {
    return (ensureScrapeJobsUseCase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const getSourcesUseCase = new Proxy({} as GetSourcesUseCase, {
  get(_, prop) {
    return (ensureGetSourcesUseCase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const manageCustomSourcesUseCase = new Proxy({} as ManageCustomSourcesUseCase, {
  get(_, prop) {
    return (ensureManageCustomSourcesUseCase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
