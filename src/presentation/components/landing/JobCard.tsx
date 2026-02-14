import type { Job } from '@/core/entities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Globe, MapPin, Clock, Zap, Star } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onSelect?: () => void;
}

export function JobCard({ job, onSelect }: JobCardProps) {
  return (
    <div 
      onClick={onSelect}
      className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
          <Badge variant="secondary" className="bg-[#eff6ff] text-[#3b82f6] hover:bg-[#eff6ff] font-medium border-0 rounded-md px-2">
             {job.source}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-yellow-400 w-8 h-8 rounded-full">
           <Star className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
           {job.companyLogo ? (
             <img 
               src={job.companyLogo} 
               alt={job.company} 
               className="w-12 h-12 rounded-full object-cover border border-gray-100"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
                 (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
               }}
             />
             /* Fallback if image fails or doesn't exist */
           ) : null}
           <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg ${job.companyLogo ? 'hidden' : ''}`}>
              {job.company.charAt(0).toUpperCase()}
           </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-[15px] font-medium text-gray-600 mb-3">
                {job.company}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                 <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-gray-400" />
                    <span>Quick apply</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-gray-400" />
                    <span>Remote</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{job.location || 'Worldwide'}</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{job.jobType}</span>
                 </div>
              </div>
            </div>

            <div className="flex md:flex-col items-center md:items-end gap-1 md:gap-0">
               {job.salary && (
                 <span className="text-[15px] font-bold text-gray-900">
                   {job.salary}
                 </span>
               )}
               <span className="text-xs text-gray-400">/year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
