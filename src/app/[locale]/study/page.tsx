import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { StudySession } from '@/components/study/study-session';
import { CheckCircle } from 'lucide-react';
import { buttonVariants } from '@/lib/button-variants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Card, Category } from '@prisma/client';

type CardWithCategory = Card & { category: Category };

export default async function StudyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
const session = await auth();
  const isRu = locale === 'ru';

  const now = new Date();
  let dueCards: CardWithCategory[] = [];
  let categoryName: string | null = null;

  const categoryFilter = category ? { category: { slug: category } } : {};

  if (category) {
    const cat = await prisma.category.findUnique({
      where: { slug: category },
      select: { nameRu: true, nameEn: true },
    });
    categoryName = cat ? (isRu ? cat.nameRu : cat.nameEn) : null;
  }

  if (session?.user?.id) {
    const userId = session.user.id;

    const progressDue = await prisma.cardProgress.findMany({
      where: { userId, dueDate: { lte: now }, card: categoryFilter.category ? { category: { slug: category } } : undefined },
      include: { card: { include: { category: true } } },
      take: 20,
    });

    const learnedIds = (
      await prisma.cardProgress.findMany({ where: { userId }, select: { cardId: true } })
    ).map((p: { cardId: string }) => p.cardId);

    const newCards = await prisma.card.findMany({
      where: { isPublished: true, id: { notIn: learnedIds }, ...categoryFilter },
      include: { category: true },
      take: Math.max(0, 10 - progressDue.length),
      orderBy: [{ category: { order: 'asc' } }, { order: 'asc' }],
    });

    dueCards = [
      ...progressDue.map((p: { card: CardWithCategory }) => p.card),
      ...newCards,
    ];
  } else {
    dueCards = await prisma.card.findMany({
      where: { isPublished: true, ...categoryFilter },
      include: { category: true },
      take: 10,
      orderBy: [{ category: { order: 'asc' } }, { order: 'asc' }],
    });
  }

  if (dueCards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={session?.user} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              {isRu ? 'Отличная работа!' : 'Great job!'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isRu ? 'Нет карточек для повторения. Возвращайся завтра!' : 'No cards due for review. Come back tomorrow!'}
            </p>
            <Link
              href={`/${locale}/dashboard`}
              className={cn(buttonVariants())}
            >
              {isRu ? 'На дашборд' : 'Go to Dashboard'}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session?.user} />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-8">
        {categoryName && (
          <h1 className="text-xl font-semibold mb-6">{categoryName}</h1>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <StudySession
            initialCards={dueCards}
            userId={session?.user?.id ?? null}
            locale={locale}
          />
        </Suspense>
      </main>
    </div>
  );
}
