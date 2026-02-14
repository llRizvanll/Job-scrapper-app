import type { JobSource } from '../entities';

export interface ISourceRepository {
  getAllSources(): JobSource[];
  getEnabledSources(): JobSource[];
  getSourcesByCategory(): Record<string, JobSource[]>;
}
