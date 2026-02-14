import type { JobSource } from '../entities';
import type { ISourceRepository } from '../ports';

export interface SourceRepositoryAdapterDeps {
  builtInSources: JobSource[];
  getCustomSources: () => JobSource[];
}

export class SourceRepositoryAdapter implements ISourceRepository {
  private readonly builtInSources: JobSource[];
  private readonly getCustomSources: () => JobSource[];

  constructor(builtInSources: JobSource[], getCustomSources: () => JobSource[]) {
    this.builtInSources = builtInSources;
    this.getCustomSources = getCustomSources;
  }

  getAllSources(): JobSource[] {
    return [...this.builtInSources, ...this.getCustomSources()];
  }

  getEnabledSources(): JobSource[] {
    return this.getAllSources().filter((s) => s.enabled);
  }

  getSourcesByCategory(): Record<string, JobSource[]> {
    const grouped: Record<string, JobSource[]> = {};
    this.getAllSources().forEach((source) => {
      if (!grouped[source.category]) {
        grouped[source.category] = [];
      }
      grouped[source.category].push(source);
    });
    return grouped;
  }
}
