import { Search, ChevronDown, Monitor, MapPin, Globe, DollarSign, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import type { JobFilter } from '@/core/entities';

interface JobFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  loading?: boolean;
  filter: JobFilter;
  setFilter: (filter: JobFilter) => void;
}

export function JobFilters({ 
  searchQuery, 
  setSearchQuery,
  onSearch,
  loading,
  filter,
  setFilter
}: JobFiltersProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const toggleFilter = (
    type: 'jobTypes' | 'workplaceTypes' | 'locations', 
    value: string
  ) => {
    const current = filter[type] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setFilter({ ...filter, [type]: updated });
  };

  const clearFilter = (type: 'jobTypes' | 'workplaceTypes' | 'locations') => {
    setFilter({ ...filter, [type]: [] });
  };

  const FilterDropdown = ({ 
    icon: Icon, 
    label, 
    type, 
    options 
  }: { 
    icon: any, 
    label: string, 
    type: 'jobTypes' | 'workplaceTypes', 
    options: string[] 
  }) => {
    const selected = filter[type] || [];
    const hasSelection = selected.length > 0;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`h-10 rounded-full border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-white bg-white px-4 text-[13px] font-medium transition-all ${hasSelection ? 'border-blue-200 bg-blue-50 text-blue-700' : ''}`}
          >
            <Icon className={`w-4 h-4 mr-2 ${hasSelection ? 'text-blue-600' : 'text-gray-400'}`} />
            {label}
            {hasSelection && (
               <Badge variant="secondary" className="ml-2 h-5 px-1.5 bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full text-[10px]">
                 {selected.length}
               </Badge>
            )}
            <ChevronDown className={`w-3 h-3 ml-2 ${hasSelection ? 'text-blue-600' : 'text-gray-400'}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0" align="start">
           <div className="p-3 pb-0 flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900">{label}</h4>
              {hasSelection && (
                <button 
                  onClick={() => clearFilter(type)}
                  className="text-xs text-gray-500 hover:text-gray-900 font-medium"
                >
                  Clear
                </button>
              )}
           </div>
           <div className="p-1 space-y-1">
             {options.map((option) => (
                <div 
                  key={option} 
                  className="flex items-center space-x-2 px-2 py-2 hover:bg-slate-50 rounded-md cursor-pointer"
                  onClick={() => toggleFilter(type, option)}
                >
                   <Checkbox id={`${type}-${option}`} checked={selected.includes(option)} />
                   <label htmlFor={`${type}-${option}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1">
                      {option}
                   </label>
                </div>
             ))}
           </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              type="text"
              placeholder="Search by job title, company, or keywords"
              className="w-full h-14 pl-12 pr-4 text-lg border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
               <Button 
                 size="icon" 
                 className="bg-[#0055FF] hover:bg-[#0044CC] rounded-full w-10 h-10"
                 onClick={onSearch}
                 disabled={loading}
               >
                 <Search className="w-5 h-5 text-white" />
               </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3">
            <FilterDropdown 
               icon={Monitor} 
               label="Job type" 
               type="jobTypes" 
               options={['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship']}
            />
            
            <FilterDropdown 
               icon={MapPin} 
               label="Workplace" 
               type="workplaceTypes" 
               options={['Remote', 'Hybrid', 'On-site']}
            />

            {/* Country Filter - Simplified for now */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10 rounded-full border-gray-200 text-gray-600 hover:text-gray-900 bg-white px-4 text-[13px] font-medium">
                  <Globe className="w-4 h-4 mr-2 text-gray-400" />
                  Country or timezone
                  <ChevronDown className="w-3 h-3 ml-2 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                   <CommandInput placeholder="Search country..." />
                   <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                         <CommandItem onSelect={() => toggleFilter('locations', 'Remote')}>
                            <Globe className="w-4 h-4 mr-2" />
                            Anywhere (Remote)
                         </CommandItem>
                         <CommandItem onSelect={() => toggleFilter('locations', 'United States')}>
                            🇺🇸 United States
                         </CommandItem>
                         <CommandItem onSelect={() => toggleFilter('locations', 'United Kingdom')}>
                            🇬🇧 United Kingdom
                         </CommandItem>
                         <CommandItem onSelect={() => toggleFilter('locations', 'Canada')}>
                            🇨🇦 Canada
                         </CommandItem>
                         <CommandItem onSelect={() => toggleFilter('locations', 'Europe')}>
                            🇪🇺 Europe
                         </CommandItem>
                      </CommandGroup>
                   </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Pay Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={`h-10 rounded-full border-gray-200 text-gray-600 hover:text-gray-900 bg-white px-4 text-[13px] font-medium transition-all ${filter.minSalary ? 'border-blue-200 bg-blue-50 text-blue-700' : ''}`}>
                  <DollarSign className={`w-4 h-4 mr-2 ${filter.minSalary ? 'text-blue-600' : 'text-gray-400'}`} />
                  Pay
                  {filter.minSalary && (
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5 bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full text-[10px]">
                      {filter.minSalary / 1000}k+
                    </Badge>
                  )}
                  <ChevronDown className={`w-3 h-3 ml-2 ${filter.minSalary ? 'text-blue-600' : 'text-gray-400'}`} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-4" align="start">
                 <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-sm text-gray-900">Pay estimate</h4>
                    {filter.minSalary && (
                      <button 
                        onClick={() => setFilter({ ...filter, minSalary: undefined })}
                        className="text-xs text-gray-500 hover:text-gray-900 font-medium"
                      >
                        Clear
                      </button>
                    )}
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex gap-2">
                       <Button variant="outline" size="sm" className="w-full justify-between font-normal text-gray-600">
                          USD <ChevronDown className="w-3 h-3 opacity-50" />
                       </Button>
                       <Button variant="outline" size="sm" className="w-full justify-between font-normal text-gray-600">
                          Per year <ChevronDown className="w-3 h-3 opacity-50" />
                       </Button>
                    </div>

                    <div className="space-y-3">
                       <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Minimum</span>
                          <span className="font-medium text-gray-900">
                             {filter.minSalary ? `$${filter.minSalary.toLocaleString()}` : '$0'}
                          </span>
                       </div>
                       <Slider 
                         defaultValue={[0]} 
                         max={300000} 
                         step={10000}
                         value={[filter.minSalary || 0]}
                         onValueChange={(vals) => setFilter({ ...filter, minSalary: vals[0] })}
                         className="py-4"
                       />
                       <div className="flex justify-between text-xs text-gray-400">
                          <span>$0</span>
                          <span>$300k+</span>
                       </div>
                    </div>
                 </div>
              </PopoverContent>
            </Popover>


            {/* Sort By - Push to right or keep with filters */}
            <div className="ml-auto">
               <Popover>
                  <PopoverTrigger asChild>
                     <Button variant="ghost" className="h-10 text-gray-500 hover:text-gray-900 font-medium text-[13px]">
                        Sort by: <span className="text-gray-900 ml-1">{filter.sortBy === 'recent' ? 'Most recent' : 'Relevance'}</span>
                        <ChevronDown className="w-3 h-3 ml-2 text-gray-400" />
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[180px] p-1" align="end">
                     <div 
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${filter.sortBy !== 'recent' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}
                        onClick={() => setFilter({ ...filter, sortBy: 'relevant' })}
                     >
                        <span className="text-sm font-medium">Relevance</span>
                        {filter.sortBy !== 'recent' && <Check className="w-4 h-4" />}
                     </div>
                     <div 
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${filter.sortBy === 'recent' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}
                        onClick={() => setFilter({ ...filter, sortBy: 'recent' })}
                     >
                        <span className="text-sm font-medium">Most recent</span>
                        {filter.sortBy === 'recent' && <Check className="w-4 h-4" />}
                     </div>
                  </PopoverContent>
               </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
