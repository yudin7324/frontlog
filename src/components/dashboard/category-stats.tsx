import { CategoryIcon } from '@/components/ui/category-icon';

interface CategoryStat {
  slug: string;
  nameRu: string;
  nameEn: string;
  total: number;
  learned: number;
}

interface CategoryStatsProps {
  categories: CategoryStat[];
  locale: string;
}

export function CategoryStats({ categories, locale }: CategoryStatsProps) {
  const isRu = locale === 'ru';

  return (
    <div className="border rounded-xl p-5 h-full flex flex-col">
      <h3 className="font-semibold mb-4">{isRu ? 'По темам' : 'By topic'}</h3>
      <div className="space-y-3 flex-1">
        {categories.map((cat) => {
          const pct = cat.total > 0 ? Math.round((cat.learned / cat.total) * 100) : 0;
          const name = isRu ? cat.nameRu : cat.nameEn;
          return (
            <div key={cat.slug}>
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <CategoryIcon slug={cat.slug} className="w-4 h-4" />
                  <span className="font-medium text-sm">{name}</span>
                </div>
                <span className="text-muted-foreground tabular-nums text-xs">
                  {cat.learned}
                  <span className="text-muted-foreground/50"> /{cat.total}</span>
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-primary transition-all"
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
