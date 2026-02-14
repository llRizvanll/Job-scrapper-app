/**
 * Atom - StatCard
 * Single stat display with icon, value, and label
 */
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  iconBgClassName?: string;
  iconColorClassName?: string;
  value: number | string;
  label: string;
}

export function StatCard({
  icon: Icon,
  iconBgClassName = 'bg-blue-100',
  iconColorClassName = 'text-blue-600',
  value,
  label,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBgClassName}`}
        >
          <Icon className={`w-5 h-5 ${iconColorClassName}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
