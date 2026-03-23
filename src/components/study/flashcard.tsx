'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RATING_LABELS, RATING_COLORS, type Rating } from '@/lib/sm2';
import { cn } from '@/lib/utils';
import { RotateCcw, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

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

function MarkdownContent({ content }: { content: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className ?? '');
      const isInline = !match;

      if (isInline) {
        return (
          <code
            className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <div className="not-prose">
          <SyntaxHighlighter
            style={isDark ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            customStyle={{
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              margin: '0.75rem 0',
              border: 'none',
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      );
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}

export function Flashcard({ card, cardNumber, totalCards, onRate }: FlashcardProps) {
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

  const ratings: Rating[] = [0, 1, 2, 3];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>{categoryName}</span>
        <span>{cardNumber} / {totalCards}</span>
      </div>

      <div className="w-full bg-secondary rounded-full h-1.5 mb-6">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${(cardNumber / totalCards) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="perspective-1000">
        <Card
          className={cn(
            'min-h-64 cursor-pointer select-none transition-all duration-300 border-2',
            !isFlipped && 'hover:border-primary/50 hover:shadow-md',
            isFlipped && 'border-primary/20'
          )}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          <CardContent className="p-8">
            {/* Card header */}
            <div className="flex items-center justify-between mb-6">
              <Badge variant="secondary" className="text-xs">
                {isFlipped ? t('question') : t('question')}
              </Badge>
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  DIFFICULTY_COLORS[card.difficulty]
                )}
              >
                {DIFFICULTY_LABELS[card.difficulty][locale]}
              </span>
            </div>

            {/* Question */}
            <div className={cn('transition-all duration-200 prose prose-sm dark:prose-invert max-w-none', isFlipped && 'opacity-60')}>
              <MarkdownContent content={question} />
            </div>

            {/* Answer */}
            {isFlipped && (
              <div className="mt-6 pt-6 border-t prose prose-sm dark:prose-invert max-w-none">
                <MarkdownContent content={answer} />
              </div>
            )}

            {/* Tap hint */}
            {!isFlipped && (
              <div className="mt-8 flex items-center gap-1 text-muted-foreground text-sm">
                <ChevronRight className="h-4 w-4" />
                <span>{t('showAnswer')}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rating buttons */}
      {isFlipped && (
        <div className="mt-6">
          <p className="text-center text-sm text-muted-foreground mb-4">{t('howWell')}</p>
          <div className="grid grid-cols-4 gap-3">
            {ratings.map((rating) => (
              <RatingButton
                key={rating}
                rating={rating}
                locale={locale}
                onClick={() => handleRate(rating)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reset button */}
      {isFlipped && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFlipped(false)}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            {locale === 'ru' ? 'Скрыть ответ' : 'Hide answer'}
          </Button>
        </div>
      )}
    </div>
  );
}

function RatingButton({
  rating,
  locale,
  onClick,
}: {
  rating: Rating;
  locale: 'ru' | 'en';
  onClick: () => void;
}) {
  const hints = {
    ru: { 0: '< 1 дн', 1: '< 2 дн', 2: '~4 дн', 3: '~8 дн' },
    en: { 0: '< 1d', 1: '< 2d', 2: '~4d', 3: '~8d' },
  };

  const baseColors = {
    0: 'border-red-300 hover:bg-red-50 hover:border-red-500 dark:border-red-800 dark:hover:bg-red-950',
    1: 'border-orange-300 hover:bg-orange-50 hover:border-orange-500 dark:border-orange-800 dark:hover:bg-orange-950',
    2: 'border-green-300 hover:bg-green-50 hover:border-green-500 dark:border-green-800 dark:hover:bg-green-950',
    3: 'border-blue-300 hover:bg-blue-50 hover:border-blue-500 dark:border-blue-800 dark:hover:bg-blue-950',
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
        'flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-150 active:scale-95',
        baseColors[rating]
      )}
    >
      <span className={cn('font-semibold text-sm', textColors[rating])}>
        {RATING_LABELS[locale][rating]}
      </span>
      <span className="text-xs text-muted-foreground">
        {hints[locale][rating]}
      </span>
    </button>
  );
}
