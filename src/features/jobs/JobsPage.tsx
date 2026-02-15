/**
 * Jobs Page - Main application page
 * Refactored to match Remote.com/jobs landing page design
 */
import { useJobsPageViewModel } from './useJobsPageViewModel';

// New Landing Page Components
import { Header } from '@/presentation/components/landing/Header';
import { Hero } from '@/presentation/components/landing/Hero';
import { JobFilters } from '@/presentation/components/landing/JobFilters';
import { JobList } from '@/presentation/components/landing/JobList';
import { Footer } from '@/presentation/components/landing/Footer';
import { JobDetails } from '@/presentation/components/landing/JobDetails';
import { JobAnalyticsReport } from './JobAnalyticsReport';

import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function JobsPage() {
  const vm = useJobsPageViewModel();
  
  if (vm.selectedJob) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
        <Header />
        <div className="pt-20">
          <JobDetails 
            job={vm.selectedJob} 
            onBack={() => vm.setSelectedJob(null)}
            isSaved={vm.savedJobs.some(j => j.id === vm.selectedJob?.id)}
            onToggleSave={() => vm.selectedJob && vm.toggleSaveJob(vm.selectedJob)}
          />
        </div>
        <Footer />
      </div>
    );
  }
  
  const progressPercent =
    vm.scrapeProgress.total > 0
      ? Math.round((vm.scrapeProgress.current / vm.scrapeProgress.total) * 100)
      : 0;
  
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      
      <main>
        <Hero />
        
        {/* Job Search Section - Overlapping Hero */}
        <div className="bg-[#FAFAFA] pb-24 relative">
          <JobFilters 
            searchQuery={vm.searchQuery}
            setSearchQuery={vm.setSearchQuery}
            onSearch={vm.handleScrape}
            loading={vm.loading}
            filter={vm.filter}
            setFilter={vm.setFilter}
          />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            
            {/* Full loading overlay only when no cached jobs */}
            {vm.loading && vm.jobs.length === 0 && (
              <div className="max-w-xl mx-auto mb-12 bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Scraping remote jobs...</p>
                        <p className="text-sm text-gray-500">{vm.scrapeProgress.currentSource}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{vm.scrapeProgress.jobsFound}</p>
                      <p className="text-xs text-gray-400">jobs found</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Progress value={progressPercent} className="h-2 bg-gray-100" />
                    <p className="text-xs text-right text-gray-400">
                      {vm.scrapeProgress.current} / {vm.scrapeProgress.total} sources
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Subtle "updating" when refreshing in background or manual search with cache */}
            {(vm.backgroundRefreshing || vm.loading) && vm.jobs.length > 0 && (
              <div className="max-w-xl mx-auto mb-6 flex items-center gap-3 rounded-full bg-blue-50 border border-blue-100 px-4 py-2.5 text-sm text-blue-700">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>
                   {vm.loading ? 'Searching...' : 'Updating jobs…'} {vm.scrapeProgress.current} / {vm.scrapeProgress.total} sources
                </span>
              </div>
            )}

            {/* Analytics report: companies and jobs breakdown */}
            {vm.hasScraped && vm.filteredJobs.length > 0 && vm.report && (
              <JobAnalyticsReport report={vm.report} lastUpdated={vm.lastUpdated ?? undefined} />
            )}

            <div className="flex flex-col lg:flex-row gap-8">
               {/* Sidebar / Stats / Additional Filters could go here */}
               
               {/* Main Job List */}
               <div className="w-full">
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                       {vm.loading && vm.jobs.length === 0 ? 'Searching for jobs...' :
                        vm.hasScraped ? `${vm.filteredJobs.length} Remote Jobs Found` : 'Latest Remote Jobs'
                       }
                    </h2>
                    
                    {/* Sort Dropdown placeholder */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                       <span>Sort by:</span>
                       <span className="text-[#0055FF] cursor-pointer">Most recent</span>
                    </div>
                 </div>

                 <JobList 
                   key={`jobs-${vm.searchQuery}-${(vm.filter.workplaceTypes ?? []).join(',')}-${(vm.filter.jobTypes ?? []).join(',')}-${(vm.filter.locations ?? []).join(',')}`}
                   jobs={vm.jobs}
                   loading={vm.loading}
                   hasMore={vm.hasMore}
                   onLoadMore={vm.loadMore}
                   onJobSelect={vm.setSelectedJob}
                   savedJobs={vm.savedJobs}
                   onToggleSave={vm.toggleSaveJob}
                 />
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
