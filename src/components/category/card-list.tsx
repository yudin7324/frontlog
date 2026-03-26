'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { ChevronDown, Clock, CheckCircle2, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import type { CardProgress } from '@prisma/client';
import type { CategoryWithCards } from '@/types/db';
import { formatDueDate } from '@/lib/db/category';
import { MarkdownContent } from '@/components/ui/markdown-content';

const DIFFICULTY_COLOR: Record<string, string> = {
  EASY:   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  MEDIUM: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  HARD:   'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

type StatusInfo = { label: string; color: string; icon: React.ReactNode };

function getStatusInfo(
  progress: CardProgress | undefined,
  now: Date,
  labels: { new: string; learning: string; due: string; learned: string }
): StatusInfo {
  if (!progress) {
    return { label: labels.new, color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', icon: <Sparkles className="h-3 w-3" /> };
  }
  if (progress.repetitions === 0) {
    return { label: labels.learning, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: <BookOpen className="h-3 w-3" /> };
  }
  if (progress.dueDate <= now) {
    return { label: labels.due, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: <RotateCcw className="h-3 w-3" /> };
  }
  return { label: labels.learned, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: <CheckCircle2 className="h-3 w-3" /> };
}

interface CardListProps {
  cards: CategoryWithCards['cards'];
  now: Date;
}

export function CardList({ cards, now }: CardListProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('category');
  const isRu = locale === 'ru';

  const difficultyLabel: Record<string, string> = {
    EASY:   t('difficultyEasy'),
    MEDIUM: t('difficultyMedium'),
    HARD:   t('difficultyHard'),
  };

  const statusLabels = {
    new:      t('statusNew'),
    learning: t('statusLearning'),
    due:      t('statusDue'),
    learned:  t('statusLearned'),
  };

  const dateLabels = {
    now:      t('dueDateNow'),
    tomorrow: t('dueDateTomorrow'),
    days:     (n: number) => t('dueDateDays', { n }),
    weeks:    (n: number) => t('dueDateWeeks', { n }),
    months:   (n: number) => t('dueDateMonths', { n }),
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      {cards.map((card: CategoryWithCards['cards'][number], idx: number) => {
        const progress = card.progress[0];
        const status = getStatusInfo(progress, now, statusLabels);
        const question = isRu ? card.questionRu : card.questionEn;
        const answer = isRu ? card.answerRu : card.answerEn;
        const isOpen = openId === card.id;

        return (
          <div key={card.id} className={cn(idx !== cards.length - 1 && 'border-b')}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpenId(isOpen ? null : card.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setOpenId(isOpen ? null : card.id);
                }
              }}
              className={cn(
                'w-full flex items-start gap-4 px-4 py-3.5 text-sm text-left transition-colors cursor-pointer',
                'hover:bg-muted/50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                idx % 2 === 0 ? 'bg-background' : 'bg-muted/30',
                isOpen && 'bg-muted/50'
              )}
            >
              <span className="text-muted-foreground/50 w-6 shrink-0 mt-0.5 text-xs tabular-nums">
                {idx + 1}
              </span>

              <div className="flex-1 select-text prose prose-sm dark:prose-invert max-w-none [&_p]:my-0 [&_p]:leading-snug [&_strong]:font-semibold">
                <MarkdownContent content={question} />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', DIFFICULTY_COLOR[card.difficulty])}>
                  {difficultyLabel[card.difficulty]}
                </span>

                <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', status.color)}>
                  {status.icon}
                  {status.label}
                </span>

                {progress && progress.repetitions > 0 && progress.dueDate > now && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDueDate(progress.dueDate, now, dateLabels)}
                  </span>
                )}

                <ChevronDown className={cn(
                  'h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )} />
              </div>
            </div>

            <div
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              className="grid transition-[grid-template-rows] duration-200 ease-out"
            >
              <div className="overflow-hidden">
                <div className="px-4 py-4 border-t bg-muted/20">
                  <div className="ml-10 select-text prose prose-sm dark:prose-invert max-w-none">
                    <MarkdownContent content={answer} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
