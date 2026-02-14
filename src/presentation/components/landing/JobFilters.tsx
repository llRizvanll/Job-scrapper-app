import { Search, ChevronDown, Monitor, MapPin, Globe, Trophy, DollarSign, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function JobFilters({ 
  searchQuery, 
  setSearchQuery,
  onSearch,
  loading
}: { 
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  loading?: boolean;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              type="text"
              placeholder="Search by job title"
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
            {[
              { icon: Monitor, label: 'Job type' },
              { icon: MapPin, label: 'Workplace' },
              { icon: Globe, label: 'Country or timezone' },
              { icon: Trophy, label: 'Seniority' },
              { icon: DollarSign, label: 'Pay' },
              { icon: Plane, label: 'Travel' },
            ].map((filter) => (
              <Button
                key={filter.label}
                variant="outline"
                className="h-10 rounded-full border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-white bg-white px-4 text-[13px] font-medium transition-all"
              >
                <filter.icon className="w-4 h-4 mr-2 text-gray-400" />
                {filter.label}
                <ChevronDown className="w-3 h-3 ml-2 text-gray-400" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
