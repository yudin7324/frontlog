import { cn } from '@/lib/utils';

type DifficultyKey = 'EASY' | 'MEDIUM' | 'HARD';

const CONFIG: Record<DifficultyKey, { en: string; ru: string; bar: string; text: string }> = {
  EASY:   { en: 'Easy',   ru: 'Лёгкие',  bar: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  MEDIUM: { en: 'Medium', ru: 'Средние', bar: 'bg-amber-500',   text: 'text-amber-600 dark:text-amber-400' },
  HARD:   { en: 'Hard',   ru: 'Сложные', bar: 'bg-rose-500',    text: 'text-rose-600 dark:text-rose-400' },
};

interface DifficultyStatsProps {
  stats: Record<DifficultyKey, { total: number; learned: number }>;
  locale: string;
}

export function DifficultyStats({ stats, locale }: DifficultyStatsProps) {
  const isRu = locale === 'ru';

  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-semibold mb-4">{isRu ? 'По сложности' : 'By difficulty'}</h3>
      <div className="space-y-4">
        {(Object.keys(CONFIG) as DifficultyKey[]).map((key) => {
          const { total, learned } = stats[key];
          const pct = total > 0 ? Math.round((learned / total) * 100) : 0;
          const cfg = CONFIG[key];

          return (
            <div key={key}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className={cn('font-medium', cfg.text)}>{isRu ? cfg.ru : cfg.en}</span>
                <span className="text-muted-foreground tabular-nums">
                  {learned}
                  <span className="text-muted-foreground/50"> /{total}</span>
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className={cn('h-2 rounded-full transition-all', cfg.bar)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
