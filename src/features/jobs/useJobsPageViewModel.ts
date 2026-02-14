/**
 * ViewModel - Jobs Page
 * Orchestrates use cases and manages presentation state
 */
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import type { Job, JobFilter, JobSource, ScrapeProgress } from '@/core/entities';
import { getConfig } from '@/config';
import {
  scrapeJobsUseCase,
  filterJobsUseCase,
  getSourcesUseCase,
  manageCustomSourcesUseCase,
  computeStatsUseCase,
} from '@/core/container';
import { JobCacheService } from '@/core/services/JobCacheService';

const DEFAULT_FILTER: JobFilter = {
  keywords: [],
  jobTypes: [],
  workplaceTypes: [],
  locations: [],
  postedWithin: '',
  sources: [],
};

// Load from cache on init so first paint shows cached jobs
function getInitialJobs(): Job[] {
  return JobCacheService.getCachedJobs();
}

export function useJobsPageViewModel() {
  const config = getConfig();
  const jobsPerBatch = config.scraping.jobsPerBatch;
  const defaultKeywords = config.keywords.default;

  const [jobs, setJobs] = useState<Job[]>(getInitialJobs);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasScraped, setHasScraped] = useState(() => getInitialJobs().length > 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showCustomSource, setShowCustomSource] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
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

  // On load: show cached jobs immediately; run scrape in parallel (background)
  useEffect(() => {
    const runBackgroundScrape = async () => {
      const cachedCount = JobCacheService.getCachedJobs().length;
      const isFirstLoadNoCache = cachedCount === 0;

      if (isFirstLoadNoCache) {
        setLoading(true);
      } else {
        setBackgroundRefreshing(true);
      }
      setScrapeProgress((prev) => ({ ...prev, isComplete: false }));

      const { sources: allSourceList } = getSourcesUseCase.execute();
      const sourcesToUse =
        allSourceList.filter((s) => s.enabled).map((s) => s.id);

      try {
        const { jobs: scrapedJobs } = await scrapeJobsUseCase.execute(
          {
            keywords: [], // No keyword filter: fetch all jobs; user filters client-side after load
            selectedSources: sourcesToUse,
            maxJobsPerSource: 100,
          },
          (progress) => setScrapeProgress(progress)
        );

        if (scrapedJobs.length > 0) {
          setJobs(scrapedJobs);
          JobCacheService.saveJobs(scrapedJobs);
          setLastUpdated(new Date());
          setHasScraped(true);
          setShowFilters(true); // Show filter options once data is loaded
        }
      } catch {
        // Keep existing jobs (cache)
      } finally {
        setLoading(false);
        setBackgroundRefreshing(false);
        setScrapeProgress((prev) => ({ ...prev, isComplete: true }));
      }
    };

    runBackgroundScrape();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- run once on mount 

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

  // Manual search (e.g. user clicked Search): full loading, then show results or keep cache
  const handleScrape = useCallback(async (): Promise<number> => {
    if (loading) return 0;
    setLoading(true);
    setHasScraped(true);
    setScrapeProgress({
      current: 0,
      total: 0,
      currentSource: '',
      jobsFound: 0,
      isComplete: false,
    });

    const { sources: allSourceList } = getSourcesUseCase.execute();
    const sourcesToUse =
      selectedSources.length > 0
        ? selectedSources
        : allSourceList.filter((s) => s.enabled).map((s) => s.id);

    try {
      const { jobs: scrapedJobs } = await scrapeJobsUseCase.execute(
        {
          keywords: [], // Always fetch all jobs; user filters via search & filters after load
          selectedSources: sourcesToUse,
          maxJobsPerSource: 100,
        },
        (progress) => setScrapeProgress(progress)
      );

      if (scrapedJobs.length > 0) {
        setJobs(scrapedJobs);
        JobCacheService.saveJobs(scrapedJobs);
        setLastUpdated(new Date());
      }
      // If scrape returned empty or failed, jobs stay as-is (cached)
      setScrapeProgress((prev) => ({ ...prev, isComplete: true }));
      return scrapedJobs.length;
    } catch {
      return 0;
    } finally {
      setLoading(false);
    }
  }, [selectedSources, loading]);

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
  };
}
