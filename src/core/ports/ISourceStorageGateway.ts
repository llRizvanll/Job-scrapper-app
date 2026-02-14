import type { JobSource } from '../entities';

export interface ISourceStorageGateway {
  getCustomSources(): JobSource[];
  addCustomSource(source: JobSource): void;
  removeCustomSource(sourceId: string): void;
  saveCustomSources(sources: JobSource[]): void;
}
