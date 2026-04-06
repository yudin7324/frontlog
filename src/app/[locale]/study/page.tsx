import { Suspense } from 'react';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { Navbar } from '@/widgets/navbar/ui/navbar';
import { StudySession } from '@/widgets/study-session/ui/study-session';
import { CheckCircle } from 'lucide-react';
import { buttonVariants } from '@/shared/lib/button-variants';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import type { Card, Category } from '@prisma/client';
import { getTranslations } from 'next-intl/server';

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
  const t = await getTranslations('study');

  const now = new Date();
  let dueCards: CardWithCategory[] = [];
  let categoryName: string | null = null;
  let userSettings: Awaited<ReturnType<typeof prisma.userSettings.findUnique>> = null;
  const isRu = locale === 'ru';

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

    userSettings = await prisma.userSettings.findUnique({
      where: { userId },
    });
    const dailyReviewsLimit = userSettings?.dailyReviews ?? 50;
    const dailyNewCardsLimit = userSettings?.dailyNewCards ?? 10;

    const cardWhere = categoryFilter.category ? { category: { slug: category } } : undefined;
    const progressDue = await prisma.cardProgress.findMany({
      where: {
        userId,
        dueDate: { lte: now },
        card: cardWhere,
      },
      include: { card: { include: { category: true } } },
      take: dailyReviewsLimit,
    });

    const learnedIds = (
      await prisma.cardProgress.findMany({ where: { userId }, select: { cardId: true } })
    ).map((p: { cardId: string }) => p.cardId);

    const newCards = await prisma.card.findMany({
      where: {
        isPublished: true,
        ...(learnedIds.length > 0 ? { id: { notIn: learnedIds } } : {}),
        ...categoryFilter,
      },
      include: { category: true },
      take: dailyNewCardsLimit,
      orderBy: [{ category: { order: 'asc' } }, { order: 'asc' }],
    });

    dueCards = [
      ...progressDue.map((p: { card: CardWithCategory }) => p.card),
      ...newCards,
    ];

    // Fallback: if nothing due and no new cards, show soonest upcoming cards
    if (dueCards.length === 0) {
      const upcoming = await prisma.cardProgress.findMany({
        where: { userId, card: cardWhere },
        include: { card: { include: { category: true } } },
        orderBy: { dueDate: 'asc' },
        take: dailyReviewsLimit,
      });
      dueCards = upcoming.map((p: { card: CardWithCategory }) => p.card);
    }
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
            <h2 className="text-2xl font-bold mb-2">{t('greatJob')}</h2>
            <p className="text-muted-foreground mb-6">{t('noCardsDue')}</p>
            <Link href={`/${locale}/dashboard`} className={cn(buttonVariants())}>
              {t('toDashboard')}
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
        <Suspense fallback={<div>...</div>}>
          <StudySession
            initialCards={dueCards}
            userId={session?.user?.id ?? null}
            locale={locale}
            intervals={{
              intervalAgain: userSettings?.intervalAgain ?? 5,
              intervalHard:  userSettings?.intervalHard  ?? 10,
              intervalGood:  userSettings?.intervalGood  ?? 1440,
              intervalEasy:  userSettings?.intervalEasy  ?? 4320,
            }}
          />
        </Suspense>
      </main>
    </div>
  );
}
