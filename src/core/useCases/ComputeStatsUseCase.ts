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

/** One row in jobs-by-source breakdown */
export interface SourceBreakdown {
  source: string;
  count: number;
}

/** One row in top companies table */
export interface CompanyBreakdown {
  company: string;
  count: number;
}

/** One row in jobs-by-category breakdown */
export interface CategoryBreakdown {
  category: string;
  count: number;
}

/** One row in job-type breakdown */
export interface JobTypeBreakdown {
  jobType: string;
  count: number;
}

/** One row in jobs-by-skill breakdown */
export interface SkillBreakdown {
  skill: string;
  count: number;
}

/** Detailed analytics for the report */
export interface JobAnalyticsReport {
  stats: JobStats;
  jobsBySource: SourceBreakdown[];
  topCompanies: CompanyBreakdown[];
  jobsByCategory: CategoryBreakdown[];
  jobsByType: JobTypeBreakdown[];
  jobsBySkill: SkillBreakdown[];
  postedLast7d: number;
  postedLast30d: number;
}

export interface ComputeStatsOutput {
  stats: JobStats;
  report: JobAnalyticsReport;
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

    const now = Date.now();
    const ms7d = 7 * 24 * 60 * 60 * 1000;
    const ms30d = 30 * 24 * 60 * 60 * 1000;
    const postedLast7d = jobs.filter((j) => now - new Date(j.postedAt).getTime() <= ms7d).length;
    const postedLast30d = jobs.filter((j) => now - new Date(j.postedAt).getTime() <= ms30d).length;

    const sourceMap = new Map<string, number>();
    const companyMap = new Map<string, number>();
    const categoryMap = new Map<string, number>();
    const jobTypeMap = new Map<string, number>();
    const skillMap = new Map<string, number>();

    jobs.forEach((j) => {
      const src = j.source || 'Unknown';
      sourceMap.set(src, (sourceMap.get(src) ?? 0) + 1);
      const co = j.company?.trim() || 'Unknown';
      companyMap.set(co, (companyMap.get(co) ?? 0) + 1);
      const cat = j.category || 'Uncategorized';
      categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + 1);
      const type = j.jobType?.trim() || 'Full-time';
      jobTypeMap.set(type, (jobTypeMap.get(type) ?? 0) + 1);
      
      // Skills (Tags)
      if (j.tags && j.tags.length > 0) {
        j.tags.forEach(tag => {
          const t = tag.trim();
          if (t) skillMap.set(t, (skillMap.get(t) ?? 0) + 1);
        });
      }
    });

    const jobsBySource: SourceBreakdown[] = Array.from(sourceMap.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);

    const topCompanies: CompanyBreakdown[] = Array.from(companyMap.entries())
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 25);

    const jobsByCategory: CategoryBreakdown[] = Array.from(categoryMap.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    const jobsByType: JobTypeBreakdown[] = Array.from(jobTypeMap.entries())
      .map(([jobType, count]) => ({ jobType, count }))
      .sort((a, b) => b.count - a.count);

    const jobsBySkill: SkillBreakdown[] = Array.from(skillMap.entries())
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);

    const report: JobAnalyticsReport = {
      stats,
      jobsBySource,
      topCompanies,
      jobsByCategory,
      jobsByType,
      jobsBySkill,
      postedLast7d,
      postedLast30d,
    };

    return { stats, report };
  }
}
