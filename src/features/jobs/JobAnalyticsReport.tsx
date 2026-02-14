/**
 * JobAnalyticsReport - Detailed companies and jobs analytics for the home page
 */
import type { JobAnalyticsReport as ReportType } from '@/core/useCases/ComputeStatsUseCase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  Globe,
  Layers,
} from 'lucide-react';

interface JobAnalyticsReportProps {
  report: ReportType;
  lastUpdated?: Date | null;
}

const maxBar = 100;

function Bar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, (value / max) * maxBar) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0055FF] rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-600 w-8 text-right">{value}</span>
    </div>
  );
}

export function JobAnalyticsReport({ report, lastUpdated }: JobAnalyticsReportProps) {
  const { stats, jobsBySource, topCompanies, jobsByCategory, jobsByType, postedLast7d, postedLast30d } = report;
  const maxSource = jobsBySource[0]?.count ?? 1;
  const maxCategory = jobsByCategory[0]?.count ?? 1;
  const maxType = jobsByType[0]?.count ?? 1;

  return (
    <section className="mb-12" aria-labelledby="analytics-heading">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="analytics-heading" className="text-2xl font-bold text-gray-900">
            Jobs & companies report
          </h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-white border-slate-200">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalJobs}</p>
                  <p className="text-xs text-slate-500">Total jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.uniqueCompanies}</p>
                  <p className="text-xs text-slate-500">Companies</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.withSalary}</p>
                  <p className="text-xs text-slate-500">With salary</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.worldwide}</p>
                  <p className="text-xs text-slate-500">Remote / worldwide</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{postedLast7d}</p>
                  <p className="text-xs text-slate-500">Posted last 7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{postedLast30d}</p>
                  <p className="text-xs text-slate-500">Posted last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two-column: Top companies + Jobs by source */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
                Top companies by job count
              </CardTitle>
              <CardDescription>Companies with the most listed positions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Jobs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCompanies.slice(0, 15).map((row, i) => (
                    <TableRow key={`${row.company}-${i}`}>
                      <TableCell className="font-medium text-slate-500">{i + 1}</TableCell>
                      <TableCell className="font-medium">{row.company}</TableCell>
                      <TableCell className="text-right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers className="w-5 h-5 text-emerald-600" />
                Jobs by source
              </CardTitle>
              <CardDescription>Breakdown by job board / ATS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                {jobsBySource.slice(0, 20).map((row) => (
                  <div key={row.source}>
                    <p className="text-sm font-medium text-slate-700 truncate mb-1" title={row.source}>
                      {row.source}
                    </p>
                    <Bar value={row.count} max={maxSource} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs by category + Jobs by type */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="w-5 h-5 text-violet-600" />
                Jobs by category
              </CardTitle>
              <CardDescription>e.g. Remote Specialists, ATS boards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                {jobsByCategory.slice(0, 15).map((row) => (
                  <div key={row.category}>
                    <p className="text-sm font-medium text-slate-700 truncate mb-1" title={row.category}>
                      {row.category}
                    </p>
                    <Bar value={row.count} max={maxCategory} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-amber-600" />
                Jobs by type
              </CardTitle>
              <CardDescription>Full-time, contract, etc.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                {jobsByType.slice(0, 10).map((row) => (
                  <div key={row.jobType}>
                    <p className="text-sm font-medium text-slate-700 truncate mb-1" title={row.jobType}>
                      {row.jobType}
                    </p>
                    <Bar value={row.count} max={maxType} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
