export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  jobType: string;
  description: string;
  url: string;
  postedAt: string;
  tags: string[];
  source: string;
  category?: string;
}
