/**
 * ViewModel - Jobs Page
 * Orchestrates use cases and manages presentation state
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Job, JobFilter, JobSource, ScrapeProgress } from '@/core/entities';
import { getConfig } from '@/config';
import {
  scrapeJobsUseCase,
  filterJobsUseCase,
  getSourcesUseCase,
  manageCustomSourcesUseCase,
  computeStatsUseCase,
} from '@/core/container';

const DEFAULT_FILTER: JobFilter = {
  keywords: [],
  location: '',
  jobType: '',
  salaryRange: '',
  postedWithin: '',
  sources: [],
};

export function useJobsPageViewModel() {
  const config = getConfig();
  const jobsPerBatch = config.scraping.jobsPerBatch;
  const defaultKeywords = config.keywords.default;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasScraped, setHasScraped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKeywords, setActiveKeywords] = useState<string[]>([defaultKeywords[0]]);
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

  const loaderRef = useRef<HTMLDivElement>(null);

  const filteredJobs = filterJobsUseCase.execute({
    jobs,
    filter,
    searchQuery,
  }).filteredJobs;

  const stats = computeStatsUseCase.execute({ jobs: filteredJobs }).stats;

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    const endIndex = nextPage * jobsPerBatch;
    const newJobs = filteredJobs.slice(0, endIndex);
    setDisplayedJobs(newJobs);
    setHasMore(endIndex < filteredJobs.length);
    setPage(nextPage);
  }, [filteredJobs, hasMore, loading, page, jobsPerBatch]);

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

  const handleScrape = useCallback(async (): Promise<number> => {
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
          keywords: activeKeywords,
          selectedSources: sourcesToUse,
          maxJobsPerSource: 100,
        },
        (progress) => setScrapeProgress(progress)
      );

      setJobs(scrapedJobs);
      setDisplayedJobs(scrapedJobs.slice(0, jobsPerBatch));
      setHasMore(scrapedJobs.length > jobsPerBatch);
      setLastUpdated(new Date());
      setScrapeProgress((prev) => ({ ...prev, isComplete: true }));
      return scrapedJobs.length;
    } catch {
      throw new Error('Scrape failed');
    } finally {
      setLoading(false);
    }
  }, [activeKeywords, selectedSources, jobsPerBatch]);

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
    defaultKeywords,
    handleScrape,
    handleKeywordSelect,
    handleAddCustomSource,
    handleRemoveCustomSource,
    handleTestCustomSource,
    loadMore,
    selectedJob,
    setSelectedJob,
  };
}
