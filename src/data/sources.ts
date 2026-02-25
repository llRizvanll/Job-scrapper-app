import type { JobSource } from '@/core/entities';
import { buildATSSources } from './atsConfig';

const LEGACY_JOB_SOURCES: JobSource[] = [
  {
    id: 'vercel-backend',
    name: 'Vercel Backend',
    url: 'https://scraper-backend-app.vercel.app/jobs',
    type: 'api',
    enabled: true,
    category: 'Backend',
    description: 'Centralized job scraping backend on Vercel'
  }
];

/** All job sources: legacy (RSS/API/HTML) + ATS-derived (Greenhouse, Lever, Ashby, etc.). */
export const JOB_SOURCES: JobSource[] = [...LEGACY_JOB_SOURCES, ...buildATSSources()];

export const getEnabledSources = (): JobSource[] => 
  JOB_SOURCES.filter(s => s.enabled);

export const getSourcesByCategory = (): Record<string, JobSource[]> => {
  const grouped: Record<string, JobSource[]> = {};
  JOB_SOURCES.forEach(source => {
    if (!grouped[source.category]) {
      grouped[source.category] = [];
    }
    grouped[source.category].push(source);
  });
  return grouped;
};

export const SOURCE_CATEGORIES = [
  'Big Three',
  'Remote Specialists',
  'Startup & Tech',
  'Programming',
  'Design & Creative',
  'Writing & Marketing',
  'Freelance',
  'Regional',
  'Aggregators',
  'Diversity',
  'Community',
  'Data',
  'QA',
  'Security',
  'Senior',
  'ATS - Greenhouse',
  'ATS - Lever',
  'ATS - Ashby',
  'ATS - Workable',
  'ATS - SmartRecruiters',
  'ATS - Breezy HR',
  'ATS - BambooHR',
  'ATS - Teamtailor',
];
