import type { JobSource } from '../entities';
import type { IJobScraperGateway, ISourceStorageGateway } from '../ports';

export interface AddCustomSourceInput {
  source: JobSource;
}

export interface RemoveCustomSourceInput {
  sourceId: string;
}

export interface TestCustomSourceInput {
  url: string;
  type: 'rss' | 'json' | 'html';
}

export interface ManageCustomSourcesUseCaseDeps {
  jobScraper: IJobScraperGateway;
  sourceStorage: ISourceStorageGateway;
}

export class ManageCustomSourcesUseCase {
  private readonly deps: ManageCustomSourcesUseCaseDeps;
  constructor(deps: ManageCustomSourcesUseCaseDeps) {
    this.deps = deps;
  }

  addCustomSource(input: AddCustomSourceInput): void {
    this.deps.sourceStorage.addCustomSource(input.source);
  }

  removeCustomSource(input: RemoveCustomSourceInput): void {
    this.deps.sourceStorage.removeCustomSource(input.sourceId);
  }

  getCustomSources(): JobSource[] {
    return this.deps.sourceStorage.getCustomSources();
  }

  async testCustomSource(input: TestCustomSourceInput): Promise<boolean> {
    return this.deps.jobScraper.testCustomSource(input.url, input.type);
  }
}
