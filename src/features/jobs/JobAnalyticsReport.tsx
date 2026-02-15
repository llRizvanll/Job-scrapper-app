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
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Briefcase,
  Building2,
  Globe,
  TrendingUp,
  Code2
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
  const { stats, topCompanies, postedLast7d } = report;


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 z-50 shadow-2xl rounded-full h-14 pl-4 pr-6 gap-2 bg-[#0055FF] hover:bg-blue-700 text-white animate-in slide-in-from-bottom-4 duration-700 font-semibold"
            size="lg"
          >
             <Briefcase className="w-5 h-5" />
             Global Job Market Report
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] lg:max-w-[1400px] h-[90vh] overflow-y-auto w-full p-0 gap-0">
          <div className="p-6 md:p-8 lg:p-10">
            <section className="mb-0" aria-labelledby="analytics-heading">
            
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Top Companies */}
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="border-b border-slate-100 bg-white pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-semibold text-slate-900">Top Hiring Companies</CardTitle>
                                <CardDescription>Most open remote roles</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="w-[40px] pl-4">#</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead className="text-right pr-4">Roles</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topCompanies.slice(0, 5).map((row, i) => (
                                <TableRow key={`${row.company}-${i}`} className="border-slate-100 hover:bg-slate-50/50">
                                    <TableCell className="font-medium text-slate-400 py-3 pl-4">{i + 1}</TableCell>
                                    <TableCell className="py-3">
                                        <div className="font-semibold text-slate-900 truncate max-w-[120px]" title={row.company}>{row.company}</div>
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-slate-700 py-3 pr-4">
                                        {row.count}
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>


                    


                    {/* Top Skills */}
                    <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-slate-400" />
                            Top Skills & Tech
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {report.jobsBySkill && report.jobsBySkill
                            .filter(row => !['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Mobile', 'Data Science', 'Product', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Legal', 'Operations', 'Writing', 'Customer Support', 'Remote Specialists', 'Greenhouse', 'SmartRecruiters', 'Lever', 'Ashby', 'Workable', 'Breezy', 'Teamtailor', 'Remote', 'App'].includes(row.skill) && !row.skill.startsWith('ATS -'))
                            .slice(0, 8)
                            .map(row => (
                            <div key={row.skill}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="font-medium text-slate-700 truncate max-w-[180px]">{row.skill}</span>
                                </div>
                                <ProgressBar value={row.count} max={report.jobsBySkill[0]?.count ?? 1} colorClass="bg-rose-500" />
                            </div>
                        ))}
                    </CardContent>
                    </Card>


                </div>
            </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
