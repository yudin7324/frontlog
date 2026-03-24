import { cn } from '@/lib/utils';
import { BookOpen, Clock, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import type { CardProgress } from '@prisma/client';
import type { CategoryWithCards } from '@/types/db';
import type { StatusLabels, DateLabels } from '@/types/ui';
import { formatDueDate } from '@/lib/db/category';

const DIFFICULTY_COLOR: Record<string, string> = {
  EASY:   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  MEDIUM: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  HARD:   'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

type StatusInfo = { label: string; color: string; icon: React.ReactNode };

function getStatusInfo(
  progress: CardProgress | undefined,
  now: Date,
  labels: StatusLabels
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
  locale: string;
  now: Date;
  difficultyLabel: Record<string, string>;
  statusLabels: StatusLabels;
  dateLabels: DateLabels;
}

export function CardList({ cards, locale, now, difficultyLabel, statusLabels, dateLabels }: CardListProps) {
  const isRu = locale === 'ru';

  return (
    <div className="border rounded-xl overflow-hidden">
      {cards.map((card, idx) => {
        const progress = card.progress[0];
        const status = getStatusInfo(progress, now, statusLabels);
        const question = isRu ? card.questionRu : card.questionEn;

        return (
          <div
            key={card.id}
            className={cn(
              'flex items-start gap-4 px-4 py-3.5 text-sm',
              idx !== cards.length - 1 && 'border-b',
              idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'
            )}
          >
            <span className="text-muted-foreground/50 w-6 shrink-0 mt-0.5 text-xs tabular-nums">
              {idx + 1}
            </span>

            <p className="flex-1 leading-snug line-clamp-2">{question}</p>

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
            </div>
          </div>
        );
      })}
    </div>
  );
}
