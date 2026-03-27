'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RATING_LABELS, type Rating } from '@/lib/sm2';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import { MarkdownContent } from '@/components/ui/markdown-content';

interface Intervals {
  intervalAgain: number;
  intervalHard: number;
  intervalGood: number;
  intervalEasy: number;
}

interface FlashcardProps {
  card: {
    id: string;
    questionRu: string;
    questionEn: string;
    answerRu: string;
    answerEn: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    category: {
      nameRu: string;
      nameEn: string;
    };
  };
  cardNumber: number;
  totalCards: number;
  onRate: (cardId: string, rating: Rating) => void;
  intervals?: Intervals;
}

const DIFFICULTY_COLORS = {
  EASY: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  HARD: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const DIFFICULTY_LABELS = {
  EASY: { ru: 'Легко', en: 'Easy' },
  MEDIUM: { ru: 'Средне', en: 'Medium' },
  HARD: { ru: 'Сложно', en: 'Hard' },
};

export function Flashcard({ card, cardNumber, totalCards, onRate, intervals }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const locale = useLocale() as 'ru' | 'en';
  const t = useTranslations('study');

  const question = locale === 'ru' ? card.questionRu : card.questionEn;
  const answer = locale === 'ru' ? card.answerRu : card.answerEn;
  const categoryName = locale === 'ru' ? card.category.nameRu : card.category.nameEn;

  const handleRate = (rating: Rating) => {
    setIsFlipped(false);
    onRate(card.id, rating);
  };

  const handleCardClick = () => {
    if (typeof window !== 'undefined' && window.getSelection()?.toString()) {
      return;
    }

    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const ratings: Rating[] = [0, 1, 2, 3];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Progress — всегда стабильный */}
      <div>
        <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
          <span>{categoryName}</span>
          <span>{cardNumber} / {totalCards}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(cardNumber / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Карточка */}
      <Card
        className={cn(
          'border-2 transition-colors duration-200',
          isFlipped
            ? 'border-primary/20 cursor-default'
            : 'cursor-pointer hover:border-primary/40 hover:shadow-md'
        )}
        onClick={handleCardClick}
      >
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="secondary" className="text-xs">{t('question')}</Badge>
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', DIFFICULTY_COLORS[card.difficulty])}>
              {DIFFICULTY_LABELS[card.difficulty][locale]}
            </span>
          </div>

          {/* Вопрос */}
          <div className={cn(
            'select-text prose prose-sm dark:prose-invert max-w-none transition-opacity duration-200',
            isFlipped && 'opacity-50'
          )}>
            <MarkdownContent content={question} />
          </div>

          {/* Ответ */}
          {isFlipped && (
            <div className="mt-6 pt-6 border-t select-text prose prose-sm dark:prose-invert max-w-none">
              <MarkdownContent content={answer} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Кнопки рейтинга */}
      {isFlipped && (
        <div className="flex flex-col gap-2">
          <p className="text-center text-xs text-muted-foreground">{t('howWell')}</p>
          <div className="grid grid-cols-4 gap-2 h-16">
            {ratings.map((rating) => (
              <RatingButton
                key={rating}
                rating={rating}
                locale={locale}
                onClick={() => handleRate(rating)}
                intervals={intervals}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFlipped(false)}
              className="text-muted-foreground text-xs h-7 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              {t('hideAnswer')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatInterval(minutes: number, locale: string) {
  if (minutes < 60) return locale === 'ru' ? `${minutes} мин` : `${minutes} min`;
  if (minutes < 1440) {
    const h = Math.round(minutes / 60 * 10) / 10;
    return locale === 'ru' ? `${h} ч` : `${h} h`;
  }
  const d = Math.round(minutes / 1440 * 10) / 10;
  return locale === 'ru' ? `~${d} дн` : `~${d} d`;
}

function RatingButton({
  rating,
  locale,
  onClick,
  intervals,
}: {
  rating: Rating;
  locale: 'ru' | 'en';
  onClick: () => void;
  intervals?: Intervals;
}) {
  const again = intervals?.intervalAgain ?? 5;
  const hard  = intervals?.intervalHard  ?? 10;
  const good  = intervals?.intervalGood  ?? 1440;
  const easy  = intervals?.intervalEasy  ?? 4320;

  const computedHints: Record<Rating, string> = {
    0: formatInterval(again, locale),
    1: formatInterval(hard, locale),
    2: formatInterval(good, locale),
    3: formatInterval(easy, locale),
  };

  const hints = computedHints;

  const baseColors = {
    0: 'border-red-300 hover:bg-red-50 hover:border-red-400 dark:border-red-800 dark:hover:bg-red-950',
    1: 'border-orange-300 hover:bg-orange-50 hover:border-orange-400 dark:border-orange-800 dark:hover:bg-orange-950',
    2: 'border-green-300 hover:bg-green-50 hover:border-green-400 dark:border-green-800 dark:hover:bg-green-950',
    3: 'border-blue-300 hover:bg-blue-50 hover:border-blue-400 dark:border-blue-800 dark:hover:bg-blue-950',
  } as const;

  const textColors = {
    0: 'text-red-600 dark:text-red-400',
    1: 'text-orange-600 dark:text-orange-400',
    2: 'text-green-600 dark:text-green-400',
    3: 'text-blue-600 dark:text-blue-400',
  } as const;

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-1 rounded-lg border-2 transition-all duration-150 active:scale-95 cursor-pointer',
        baseColors[rating]
      )}
    >
      <span className={cn('font-semibold text-sm', textColors[rating])}>
        {RATING_LABELS[locale][rating]}
      </span>
      <span className="text-xs text-muted-foreground">
        {hints[rating]}
      </span>
    </button>
  );
}
