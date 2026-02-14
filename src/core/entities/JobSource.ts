export interface JobSource {
  id: string;
  name: string;
  url: string;
  type: 'api' | 'rss' | 'json' | 'html' | 'ats';
  enabled: boolean;
  category: string;
  description: string;
  /** ATS key (greenhouse, lever, ashby, etc.) when type is 'ats'. */
  ats?: string;
  /** Company slug for URL when type is 'ats'. */
  companySlug?: string;
  /** Display company name when type is 'ats'. */
  companyName?: string;
}
