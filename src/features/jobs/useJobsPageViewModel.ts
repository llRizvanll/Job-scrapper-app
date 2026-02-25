/**
 * ViewModel - Jobs Page
 * Orchestrates use cases and manages presentation state
 */
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import type { Job, JobFilter, JobSource, ScrapeProgress } from '@/core/entities';
import { getConfig } from '@/config';
import { filterJobsUseCase, getSourcesUseCase, manageCustomSourcesUseCase, computeStatsUseCase } from '@/core/container';
import { JobCacheService } from '@/core/services/JobCacheService';
import { SavedJobService } from '@/core/services/SavedJobService';

const DEFAULT_FILTER: JobFilter = {
  keywords: [],
  jobTypes: [],
  workplaceTypes: [],
  locations: [],
  postedWithin: '',
  sources: [],
  sortBy: 'recent', // specific user request: "based on recent ones" usually implies default too, or at least the option. Let's default to recent as it's often preferred for job boards.
};

// Load from cache on init so first paint shows cached jobs
function getInitialJobs(): Job[] {
  return JobCacheService.getCachedJobs();
}

export function useJobsPageViewModel() {
  const config = getConfig();
  const jobsPerBatch = config.scraping.jobsPerBatch;
  const defaultKeywords = config.keywords.default;
  const cacheTtlMs = config.scraping.cacheTtlMs;
  const initialJobs = getInitialJobs();

  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasScraped, setHasScraped] = useState(() => initialJobs.length > 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(() => initialJobs.length > 0);
  const [showSources, setShowSources] = useState(false);
  const [showCustomSource, setShowCustomSource] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(JobCacheService.getLastUpdated());
  const [customSources, setCustomSources] = useState<JobSource[]>(() =>
    manageCustomSourcesUseCase.getCustomSources()
  );
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [scrapeProgress, setScrapeProgress] = useState<ScrapeProgress>({
    current: 0,
    total: 0,
    currentSource: '',
    jobsFound: 0,
    isComplete: false,
  });
  const [filter, setFilter] = useState<JobFilter>(DEFAULT_FILTER);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);

  // On load: fetch jobs from external REST API (scraper-backend-app.vercel.app)
  const JOBS_API_URL = 'https://scraper-backend-app.vercel.app/jobs';

  useEffect(() => {
    const fetchJobsFromApi = async () => {
      try {
        setLoading(true);
        setBackgroundRefreshing(true);
        setScrapeProgress((prev) => ({
          ...prev,
          current: 0,
          total: 1,
          currentSource: 'Scraper API',
          jobsFound: 0,
          isComplete: false,
        }));

        const response = await fetch(JOBS_API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }

        const backendJobs: {
          id: string;
          title: string;
          company: string;
          location: string | null;
          url: string;
          description: string | null;
          postedAt: string | null;
          skills?: string[];
        }[] = await response.json();

        const mapped: Job[] = backendJobs.map((j) => ({
          id: j.id,
          title: j.title,
          company: j.company,
          companyLogo: undefined,
          location: j.location ?? 'Remote',
          salary: undefined,
          jobType: 'Full-time',
          description: j.description ?? '',
          url: j.url,
          postedAt: j.postedAt ?? new Date().toISOString(),
          tags: j.skills ?? [],
          source: 'Scraper API',
          category: undefined,
        }));

        setJobs(mapped);
        JobCacheService.saveJobs(mapped);
        setLastUpdated(new Date());
        setHasScraped(true);
        setShowFilters(true);
        setScrapeProgress({
          current: 1,
          total: 1,
          currentSource: 'Scraper API',
          jobsFound: mapped.length,
          isComplete: true,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load jobs from Scraper API', error);
        // keep existing cached jobs if API fails
        setScrapeProgress((prev) => ({ ...prev, isComplete: true }));
      } finally {
        setLoading(false);
        setBackgroundRefreshing(false);
      }
    };

    fetchJobsFromApi();
  }, [cacheTtlMs]);

  const filteredJobs = useMemo(() => filterJobsUseCase.execute({
    jobs,
    filter,
    searchQuery,
  }).filteredJobs, [jobs, filter, searchQuery]);

  const { stats, report } = computeStatsUseCase.execute({ jobs: filteredJobs });

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    const endIndex = nextPage * jobsPerBatch;
    const newJobs = filteredJobs.slice(0, endIndex);
    setDisplayedJobs(newJobs);
    setHasMore(endIndex < filteredJobs.length);
    setPage(nextPage);
  }, [filteredJobs, hasMore, loading, page, jobsPerBatch]);

  // Sync displayed results whenever filters, search, or raw jobs change
  useEffect(() => {
    setDisplayedJobs(filteredJobs.slice(0, jobsPerBatch));
    setHasMore(filteredJobs.length > jobsPerBatch);
    setPage(1);
  }, [filteredJobs, jobsPerBatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) loadMore();
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore, loading]);

  useEffect(() => {
    setCustomSources(manageCustomSourcesUseCase.getCustomSources());
  }, [showCustomSource]);

  useEffect(() => {
    setSavedJobs(SavedJobService.getSavedJobs());
  }, []);

  const toggleSaveJob = useCallback((job: Job) => {
    setSavedJobs(prev => {
      const isSaved = prev.some(j => j.id === job.id);
      if (isSaved) {
        return SavedJobService.removeJob(job.id);
      } else {
        return SavedJobService.saveJob(job);
      }
    });
  }, []);

  // Manual refresh: refetch from external REST API (scraper-backend-app.vercel.app)
  const handleScrape = useCallback(async (): Promise<number> => {
    if (loading) return 0;
    try {
      setLoading(true);
      setHasScraped(true);
      setScrapeProgress({
        current: 0,
        total: 1,
        currentSource: 'Scraper API',
        jobsFound: 0,
        isComplete: false,
      });

      const response = await fetch(JOBS_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }
      const backendJobs: {
        id: string;
        title: string;
        company: string;
        location: string | null;
        url: string;
        description: string | null;
        postedAt: string | null;
        skills?: string[];
      }[] = await response.json();

      const mapped: Job[] = backendJobs.map((j) => ({
        id: j.id,
        title: j.title,
        company: j.company,
        companyLogo: undefined,
        location: j.location ?? 'Remote',
        salary: undefined,
        jobType: 'Full-time',
        description: j.description ?? '',
        url: j.url,
        postedAt: j.postedAt ?? new Date().toISOString(),
        tags: j.skills ?? [],
        source: 'Scraper API',
        category: undefined,
      }));

      setJobs(mapped);
      JobCacheService.saveJobs(mapped);
      setLastUpdated(new Date());
      setScrapeProgress({
        current: 1,
        total: 1,
        currentSource: 'Scraper API',
        jobsFound: mapped.length,
        isComplete: true,
      });
      return mapped.length;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to refresh jobs from Scraper API', error);
      setScrapeProgress((prev) => ({ ...prev, isComplete: true }));
      return 0;
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const handleKeywordSelect = useCallback((keyword: string) => {
    setActiveKeywords([keyword]);
  }, []);

  const handleAddCustomSource = useCallback((source: JobSource) => {
    manageCustomSourcesUseCase.addCustomSource({ source });
    setCustomSources(manageCustomSourcesUseCase.getCustomSources());
  }, []);

  const handleRemoveCustomSource = useCallback((sourceId: string) => {
    manageCustomSourcesUseCase.removeCustomSource({ sourceId });
    setCustomSources(manageCustomSourcesUseCase.getCustomSources());
    setSelectedSources((prev) => prev.filter((id) => id !== sourceId));
  }, []);

  const handleTestCustomSource = useCallback(
    async (url: string, type: 'rss' | 'json' | 'html') => {
      return manageCustomSourcesUseCase.testCustomSource({ url, type });
    },
    []
  );

  const allSources = getSourcesUseCase.execute().sources;

  return {
    jobs: displayedJobs,
    allSources,
    filteredJobs,
    loading,
    hasScraped,
    searchQuery,
    setSearchQuery,
    activeKeywords,
    showFilters,
    setShowFilters,
    showSources,
    setShowSources,
    showCustomSource,
    setShowCustomSource,
    lastUpdated,
    customSources,
    selectedSources,
    setSelectedSources,
    filter,
    setFilter,
    scrapeProgress,
    hasMore,
    loaderRef,
    stats,
    report,
    defaultKeywords,
    handleScrape,
    handleKeywordSelect,
    handleAddCustomSource,
    handleRemoveCustomSource,
    handleTestCustomSource,
    loadMore,
    selectedJob,
    setSelectedJob,
    backgroundRefreshing,
    savedJobs,
    toggleSaveJob,
  };
}
