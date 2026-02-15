import type { Job } from '@/core/entities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Zap,
  Globe,
  MapPin,
  Clock,
  Flag,
  Building2,
} from 'lucide-react';
import { format } from 'date-fns';
import { getJobAvatarStyle, getJobTitleInitial } from './jobAvatar';

interface JobDetailsProps {
  job: Job;
  onBack: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function JobDetails({ job, onBack, isSaved, onToggleSave }: JobDetailsProps) {
  // Mock data for things not in Job entity but in screenshot
  const applicationsEnds = 'Jul 1, 2026';
  const daysLeft = '136 DAYS LEFT';

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation - matching the top left back arrow style if needed, 
          but putting it in a container for better layout */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 pl-0 hover:bg-transparent"
        >
          <div className="p-2 rounded-full group-hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium">Back to jobs</span>
        </Button>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-6 mb-6">
             <div className="flex gap-4">
                {job.companyLogo ? (
                   <img 
                     src={job.companyLogo} 
                     alt={job.company} 
                     className="w-16 h-16 rounded-xl object-contain border border-slate-100 bg-white"
                   />
                ) : (
                   <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl border border-white/80 shadow-sm ${getJobAvatarStyle(job.title).bg} ${getJobAvatarStyle(job.title).text}`}>
                      {getJobTitleInitial(job.title, job.company)}
                   </div>
                )}
             </div>
             <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
                <div className="flex items-center gap-2 text-lg text-slate-600">
                   <span className="font-medium">{job.company}</span>
                </div>
             </div>
             
             <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full border-slate-200">
                   <Share2 className="w-5 h-5 text-slate-600" />
                </Button>
                <Button 
                   variant="outline" 
                   size="icon" 
                   className={`rounded-full border-slate-200 ${isSaved ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
                   onClick={onToggleSave}
                >
                   <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : 'text-slate-600'}`} />
                </Button>
             </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 py-6 border-y border-slate-100">
             <div className="flex items-center gap-2">
               <Zap className="w-5 h-5 text-slate-400" />
               <span className="font-medium text-slate-700">Quick apply</span>
             </div>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <div className="flex items-center gap-2">
               <Globe className="w-5 h-5 text-slate-400" />
               <span className="text-slate-600">Remote</span>
             </div>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <div className="flex items-center gap-2">
               <MapPin className="w-5 h-5 text-slate-400" />
               <span className="text-slate-600">{job.location}</span>
             </div>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <div className="flex items-center gap-2">
               <Clock className="w-5 h-5 text-slate-400" />
               <span className="text-slate-600">{job.jobType}</span>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Job Description</h2>
              <div 
                className="prose prose-slate max-w-none text-slate-600"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>

            {/* Skills & Tags Section */}
            <section className="pt-8 border-t border-slate-100">
               <h2 className="text-xl font-bold text-slate-900 mb-4">Skills & Tags</h2>
               <div className="flex flex-wrap gap-2">
                  {job.tags.length > 0 ? (
                    job.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 text-sm font-medium text-slate-700">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">No specific tags identified for this job.</span>
                  )}
               </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Contract</h3>
                    <p className="text-slate-900 font-medium">{job.jobType}</p>
                  </div>

                  {job.salary && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Pay</h3>
                      <p className="text-slate-900 font-medium">{job.salary}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Published on</h3>
                    <p className="text-slate-900 font-medium">{format(new Date(job.postedAt), 'MMM d, yyyy')}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Applications ends</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-slate-900 font-medium">{applicationsEnds}</p>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[10px] h-5 px-1.5">
                        {daysLeft}
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#0055FF] hover:bg-[#0044CC] text-white rounded-full h-11 font-medium"
                    onClick={() => window.open(job.url, '_blank')}
                  >
                    Quick apply
                    <Zap className="w-4 h-4 ml-2 fill-current" />
                  </Button>
               </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                 {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="w-10 h-10 rounded-lg object-contain" />
                 ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                       <Building2 className="w-5 h-5 text-slate-400" />
                    </div>
                 )}
                 <div>
                    <h3 className="font-bold text-slate-900">{job.company}</h3>
                 </div>
               </div>
               
               <div className="mb-4">
                  <p className="text-xs text-slate-500 font-medium mb-1">Website</p>
                  <a href="#" className="text-sm font-medium text-slate-900 hover:text-blue-600">
                    View company profile
                  </a>
               </div>

               <Button variant="outline" className="w-full rounded-full border-slate-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                  View company
               </Button>
            </div>

            <div className="flex items-center gap-2 justify-center text-slate-500 text-sm cursor-pointer hover:text-slate-900">
               <Flag className="w-4 h-4" />
               <span>Report this job</span>
            </div>

            {/* Scraping Data / Debug Info */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Scraping Data
                </h3>
                <div className="space-y-3 text-xs font-mono text-slate-600">
                    <div>
                        <span className="block text-slate-400 mb-0.5">Source ID</span>
                        <div className="break-all bg-white p-1.5 rounded border border-slate-100">{job.id}</div>
                    </div>
                    <div>
                        <span className="block text-slate-400 mb-0.5">Original Source</span>
                        <div className="font-medium">{job.source}</div>
                    </div>
                    <div>
                        <span className="block text-slate-400 mb-0.5">Category</span>
                        <div>{job.category || 'N/A'}</div>
                    </div>
                    <div>
                        <span className="block text-slate-400 mb-0.5">Scraped At</span>
                        <div>{new Date().toISOString().split('T')[0]} (approx)</div>
                    </div>
                     <div>
                        <span className="block text-slate-400 mb-0.5">Raw Tags</span>
                        <div className="flex flex-wrap gap-1">
                            {job.tags.map(t => (
                                <span key={t} className="px-1.5 py-0.5 bg-white border border-slate-100 rounded text-[10px]">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
