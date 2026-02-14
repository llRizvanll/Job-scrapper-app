/**
 * FilterPanel - Job filter controls
 */
import type { JobFilter } from '@/core/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

interface FilterPanelProps {
  filter: JobFilter;
  onChange: (filter: JobFilter) => void;
}

export function FilterPanel({ filter, onChange }: FilterPanelProps) {
  const updateFilter = (key: keyof JobFilter, value: string | string[]) => {
    onChange({ ...filter, [key]: value });
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          Filter Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              placeholder="e.g., Worldwide, USA..."
              value={filter.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Briefcase className="w-4 h-4" />
              Job Type
            </Label>
            <Select
              value={filter.jobType}
              onValueChange={(value) => updateFilter('jobType', value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <DollarSign className="w-4 h-4" />
              Salary Range
            </Label>
            <Select
              value={filter.salaryRange}
              onValueChange={(value) => updateFilter('salaryRange', value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Any salary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any salary</SelectItem>
                <SelectItem value="0-50k">$0 - $50k</SelectItem>
                <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                <SelectItem value="150k+">$150k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Clock className="w-4 h-4" />
              Posted Within
            </Label>
            <Select
              value={filter.postedWithin}
              onValueChange={(value) => updateFilter('postedWithin', value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any time</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() =>
              onChange({
                keywords: [],
                location: '',
                jobType: '',
                salaryRange: '',
                postedWithin: '',
                sources: [],
              })
            }
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
