import { Card, CardContent } from '@/components/ui/card';

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
    <Card className={highlight ? 'border-primary/50 bg-primary/5' : ''}>
      <CardContent className="pt-5">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
