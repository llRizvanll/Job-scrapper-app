import type { Job, JobFilter } from '../entities';

export interface FilterJobsInput {
  jobs: Job[];
  filter: JobFilter;
  searchQuery: string;
}

export interface FilterJobsOutput {
  filteredJobs: Job[];
}

export class FilterJobsUseCase {
  execute(input: FilterJobsInput): FilterJobsOutput {
    const { jobs, filter, searchQuery } = input;

    const filteredJobs = jobs.filter((job) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matches) return false;
      }

      if (filter.location) {
        if (!job.location.toLowerCase().includes(filter.location.toLowerCase())) return false;
      }

      if (filter.jobType) {
        if (job.jobType.toLowerCase() !== filter.jobType.toLowerCase()) return false;
      }

      if (filter.salaryRange && job.salary) {
        const salary = job.salary.toLowerCase();
        let matches = false;
        switch (filter.salaryRange) {
          case '0-50k':
            matches = /\b[3-5]0?k?\b/i.test(salary);
            break;
          case '50k-100k':
            matches = /\b[6-9]0?k?\b|100k?\b/i.test(salary);
            break;
          case '100k-150k':
            matches = /\b1[0-4]0?k?\b|150k?\b/i.test(salary);
            break;
          case '150k+':
            matches = /\b1[5-9]0?k?\b|[2-9]00?k?\b/i.test(salary);
            break;
        }
        if (!matches) return false;
      }

      if (filter.postedWithin) {
        const now = new Date().getTime();
        const jobDate = new Date(job.postedAt).getTime();
        const diffHours = (now - jobDate) / (1000 * 60 * 60);
        switch (filter.postedWithin) {
          case '24h':
            if (diffHours > 24) return false;
            break;
          case '7d':
            if (diffHours > 168) return false;
            break;
          case '30d':
            if (diffHours > 720) return false;
            break;
        }
      }

      if (filter.sources.length > 0) {
        if (
          !filter.sources.some((s) => job.source.toLowerCase().includes(s.toLowerCase()))
        ) {
          return false;
        }
      }

      return true;
    });

    return { filteredJobs };
  }
}
