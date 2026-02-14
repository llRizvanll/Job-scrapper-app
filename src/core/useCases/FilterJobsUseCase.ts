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
      // 1. Search Query (Title, Company, Tags)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches =
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // 2. Job Type (Multi-select OR)
      if (filter.jobTypes && filter.jobTypes.length > 0) {
        // Map job.jobType to expected types if necessary, or just loose match
        const jobType = job.jobType?.toLowerCase() || '';
        const hasMatch = filter.jobTypes.some(t => jobType.includes(t.toLowerCase()));
        if (!hasMatch) return false;
      }

      // 3. Workplace Type (Remote, Hybrid, On-site)
      if (filter.workplaceTypes && filter.workplaceTypes.length > 0) {
        const isRemote = job.location.toLowerCase().includes('remote') || job.tags.some(t => t.toLowerCase().includes('remote'));
        const isHybrid = job.location.toLowerCase().includes('hybrid') || job.tags.some(t => t.toLowerCase() === 'hybrid');
        const isOnSite = !isRemote && !isHybrid; // Simplification

        let matchesWorkplace = false;
        if (filter.workplaceTypes.includes('Remote') && isRemote) matchesWorkplace = true;
        if (filter.workplaceTypes.includes('Hybrid') && isHybrid) matchesWorkplace = true;
        if (filter.workplaceTypes.includes('On-site') && isOnSite) matchesWorkplace = true;
        
        if (!matchesWorkplace) return false;
      }

      // 4. Locations (Country/Timezone)
      if (filter.locations && filter.locations.length > 0) {
        const jobLoc = job.location.toLowerCase();
        const hasMatch = filter.locations.some(loc => jobLoc.includes(loc.toLowerCase()));
        if (!hasMatch) return false;
      }

      // 5. Salary
      if (filter.minSalary && job.salary) {
        // Basic extraction of numbers from string
        const matches = job.salary.match(/(\d+)[kK]?/g);
        if (matches) {
           // This is a naive parser, improved real-world logic would be needed
           const nums = matches.map(m => parseInt(m.replace(/[kK]/i, '000')));
           const maxSalary = Math.max(...nums);
           if (maxSalary < filter.minSalary) return false;
        }
      }

      // 6. Posted Within
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

      // 7. Sources
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
