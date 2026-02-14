import type { JobSource } from '../entities';
import type { ISourceRepository } from '../ports';

export interface GetSourcesOutput {
  sources: JobSource[];
  byCategory: Record<string, JobSource[]>;
}

export interface GetSourcesUseCaseDeps {
  sourceRepository: ISourceRepository;
}

export class GetSourcesUseCase {
  private readonly deps: GetSourcesUseCaseDeps;
  constructor(deps: GetSourcesUseCaseDeps) {
    this.deps = deps;
  }

  execute(): GetSourcesOutput {
    const sources = this.deps.sourceRepository.getAllSources();
    const byCategory = this.deps.sourceRepository.getSourcesByCategory();
    return { sources, byCategory };
  }
}
