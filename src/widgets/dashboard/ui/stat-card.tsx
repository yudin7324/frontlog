import { cn } from '@/shared/lib/utils';

export function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className={cn('rounded-xl border bg-card text-card-foreground shadow px-4 pt-5 pb-4', highlight ? 'border-primary/50 bg-primary/5' : '')}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
