import Link from 'next/link';
import { CategoryIcon } from '@/entities/category/ui/category-icon';
import { CheckCircle2, BookOpen } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { CategoryWithCards } from '@/shared/types/db';
import type { Card as PrismaCard, CardProgress } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import { CATEGORY_BG } from '@/entities/category/lib/category-colors';

export async function CategoryGrid({
  categories,
  locale,
}: {
  categories: CategoryWithCards[];
  locale: string;
}) {
  const t = await getTranslations('dashboard');
  const isRu = locale === 'ru';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((cat) => {
        const total = cat.cards.length;
        const learned = cat.cards.filter((c: PrismaCard & { progress: CardProgress[] }) =>
          c.progress.some((p: CardProgress) => p.repetitions > 0)
        ).length;
        const progressPct = total > 0 ? Math.round((learned / total) * 100) : 0;
        const name = isRu ? cat.nameRu : cat.nameEn;
        const desc = isRu ? cat.descriptionRu : cat.descriptionEn;
        const bg = CATEGORY_BG[cat.slug] ?? 'bg-slate-400/10';

        return (
          <Link key={cat.id} href={`/${locale}/categories/${cat.slug}`}>
            <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full flex flex-col">
              <div className={cn('h-32 flex items-center justify-center', bg)}>
                <CategoryIcon slug={cat.slug} className="w-16 h-16" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="font-bold text-sm leading-tight">{name}</span>
                  <CheckCircle2 className={cn('h-4 w-4 shrink-0 mt-0.5', learned === total && total > 0 ? 'text-green-500' : 'text-muted-foreground/30')} />
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{desc}</p>

                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{t('progress')}</span>
                  <span className="font-semibold">{progressPct}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 mb-3">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {total} {t('questions')}
                  </span>
                  <span>{learned} {t('learnedCount')}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
