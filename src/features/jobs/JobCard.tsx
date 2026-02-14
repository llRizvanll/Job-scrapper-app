/**
 * Organism - JobCard
 * Full job listing card with expand/collapse
 */
import { memo, useState } from 'react';
import type { Job } from '@/core/entities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

function getSourceColor(source: string): string {
  if (source.includes('RemoteOK')) return 'bg-green-100 text-green-700 border-green-200';
  if (source.includes('Remotive')) return 'bg-blue-100 text-blue-700 border-blue-200';
  if (source.includes('Arbeitnow')) return 'bg-purple-100 text-purple-700 border-purple-200';
  if (source.includes('We Work Remotely')) return 'bg-orange-100 text-orange-700 border-orange-200';
  if (source.includes('JobsCollider')) return 'bg-pink-100 text-pink-700 border-pink-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
}

function getJobTypeColor(type: string): string {
  const lower = type.toLowerCase();
  if (lower.includes('full')) return 'bg-emerald-100 text-emerald-700';
  if (lower.includes('contract')) return 'bg-amber-100 text-amber-700';
  if (lower.includes('part')) return 'bg-orange-100 text-orange-700';
  if (lower.includes('freelance')) return 'bg-pink-100 text-pink-700';
  return 'bg-slate-100 text-slate-700';
}

export const JobCard = memo(function JobCard({ job }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  const cleanDescription = stripHtml(job.description);
  const shortDescription = cleanDescription.slice(0, 150);
  const hasMoreContent = cleanDescription.length > 150;

  return (
    <div className="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all duration-200">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover border border-slate-100"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-lg font-bold text-blue-600">
              {job.company.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {job.title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Building2 className="w-3 h-3" />
                <span className="truncate">{job.company}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Badge variant="outline" className={`text-xs ${getSourceColor(job.source)}`}>
                {job.source.length > 15 ? job.source.slice(0, 15) + '...' : job.source}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{job.location}</span>
            </div>
            <Badge className={`text-xs ${getJobTypeColor(job.jobType)}`}>{job.jobType}</Badge>
            {job.salary && (
              <div className="flex items-center gap-1 text-green-600">
                <DollarSign className="w-3 h-3" />
                <span className="truncate max-w-[150px]">{job.salary}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
            </div>
          </div>

          <div className="text-slate-600 text-sm leading-relaxed mb-3">
            {expanded ? cleanDescription : shortDescription}
            {hasMoreContent && !expanded && '...'}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-1">
              {job.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-slate-100 text-slate-600"
                >
                  {tag}
                </Badge>
              ))}
              {job.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{job.tags.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {hasMoreContent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="h-7 px-2 text-xs"
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" /> Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" /> More
                    </>
                  )}
                </Button>
              )}
              <Button
                asChild
                size="sm"
                className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Apply
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
