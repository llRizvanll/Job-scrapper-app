import type { Job } from '@/core/entities';
import { JobCard } from './JobCard';
import { Button } from '@/components/ui/button';
import { Loader2, Briefcase } from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore?: () => void;
  onJobSelect?: (job: Job) => void;
  savedJobs?: Job[];
  onToggleSave?: (job: Job) => void;
}

export function JobList({ jobs, loading, hasMore, onLoadMore, onJobSelect, savedJobs = [], onToggleSave }: JobListProps) {
  if (loading && jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500">Finding the best remote jobs for you...</p>
      </div>
    );
  }

  if (!loading && jobs.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No jobs found</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          Try adjusting your search criteria or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onSelect={onJobSelect ? () => onJobSelect(job) : undefined}
            isSaved={savedJobs.some(j => j.id === job.id)}
            onToggleSave={() => onToggleSave?.(job)}
          />
        ))}
      </div>

      {hasMore && (
        <div className="pt-8 flex justify-center">
         <Button 
            variant="outline" 
            size="lg" 
            onClick={onLoadMore}
            disabled={loading}
            className="rounded-full px-8 border-gray-200 hover:bg-gray-50 text-gray-600"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Load more jobs
          </Button>
        </div>
      )}
    </div>
  );
}
