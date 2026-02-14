import type { Job } from '@/core/entities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Globe, DollarSign, ChevronRight, Briefcase, Star } from 'lucide-react';
import { useState } from 'react';

interface JobCardProps {
  job: Job;
  onSelect?: () => void;
}

export function JobCard({ job, onSelect }: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div 
      className={`group relative bg-white rounded-xl p-5 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer ${
        isHovered ? '-translate-y-0.5' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect?.();
        }
      }}
    >
      <div className="flex gap-4">
        {/* Company Logo / Initial */}
        <div className="flex-shrink-0 relative">
           {job.companyLogo ? (
             <img 
               src={job.companyLogo} 
               alt={job.company} 
               className="w-12 h-12 rounded-lg object-cover border border-slate-100"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
                 (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                 (e.target as HTMLImageElement).nextElementSibling?.classList.add('flex');
               }}
             />
           ) : null}
           <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 items-center justify-center text-blue-600 font-bold text-lg shadow-sm ${job.companyLogo ? 'hidden' : 'flex'}`}>
              {job.company.charAt(0)}
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
               <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                 {job.title}
               </h3>
               <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-3">
                 <span className="font-medium text-slate-700">{job.company}</span>
                 <span>•</span>
                 <span>{formatTimeAgo(job.postedAt)}</span>
                 {job.salary && (
                    <>
                      <span>•</span>
                      <span className="text-slate-600 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </span>
                    </>
                 )}
               </div>
            </div>
            <div className="flex flex-col items-end gap-2">
               <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-yellow-400 -mt-2 -mr-2">
                  <Star className="w-4 h-4" />
               </Button>
               {isHovered && (
                  <ChevronRight className="text-blue-400 w-5 h-5 flex-shrink-0 animate-in fade-in slide-in-from-left-1" />
               )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-1">
             <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-600">
                <Globe className="w-3 h-3 mr-1.5 text-slate-400" />
                Remote
             </div>
             {job.jobType && (
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-600">
                    <Briefcase className="w-3 h-3 mr-1.5 text-slate-400" />
                    {job.jobType}
                </div>
             )}
             {job.tags.slice(0, 2).map(tag => (
                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50/50 border border-blue-100 text-xs font-medium text-blue-600/80">
                   {tag}
                </span>
             ))}
             {job.source && (
               <Badge variant="secondary" className="bg-slate-100 text-slate-500 hover:bg-slate-200 border-0 rounded-md px-2 font-normal text-xs">
                 {job.source}
               </Badge>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
