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
  sortBy: 'recent', // specific user request: "based on recent ones" usually implies default too, or at least the option. Let's default to recent as it's often preferred for job boards.
};

// Load from cache on init so first paint shows cached jobs
function getInitialJobs(): Job[] {
  return JobCacheService.getCachedJobs();
}

function mergeUniqueJobs(existing: Job[], incoming: Job[]): Job[] {
  if (incoming.length === 0) return existing;
  const seen = new Set(
    existing.map((j) => `${j.title.toLowerCase()}::${j.company.toLowerCase()}::${j.url.toLowerCase()}`)
  );
  const merged = [...existing];
  for (const job of incoming) {
    const key = `${job.title.toLowerCase()}::${job.company.toLowerCase()}::${job.url.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(job);
    }
  }
  return merged;
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

  // On load: show cached jobs immediately; run scrape in parallel (background)
  // On load: resume active session or start new one parallely
  useEffect(() => {
    const runBackgroundScrape = async () => {
      const { sources: allSourceList } = getSourcesUseCase.execute();
      const enabledSources = allSourceList.filter((s) => s.enabled).map((s) => s.id);
      
      let sourcesToScrape = enabledSources;
      let isResuming = false;
      const cachedCount = JobCacheService.getCachedJobs().length;

      // Check for active session to resume
      const session = JobCacheService.getSession();
      const SESSION_TTL = 30 * 60 * 1000; // 30 minutes to resume
      
      if (session && session.status === 'running' && (Date.now() - session.startedAt < SESSION_TTL)) {
        // Resume session: filter out completed sources
        const completedSet = new Set(session.completedSources);
        sourcesToScrape = enabledSources.filter(id => !completedSet.has(id));
        isResuming = true;
        
        if (sourcesToScrape.length === 0) {
           JobCacheService.endSession();
           setBackgroundRefreshing(false);
           setScrapeProgress(prev => ({ ...prev, isComplete: true }));
           return;
        }
      } else {
        // Start new session logic
        const cacheFresh = JobCacheService.isCacheFresh(cacheTtlMs);
        if (cachedCount > 0 && cacheFresh) {
          setBackgroundRefreshing(false);
          setScrapeProgress((prev) => ({ ...prev, isComplete: true }));
          return;
        }
        JobCacheService.startSession(enabledSources.length);
      }

      if (cachedCount === 0) {
        setLoading(true);
      } else {
        setBackgroundRefreshing(true);
      }
      
      // If resuming, set initial progress to what we know
      setScrapeProgress((prev) => ({ 
        ...prev, 
        current: isResuming ? (enabledSources.length - sourcesToScrape.length) : 0,
        total: enabledSources.length,
        isComplete: false 
      }));

      try {
        const { jobs: scrapedJobs } = await scrapeJobsUseCase.execute(
          {
            keywords: [], // No keyword filter: fetch all jobs; user filters client-side after load
            selectedSources: sourcesToScrape,
            maxJobsPerSource: 100,
          },
          (progress) => {
            // progress.current is local to this batch (0 to sourcesToScrape.length)
            // We need to map it to global progress if resuming
            const globalCurrent = isResuming 
               ? (enabledSources.length - sourcesToScrape.length) + progress.current
               : progress.current;

            setScrapeProgress({
               ...progress,
               current: globalCurrent,
               total: enabledSources.length
            });

            if (progress.currentSourceId) {
              JobCacheService.markSourceComplete(progress.currentSourceId);
            }

            if ((progress.newJobs?.length || 0) > 0) {
              setJobs((prev) => {
                const merged = mergeUniqueJobs(prev, progress.newJobs || []);
                JobCacheService.saveJobs(merged);
                return merged;
              });
              setLastUpdated(new Date());
              setHasScraped(true);
              setShowFilters(true);
            }
          }
        );

        if (scrapedJobs.length > 0) {
           // Final merge to be safe, though progress updates handle it
           setJobs(prev => {
              const merged = mergeUniqueJobs(prev, scrapedJobs);
              JobCacheService.saveJobs(merged);
              return merged;
           });
           setLastUpdated(new Date());
           setHasScraped(true);
           setShowFilters(true);
        }
        
        JobCacheService.endSession();
      } catch {
        // Keep existing jobs (cache)
      } finally {
        setLoading(false);
        setBackgroundRefreshing(false);
        setScrapeProgress((prev) => ({ ...prev, isComplete: true }));
      }
    };

    runBackgroundScrape();
  }, [cacheTtlMs]); // eslint-disable-line react-hooks/exhaustive-deps

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
        (progress) => {
          setScrapeProgress(progress);
          if ((progress.newJobs?.length || 0) > 0) {
            setJobs((prev) => {
              const merged = mergeUniqueJobs(prev, progress.newJobs || []);
              JobCacheService.saveJobs(merged);
              return merged;
            });
            setLastUpdated(new Date());
          }
        }
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
