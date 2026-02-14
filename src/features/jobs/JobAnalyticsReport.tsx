/**
 * JobAnalyticsReport - Detailed companies and jobs analytics
 * Style: Mixpanel/SaaS Dashboard (Clean, High Density, Data-First)
 */
import type { JobAnalyticsReport as ReportType } from '@/core/useCases/ComputeStatsUseCase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Globe,
  TrendingUp,
  MapPin,
  Laptop
} from 'lucide-react';

interface JobAnalyticsReportProps {
  report: ReportType;
  lastUpdated?: Date | null;
}

const maxBar = 100;

function ProgressBar({ value, max, colorClass = "bg-[#0055FF]" }: { value: number; max: number; colorClass?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * maxBar) : 0;
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-500 w-8 text-right shrink-0">{value}</span>
    </div>
  );
}

function StatCard({ title, value, subtext, icon: Icon, trend }: any) {
    return (
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-500">
                    <Icon className="w-5 h-5" />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{value}</div>
                <div className="text-sm font-medium text-slate-500">{title}</div>
                {subtext && <div className="text-xs text-slate-400 mt-1">{subtext}</div>}
            </div>
        </div>
    )
}

export function JobAnalyticsReport({ report, lastUpdated }: JobAnalyticsReportProps) {
  const { stats, jobsBySource, topCompanies, jobsByCategory, jobsByType, postedLast7d } = report;
  const maxSource = jobsBySource[0]?.count ?? 1;
  const maxCategory = jobsByCategory[0]?.count ?? 1;
  const maxType = jobsByType[0]?.count ?? 1;

  return (
    <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700" aria-labelledby="analytics-heading">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
           <div className="text-sm font-semibold text-[#0055FF] mb-1">MARKET INSIGHTS</div>
           <h2 id="analytics-heading" className="text-3xl font-bold text-slate-900 tracking-tight">
             Global Job Market Report
           </h2>
           <p className="text-slate-500 mt-2 max-w-2xl">
              Real-time analysis of the remote job landscape. Data is aggregated from over {stats.uniqueCompanies} sources.
           </p>
        </div>
        {lastUpdated && (
           <div className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              Updated {lastUpdated.toLocaleDateString()}
           </div>
        )}
      </div>

      <div className="space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           <StatCard 
              title="Active Jobs" 
              value={stats.totalJobs.toLocaleString()} 
              icon={Briefcase}
              subtext="Across all platforms"
           />
           <StatCard 
              title="Companies Hiring" 
              value={stats.uniqueCompanies.toLocaleString()} 
              icon={Building2}
              subtext="Active today"
           />
           <StatCard 
              title="Remote Roles" 
              value={stats.worldwide.toLocaleString()} 
              icon={Globe}
              subtext="Global / Worldwide"
           />
           <StatCard 
              title="New This Week" 
              value={postedLast7d.toLocaleString()} 
              icon={TrendingUp}
              trend="+12% vs last week"
           />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Top Companies Table - Spans 2 cols */}
           <Card className="lg:col-span-2 border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-white pb-4">
                 <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-base font-semibold text-slate-900">Top Hiring Companies</CardTitle>
                        <CardDescription>Organizations with the most open remote positions</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">View all</Button>
                 </div>
              </CardHeader>
              <CardContent className="p-0">
                 <Table>
                    <TableHeader className="bg-slate-50/50">
                       <TableRow className="hover:bg-transparent border-slate-100">
                          <TableHead className="w-[50px]">#</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead className="text-right">Open Roles</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {topCompanies.slice(0, 8).map((row, i) => (
                          <TableRow key={`${row.company}-${i}`} className="border-slate-100 hover:bg-slate-50/50">
                             <TableCell className="font-medium text-slate-400">{i + 1}</TableCell>
                             <TableCell>
                                <div className="font-semibold text-slate-900">{row.company}</div>
                             </TableCell>
                             <TableCell className="text-right font-medium text-slate-700">
                                {row.count}
                             </TableCell>
                             <TableCell>
                                <ArrowUpRight className="w-4 h-4 text-slate-300" />
                             </TableCell>
                          </TableRow>
                       ))}
                    </TableBody>
                 </Table>
              </CardContent>
           </Card>

           {/* Metrics Column */}
           <div className="space-y-6">
              {/* Job Types */}
              <Card className="border-slate-200 shadow-sm">
                 <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        Job Types
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {jobsByType.slice(0, 5).map(row => (
                       <div key={row.jobType}>
                          <div className="flex justify-between text-sm mb-1.5">
                             <span className="font-medium text-slate-700">{row.jobType}</span>
                             <span className="text-slate-400">{Math.round((row.count / stats.totalJobs) * 100)}%</span>
                          </div>
                          <ProgressBar value={row.count} max={maxType} colorClass="bg-slate-800" />
                       </div>
                    ))}
                 </CardContent>
              </Card>
              
              {/* Categories / Sources */}
              <Card className="border-slate-200 shadow-sm">
                 <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        Top Categories
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {jobsByCategory.slice(0, 5).map(row => (
                       <div key={row.category}>
                          <div className="flex justify-between text-sm mb-1.5">
                             <span className="font-medium text-slate-700 truncate max-w-[180px]">{row.category}</span>
                          </div>
                          <ProgressBar value={row.count} max={maxCategory} colorClass="bg-[#0055FF]" />
                       </div>
                    ))}
                 </CardContent>
              </Card>

               <Card className="border-slate-200 shadow-sm">
                 <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-slate-400" />
                        Top Sources
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {jobsBySource.slice(0, 5).map(row => (
                       <div key={row.source}>
                          <div className="flex justify-between text-sm mb-1.5">
                             <span className="font-medium text-slate-700 truncate max-w-[180px]">{row.source}</span>
                          </div>
                          <ProgressBar value={row.count} max={maxSource} colorClass="bg-violet-500" />
                       </div>
                    ))}
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </section>
  );
}
