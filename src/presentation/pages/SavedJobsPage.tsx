
import { Header } from '@/presentation/components/landing/Header';
import { Footer } from '@/presentation/components/landing/Footer';
import { JobList } from '@/presentation/components/landing/JobList';
import { JobDetails } from '@/presentation/components/landing/JobDetails';
import { useJobsPageViewModel } from '@/features/jobs/useJobsPageViewModel';
import { Bookmark } from 'lucide-react';

export function SavedJobsPage() {
  const vm = useJobsPageViewModel();
  
  // We only want to show saved jobs here
  const savedJobsList = vm.savedJobs;

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

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header />
      
      <main className="pt-28 pb-20 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-blue-600 fill-blue-600" />
           </div>
           <div>
             <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
             <p className="text-gray-500">Your bookmarked opportunities</p>
           </div>
        </div>

        {savedJobsList.length === 0 ? (
           <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Bookmark className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No saved jobs yet</h3>
              <p className="text-slate-500 mb-6">
                Jobs you bookmark will appear here for easy access.
              </p>
           </div>
        ) : (
           <JobList 
             jobs={savedJobsList}
             loading={false}
             hasMore={false}
             onJobSelect={vm.setSelectedJob}
             savedJobs={savedJobsList}
             onToggleSave={vm.toggleSaveJob}
           />
        )}
      </main>

      <Footer />
    </div>
  );
}
