'use client';

import { useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { CategoryIcon } from '@/entities/category/ui/category-icon';
import { cn } from '@/shared/lib/utils';

interface CategoryStat {
  slug: string;
  nameRu: string;
  nameEn: string;
  total: number;
  learned: number;
}

interface CategoryResetListProps {
  categories: CategoryStat[];
}

export function CategoryResetList({ categories }: CategoryResetListProps) {
  const t = useTranslations('settings');
  const locale = useLocale();
  const isRu = locale === 'ru';
  const [confirming, setConfirming] = useState<string | null>(null);
  const [resetDone, setResetDone] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const handleReset = (slug: string) => {
    startTransition(async () => {
      await fetch('/api/progress/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      setConfirming(null);
      setResetDone((prev) => new Set(prev).add(slug));
    });
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      {categories.map((cat, idx) => {
        const name = isRu ? cat.nameRu : cat.nameEn;
        const pct = cat.total > 0 ? Math.round((cat.learned / cat.total) * 100) : 0;
        const isConfirming = confirming === cat.slug;
        const isDone = resetDone.has(cat.slug);
        const learned = isDone ? 0 : cat.learned;
        const pctShow = isDone ? 0 : pct;

        return (
          <div
            key={cat.slug}
            className={cn(
              'flex items-center gap-4 px-4 py-3 text-sm',
              idx !== categories.length - 1 && 'border-b',
              idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'
            )}
          >
            <CategoryIcon slug={cat.slug} className="w-8 h-8 shrink-0" />

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-secondary rounded-full h-1.5 max-w-32">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${pctShow}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {learned}/{cat.total} ({pctShow}%)
                </span>
              </div>
            </div>

            {isConfirming ? (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-destructive flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {t('confirmReset')}
                </span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleReset(cat.slug)}
                  disabled={isPending}
                >
                  {t('yes')}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setConfirming(null)}
                  disabled={isPending}
                >
                  {t('no')}
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setConfirming(cat.slug)}
                disabled={isDone || cat.learned === 0}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                {isDone ? t('resetDone') : t('reset')}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
