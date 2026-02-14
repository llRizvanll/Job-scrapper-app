import type { Job } from '../entities';

export interface ComputeStatsInput {
  jobs: Job[];
}

export interface JobStats {
  totalJobs: number;
  uniqueCompanies: number;
  withSalary: number;
  worldwide: number;
}

export interface ComputeStatsOutput {
  stats: JobStats;
}

export class ComputeStatsUseCase {
  execute(input: ComputeStatsInput): ComputeStatsOutput {
    const { jobs } = input;

    const stats: JobStats = {
      totalJobs: jobs.length,
      uniqueCompanies: new Set(jobs.map((j) => j.company)).size,
      withSalary: jobs.filter((j) => j.salary).length,
      worldwide: jobs.filter(
        (j) =>
          j.location.toLowerCase().includes('worldwide') ||
          j.location.toLowerCase().includes('remote')
      ).length,
    };

    return { stats };
  }
}
