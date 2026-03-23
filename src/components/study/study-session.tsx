'use client';

import { useState, useCallback } from 'react';
import { Flashcard } from './flashcard';
import { type Rating } from '@/lib/sm2';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/lib/button-variants';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CardData {
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
}

interface StudySessionProps {
  initialCards: CardData[];
  userId: string | null;
  locale: string;
}

export function StudySession({ initialCards, userId, locale }: StudySessionProps) {
  const [cards] = useState<CardData[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [done, setDone] = useState(false);
  const isRu = locale === 'ru';

  const handleRate = useCallback(
    async (cardId: string, rating: Rating) => {
      if (userId) {
        await fetch('/api/study/rate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cardId, rating }),
        });
      }

      const newCompleted = completed + 1;
      setCompleted(newCompleted);

      if (currentIndex + 1 >= cards.length) {
        setDone(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    },
    [cards.length, completed, currentIndex, userId]
  );

  if (done) {
    return (
      <div className="text-center py-16">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">
          {isRu ? 'Сессия завершена!' : 'Session complete!'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {isRu ? `Повторено карточек: ${completed}` : `Cards reviewed: ${completed}`}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => { setCurrentIndex(0); setCompleted(0); setDone(false); }}
            variant="outline"
          >
            {isRu ? 'Ещё раз' : 'Again'}
          </Button>
          <Link
            href={`/${locale}/dashboard`}
            className={cn(buttonVariants())}
          >
            {isRu ? 'На дашборд' : 'Dashboard'}
          </Link>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  if (!currentCard) return null;

  return (
    <Flashcard
      card={currentCard}
      cardNumber={currentIndex + 1}
      totalCards={cards.length}
      onRate={handleRate}
    />
  );
}
