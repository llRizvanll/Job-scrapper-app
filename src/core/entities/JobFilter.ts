export interface JobFilter {
  keywords: string[];
  jobTypes: string[]; // e.g., 'Full-time', 'Contract'
  workplaceTypes: string[]; // e.g., 'Remote', 'Hybrid', 'On-site'
  locations: string[]; // e.g., 'United States', 'Europe'
  minSalary?: number;
  salaryCurrency?: string;
  postedWithin: string;
  sources: string[];
}
