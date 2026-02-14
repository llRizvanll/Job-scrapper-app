/**
 * SourceSelector - Select job sources to scrape
 */
import { useState, useMemo } from 'react';
import type { JobSource } from '@/core/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Layers,
  Search,
  CheckSquare,
  Globe,
  Code,
  Palette,
  Database,
  Users,
  Briefcase,
  Building2,
  PenTool,
  MapPin,
  Cpu,
  Lock,
  Star,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SourceSelectorProps {
  sources: JobSource[];
  selectedSources: string[];
  onChange: (sources: string[]) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Big Three': <Building2 className="w-4 h-4" />,
  'Remote Specialists': <Globe className="w-4 h-4" />,
  'Startup & Tech': <Cpu className="w-4 h-4" />,
  'Programming': <Code className="w-4 h-4" />,
  'Design & Creative': <Palette className="w-4 h-4" />,
  'Writing & Marketing': <PenTool className="w-4 h-4" />,
  Freelance: <Briefcase className="w-4 h-4" />,
  Regional: <MapPin className="w-4 h-4" />,
  Aggregators: <Database className="w-4 h-4" />,
  Diversity: <Users className="w-4 h-4" />,
  Community: <MessageSquare className="w-4 h-4" />,
  Data: <Database className="w-4 h-4" />,
  QA: <CheckSquare className="w-4 h-4" />,
  Security: <Lock className="w-4 h-4" />,
  Senior: <Star className="w-4 h-4" />,
  'ATS - Greenhouse': <Layers className="w-4 h-4" />,
  'ATS - Lever': <Layers className="w-4 h-4" />,
  'ATS - Ashby': <Layers className="w-4 h-4" />,
  'ATS - Workable': <Layers className="w-4 h-4" />,
  'ATS - SmartRecruiters': <Layers className="w-4 h-4" />,
  'ATS - Breezy HR': <Layers className="w-4 h-4" />,
  'ATS - BambooHR': <Layers className="w-4 h-4" />,
  'ATS - Teamtailor': <Layers className="w-4 h-4" />,
};

export function SourceSelector({ sources, selectedSources, onChange }: SourceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Big Three',
    'Remote Specialists',
    'Startup & Tech',
  ]);

  const sourcesByCategory = useMemo(() => {
    const grouped: Record<string, JobSource[]> = {};
    sources.forEach((source) => {
      if (!grouped[source.category]) grouped[source.category] = [];
      grouped[source.category].push(source);
    });
    return grouped;
  }, [sources]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return sourcesByCategory;
    const filtered: Record<string, JobSource[]> = {};
    Object.entries(sourcesByCategory).forEach(([category, srcs]) => {
      const matching = srcs.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matching.length > 0) filtered[category] = matching;
    });
    return filtered;
  }, [sourcesByCategory, searchQuery]);

  const toggleSource = (sourceId: string) => {
    if (selectedSources.includes(sourceId)) {
      onChange(selectedSources.filter((id) => id !== sourceId));
    } else {
      onChange([...selectedSources, sourceId]);
    }
  };

  const toggleCategory = (category: string) => {
    const categorySources = sourcesByCategory[category] || [];
    const categorySourceIds = categorySources.map((s) => s.id);
    const allSelected = categorySourceIds.every((id) => selectedSources.includes(id));
    if (allSelected) {
      onChange(selectedSources.filter((id) => !categorySourceIds.includes(id)));
    } else {
      onChange([...new Set([...selectedSources, ...categorySourceIds])]);
    }
  };

  const toggleCategoryExpansion = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            Select Sources
            <Badge variant="secondary" className="text-xs">
              {selectedSources.length}/{sources.length}
            </Badge>
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => onChange(sources.filter((s) => s.enabled).map((s) => s.id))}>
              Default
            </Button>
            <Button variant="outline" size="sm" onClick={() => onChange(sources.map((s) => s.id))}>
              All
            </Button>
            <Button variant="outline" size="sm" onClick={() => onChange([])}>
              None
            </Button>
          </div>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search 100+ sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-y-auto">
        <div className="space-y-3">
          {Object.entries(filteredCategories).map(([category, srcs]) => {
            const categorySourceIds = srcs.map((s) => s.id);
            const selectedCount = categorySourceIds.filter((id) => selectedSources.includes(id)).length;
            const isExpanded = expandedCategories.includes(category);
            const isAllSelected = selectedCount === srcs.length && srcs.length > 0;

            return (
              <div key={category} className="border border-slate-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategoryExpansion(category)}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">
                      {categoryIcons[category] ?? <Layers className="w-4 h-4" />}
                    </span>
                    <span className="font-medium text-slate-700">{category}</span>
                    <Badge variant="secondary" className="text-xs">
                      {selectedCount}/{srcs.length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={() => toggleCategory(category)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>
                {isExpanded && (
                  <div className="p-2 space-y-1 bg-white max-h-48 overflow-y-auto">
                    {srcs.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-start gap-2 p-2 rounded hover:bg-slate-50 transition-colors"
                      >
                        <Checkbox
                          id={source.id}
                          checked={selectedSources.includes(source.id)}
                          onCheckedChange={() => toggleSource(source.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <label htmlFor={source.id} className="flex items-center gap-2 cursor-pointer">
                            <span className="font-medium text-slate-700 text-sm truncate">
                              {source.name}
                            </span>
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              {source.type}
                            </Badge>
                          </label>
                          <p className="text-xs text-slate-500 truncate">{source.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
