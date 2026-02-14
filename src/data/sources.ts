import type { JobSource } from '@/core/entities';
import { buildATSSources } from './atsConfig';

const LEGACY_JOB_SOURCES: JobSource[] = [
  // ========== THE BIG THREE (High Volume) ==========
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/jobs/search?keywords=remote&location=Worldwide',
    type: 'rss',
    enabled: true,
    category: 'Big Three',
    description: 'World\'s largest professional network'
  },
  {
    id: 'indeed',
    name: 'Indeed',
    url: 'https://www.indeed.com/jobs?q=remote&l=remote',
    type: 'rss',
    enabled: true,
    category: 'Big Three',
    description: '#1 job site worldwide'
  },
  {
    id: 'ziprecruiter',
    name: 'ZipRecruiter',
    url: 'https://www.ziprecruiter.com/candidate/search?search=remote&location=',
    type: 'rss',
    enabled: true,
    category: 'Big Three',
    description: 'AI-powered job matching'
  },

  // ========== SPECIALIZED REMOTE BOARDS (API Friendly) ==========
  {
    id: 'remoteok',
    name: 'RemoteOK',
    url: 'https://remoteok.io/api',
    type: 'api',
    enabled: true,
    category: 'Remote Specialists',
    description: '30,000+ remote jobs, public JSON API'
  },
  {
    id: 'wwr',
    name: 'We Work Remotely',
    url: 'https://weworkremotely.com/remote-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Largest remote work community'
  },
  {
    id: 'wwr-programming',
    name: 'WWR - Programming',
    url: 'https://weworkremotely.com/categories/remote-programming-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Programming jobs from WWR'
  },
  {
    id: 'wwr-fullstack',
    name: 'WWR - Full Stack',
    url: 'https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Full stack development jobs'
  },
  {
    id: 'wwr-backend',
    name: 'WWR - Backend',
    url: 'https://weworkremotely.com/categories/remote-back-end-programming-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Backend development jobs'
  },
  {
    id: 'wwr-frontend',
    name: 'WWR - Frontend',
    url: 'https://weworkremotely.com/categories/remote-front-end-programming-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Frontend development jobs'
  },
  {
    id: 'wwr-devops',
    name: 'WWR - DevOps',
    url: 'https://weworkremotely.com/categories/remote-devops-sysadmin-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'DevOps and SysAdmin jobs'
  },
  {
    id: 'wwr-design',
    name: 'WWR - Design',
    url: 'https://weworkremotely.com/categories/remote-design-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Design and creative jobs'
  },
  {
    id: 'wwr-product',
    name: 'WWR - Product',
    url: 'https://weworkremotely.com/categories/remote-product-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Product management jobs'
  },
  {
    id: 'remotive',
    name: 'Remotive',
    url: 'https://remotive.com/api/remote-jobs',
    type: 'api',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Curated remote jobs, public API'
  },
  {
    id: 'himalayas',
    name: 'Himalayas',
    url: 'https://himalayas.app/jobs/api',
    type: 'api',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Remote-first companies'
  },
  {
    id: 'workingnomads',
    name: 'Working Nomads',
    url: 'https://www.workingnomads.com/jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Jobs for digital nomads'
  },
  {
    id: 'jobspresso',
    name: 'Jobspresso',
    url: 'https://jobspresso.co/remote-jobs/feed/',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Hand-picked remote jobs'
  },
  {
    id: 'justremote',
    name: 'JustRemote',
    url: 'https://justremote.co/remote-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Remote jobs worldwide'
  },
  {
    id: 'nodesk',
    name: 'Nodesk',
    url: 'https://nodesk.co/remote-jobs/feed/',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Curated remote opportunities'
  },
  {
    id: 'remoteco',
    name: 'Remote.co',
    url: 'https://remote.co/feed/',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Remote work resources'
  },
  {
    id: 'skipdrive',
    name: 'Skip The Drive',
    url: 'https://www.skipdrive.com/remote-jobs/feed/',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Skip the commute'
  },
  {
    id: 'pangian',
    name: 'Pangian',
    url: 'https://pangian.com/job-feed/',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Global remote talent'
  },
  {
    id: 'virtualvocations',
    name: 'Virtual Vocations',
    url: 'https://www.virtualvocations.com/jobs/remote-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Telecommuting jobs'
  },
  {
    id: 'dynamitejobs',
    name: 'Dynamite Jobs',
    url: 'https://dynamitejobs.com/remote-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Remote-first companies'
  },
  {
    id: 'dailyremote',
    name: 'DailyRemote',
    url: 'https://dailyremote.com/remote-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Daily remote job updates'
  },
  {
    id: 'remotecircle',
    name: 'Remote Circle',
    url: 'https://remotecircle.com/jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Find remote work circles'
  },
  {
    id: 'remotely',
    name: 'Remotely',
    url: 'https://remotely.com/jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Simple remote job search'
  },
  {
    id: 'crossover',
    name: 'Crossover',
    url: 'https://www.crossover.com/jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'High-paying remote jobs'
  },
  {
    id: 'europeremotely',
    name: 'EuropeRemotely',
    url: 'https://europeremotely.com/feed/',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Europe-focused remote jobs'
  },
  {
    id: 'remotiveio',
    name: 'Remotive.io',
    url: 'https://remotive.io/remote-jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Remote work community'
  },
  {
    id: 'remoterocketship',
    name: 'Remote Rocketship',
    url: 'https://remoterocketship.com/jobs.rss',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Launch your remote career'
  },
  {
    id: 'remoteleads',
    name: 'RemoteLeads',
    url: 'https://remoteleads.io/feed/',
    type: 'rss',
    enabled: true,
    category: 'Remote Specialists',
    description: 'Curated remote leads'
  },

  // ========== STARTUP & TECH NICHE ==========
  {
    id: 'wellfound',
    name: 'Wellfound (AngelList)',
    url: 'https://wellfound.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Startup jobs and talent'
  },
  {
    id: 'ycombinator',
    name: 'Y Combinator',
    url: 'https://www.workatastartup.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Work at YC startups'
  },
  {
    id: 'builtin',
    name: 'Built In',
    url: 'https://builtin.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Tech startup jobs'
  },
  {
    id: 'dice',
    name: 'Dice',
    url: 'https://www.dice.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Tech careers'
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Developer jobs'
  },
  {
    id: 'authenticjobs',
    name: 'Authentic Jobs',
    url: 'https://authenticjobs.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Design and tech jobs'
  },
  {
    id: 'gunio',
    name: 'Gun.io',
    url: 'https://www.gun.io/remote-jobs/',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Elite freelance developers'
  },
  {
    id: 'arc',
    name: 'Arc.dev',
    url: 'https://arc.dev/remote-jobs',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Remote developer jobs'
  },
  {
    id: 'toptal',
    name: 'Toptal',
    url: 'https://www.toptal.com/freelance-jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Top 3% freelance talent'
  },
  {
    id: 'keyvalues',
    name: 'Key Values',
    url: 'https://www.keyvalues.com/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Find teams you love'
  },
  {
    id: 'crunchboard',
    name: 'Crunchboard',
    url: 'https://www.crunchboard.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'TechCrunch job board'
  },
  {
    id: 'relocate',
    name: 'Relocate.me',
    url: 'https://relocate.me/remote-jobs',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Jobs with relocation'
  },
  {
    id: 'otta',
    name: 'Otta',
    url: 'https://otta.com/remote-jobs',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Rocketship companies'
  },
  {
    id: 'hired',
    name: 'Hired',
    url: 'https://hired.com/remote-jobs',
    type: 'rss',
    enabled: true,
    category: 'Startup & Tech',
    description: 'Get matched with companies'
  },

  // ========== DESIGN & CREATIVE ==========
  {
    id: 'dribbble',
    name: 'Dribbble Jobs',
    url: 'https://dribbble.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Design & Creative',
    description: 'Designer community jobs'
  },
  {
    id: 'behance',
    name: 'Behance',
    url: 'https://www.behance.net/joblist?remote',
    type: 'rss',
    enabled: true,
    category: 'Design & Creative',
    description: 'Creative portfolio jobs'
  },
  {
    id: 'coroflot',
    name: 'Coroflot',
    url: 'https://www.coroflot.com/design-jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Design & Creative',
    description: 'Design jobs worldwide'
  },
  {
    id: 'workingnotworking',
    name: 'Working Not Working',
    url: 'https://workingnotworking.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Design & Creative',
    description: 'Creative talent'
  },
  {
    id: 'krop',
    name: 'Krop',
    url: 'https://www.krop.com/jobs/remote/',
    type: 'rss',
    enabled: true,
    category: 'Design & Creative',
    description: 'Creative industry jobs'
  },
  {
    id: 'aiga',
    name: 'AIGA Design Jobs',
    url: 'https://designjobs.aiga.org/remote-jobs/',
    type: 'rss',
    enabled: true,
    category: 'Design & Creative',
    description: 'Professional design association'
  },

  // ========== WRITING, MARKETING & SUPPORT ==========
  {
    id: 'problogger',
    name: 'ProBlogger',
    url: 'https://problogger.com/jobs/feed/',
    type: 'rss',
    enabled: true,
    category: 'Writing & Marketing',
    description: 'Blogging jobs'
  },
  {
    id: 'contena',
    name: 'Contena',
    url: 'https://www.contena.co/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Writing & Marketing',
    description: 'Writing opportunities'
  },
  {
    id: 'mediabistro',
    name: 'MediaBistro',
    url: 'https://www.mediabistro.com/jobs/remote/',
    type: 'rss',
    enabled: true,
    category: 'Writing & Marketing',
    description: 'Media jobs'
  },
  {
    id: 'journalismjobs',
    name: 'JournalismJobs',
    url: 'https://www.journalismjobs.com/remote-jobs',
    type: 'rss',
    enabled: true,
    category: 'Writing & Marketing',
    description: 'Journalism careers'
  },
  {
    id: 'growthhub',
    name: 'GrowthHub',
    url: 'https://growthhub.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Writing & Marketing',
    description: 'Growth marketing jobs'
  },
  {
    id: 'supportdriven',
    name: 'Support Driven',
    url: 'https://supportdriven.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Writing & Marketing',
    description: 'Customer support jobs'
  },

  // ========== FREELANCE & GIG ==========
  {
    id: 'upwork',
    name: 'Upwork',
    url: 'https://www.upwork.com/nx/jobs/search/?q=remote',
    type: 'rss',
    enabled: true,
    category: 'Freelance',
    description: 'World\'s work marketplace'
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    url: 'https://www.fiverr.com/gigs/remote',
    type: 'rss',
    enabled: true,
    category: 'Freelance',
    description: 'Freelance services'
  },
  {
    id: 'freelancer',
    name: 'Freelancer.com',
    url: 'https://www.freelancer.com/jobs/remote/',
    type: 'rss',
    enabled: true,
    category: 'Freelance',
    description: 'Global freelancing'
  },
  {
    id: 'guru',
    name: 'Guru',
    url: 'https://www.guru.com/d/jobs/remote/',
    type: 'rss',
    enabled: true,
    category: 'Freelance',
    description: 'Freelance professionals'
  },
  {
    id: 'peopleperhour',
    name: 'PeoplePerHour',
    url: 'https://www.peopleperhour.com/freelance-jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Freelance',
    description: 'Hourly freelance work'
  },

  // ========== REGIONAL ==========
  {
    id: 'jobrack',
    name: 'JobRack',
    url: 'https://jobrack.eu/remote-jobs',
    type: 'rss',
    enabled: true,
    category: 'Regional',
    description: 'Eastern Europe focus'
  },
  {
    id: 'near',
    name: 'Near (LATAM)',
    url: 'https://near.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Regional',
    description: 'Latin America remote'
  },
  {
    id: 'remotelyca',
    name: 'Remotely.ca',
    url: 'https://remotely.ca/jobs/feed/',
    type: 'rss',
    enabled: true,
    category: 'Regional',
    description: 'Canada remote jobs'
  },
  {
    id: 'workana',
    name: 'Workana',
    url: 'https://www.workana.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Regional',
    description: 'Latin America freelance'
  },
  {
    id: 'landingjobs',
    name: 'Landing.jobs',
    url: 'https://landing.jobs/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Regional',
    description: 'Europe tech jobs'
  },
  {
    id: 'jobbio',
    name: 'Jobbio',
    url: 'https://jobbio.com/remote-jobs',
    type: 'rss',
    enabled: true,
    category: 'Regional',
    description: 'UK/Europe jobs'
  },
  {
    id: 'arbeitnow',
    name: 'Arbeitnow',
    url: 'https://www.arbeitnow.com/api/job-board-api',
    type: 'api',
    enabled: true,
    category: 'Regional',
    description: 'Europe with visa sponsorship'
  },

  // ========== AGGREGATORS ==========
  {
    id: 'simplyhired',
    name: 'SimplyHired',
    url: 'https://www.simplyhired.com/search?q=remote',
    type: 'rss',
    enabled: true,
    category: 'Aggregators',
    description: 'Job search engine'
  },
  {
    id: 'careerjet',
    name: 'CareerJet',
    url: 'https://www.careerjet.com/remote-jobs.html',
    type: 'rss',
    enabled: true,
    category: 'Aggregators',
    description: 'Job search made simple'
  },
  {
    id: 'adzuna',
    name: 'Adzuna',
    url: 'https://www.adzuna.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Aggregators',
    description: 'Every job, everywhere'
  },
  {
    id: 'jooble',
    name: 'Jooble',
    url: 'https://jooble.org/remote-jobs',
    type: 'rss',
    enabled: true,
    category: 'Aggregators',
    description: 'Jobs in 71 countries'
  },
  {
    id: 'talent',
    name: 'Talent.com',
    url: 'https://ca.talent.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Aggregators',
    description: 'Formerly Neuvoo'
  },

  // ========== DIVERSITY & INCLUSION ==========
  {
    id: 'diversifytech',
    name: 'Diversify Tech',
    url: 'https://www.diversifytech.co/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Diversity',
    description: 'Underrepresented in tech'
  },
  {
    id: 'techladies',
    name: 'Tech Ladies',
    url: 'https://www.hiretechladies.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Diversity',
    description: 'Women in tech'
  },
  {
    id: 'powertofly',
    name: 'PowerToFly',
    url: 'https://powertofly.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Diversity',
    description: 'Diverse talent matching'
  },
  {
    id: 'womenwhocode',
    name: 'Women Who Code',
    url: 'https://www.womenwhocode.com/jobs/remote',
    type: 'rss',
    enabled: true,
    category: 'Diversity',
    description: 'Empowering women in tech'
  },

  // ========== HACKER NEWS & COMMUNITY ==========
  {
    id: 'hackernews',
    name: 'Hacker News Jobs',
    url: 'https://hn.algolia.com/?query=remote&sort=byDate',
    type: 'api',
    enabled: true,
    category: 'Community',
    description: 'HN Who is Hiring'
  },
  {
    id: 'hn-jobs',
    name: 'Hacker News Jobs (YC)',
    url: 'https://news.ycombinator.com/jobs',
    type: 'html',
    enabled: true,
    category: 'Community',
    description: 'Jobs at YC startups from news.ycombinator.com/jobs'
  },

  // ========== JOBS COLLIDER (Additional Categories) ==========
  {
    id: 'jobscollider-dev',
    name: 'JobsCollider - Dev',
    url: 'https://jobscollider.com/remote-jobs/software-development.rss',
    type: 'rss',
    enabled: true,
    category: 'Programming',
    description: 'Software development'
  },
  {
    id: 'jobscollider-data',
    name: 'JobsCollider - Data',
    url: 'https://jobscollider.com/remote-jobs/data.rss',
    type: 'rss',
    enabled: true,
    category: 'Data',
    description: 'Data science jobs'
  },
  {
    id: 'jobscollider-qa',
    name: 'JobsCollider - QA',
    url: 'https://jobscollider.com/remote-jobs/qa.rss',
    type: 'rss',
    enabled: true,
    category: 'QA',
    description: 'Quality assurance'
  },
  {
    id: 'jobscollider-security',
    name: 'JobsCollider - Security',
    url: 'https://jobscollider.com/remote-jobs/cybersecurity.rss',
    type: 'rss',
    enabled: true,
    category: 'Security',
    description: 'Cybersecurity jobs'
  },

  // ========== REAL WORK FROM ANYWHERE ==========
  {
    id: 'rwfa-developer',
    name: 'RWFA - Developer',
    url: 'https://www.realworkfromanywhere.com/rss/developer',
    type: 'rss',
    enabled: true,
    category: 'Programming',
    description: 'Developer jobs'
  },
  {
    id: 'rwfa-engineer',
    name: 'RWFA - Engineer',
    url: 'https://www.realworkfromanywhere.com/rss/engineer',
    type: 'rss',
    enabled: true,
    category: 'Programming',
    description: 'Engineering jobs'
  },
  {
    id: 'rwfa-fullstack',
    name: 'RWFA - Full Stack',
    url: 'https://www.realworkfromanywhere.com/rss/fullstack',
    type: 'rss',
    enabled: true,
    category: 'Programming',
    description: 'Full stack jobs'
  },
  {
    id: 'rwfa-design',
    name: 'RWFA - Design',
    url: 'https://www.realworkfromanywhere.com/rss/design',
    type: 'rss',
    enabled: true,
    category: 'Design & Creative',
    description: 'Design jobs'
  },
  {
    id: 'rwfa-senior',
    name: 'RWFA - Senior',
    url: 'https://www.realworkfromanywhere.com/rss/senior',
    type: 'rss',
    enabled: true,
    category: 'Senior',
    description: 'Senior level positions'
  },
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
