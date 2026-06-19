'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Check, Loader2 } from 'lucide-react';
import type { StudyPlan } from '@/entities/study-plan/model/plans';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

export function StudyPlanPicker({
  plans,
  activeSlug,
  locale,
  labels,
}: {
  plans: StudyPlan[];
  activeSlug: string | null;
  locale: string;
  labels: {
    days: string;
    categories: string;
    active: string;
    start: string;
    switch: string;
    clear: string;
  };
}) {
  const router = useRouter();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const isRu = locale === 'ru';

  const updatePlan = (planSlug: string | null) => {
    setPendingSlug(planSlug ?? 'none');

    startTransition(async () => {
      await fetch('/api/study-plan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planSlug }),
      });

      setPendingSlug(null);
      router.refresh();
    });
  };

  return (
    <div className="grid gap-4">
      {plans.map((plan) => {
        const isActive = plan.slug === activeSlug;
        const isLoading = isPending && pendingSlug === plan.slug;
        const name = isRu ? plan.nameRu : plan.nameEn;
        const description = isRu ? plan.descriptionRu : plan.descriptionEn;

        return (
          <Card key={plan.slug} className={isActive ? 'border-primary' : undefined}>
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold leading-tight">{name}</h2>
                    {isActive && (
                      <Badge>
                        <Check className="mr-1 h-3 w-3" />
                        {labels.active}
                      </Badge>
                    )}
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">{description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{plan.durationDays} {labels.days}</span>
                    <span>•</span>
                    <span>{plan.categorySlugs.length} {labels.categories}</span>
                  </div>
                </div>

                <Button
                  onClick={() => updatePlan(plan.slug)}
                  disabled={isActive || isPending}
                  className="shrink-0"
                  variant={isActive ? 'secondary' : 'default'}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isActive ? labels.active : activeSlug ? labels.switch : labels.start}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {activeSlug && (
        <div className="flex justify-center pt-2">
          <Button variant="ghost" onClick={() => updatePlan(null)} disabled={isPending}>
            {pendingSlug === 'none' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {labels.clear}
          </Button>
        </div>
      )}
    </div>
  );
}
