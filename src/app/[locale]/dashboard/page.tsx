import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/lib/button-variants';
import Link from 'next/link';
import { Brain, CheckCircle2, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CategoryIcon } from '@/components/ui/category-icon';
import { ActivityHeatmap } from '@/components/dashboard/activity-heatmap';
import { DifficultyStats } from '@/components/dashboard/difficulty-stats';
import { CategoryStats } from '@/components/dashboard/category-stats';
import type { Category, Card as PrismaCard, CardProgress, Difficulty } from '@prisma/client';

const CATEGORY_BG: Record<string, string> = {
  javascript: 'bg-yellow-400/10 dark:bg-yellow-400/5',
  typescript: 'bg-blue-500/10 dark:bg-blue-500/5',
  react:      'bg-cyan-400/10 dark:bg-cyan-400/5',
  css:        'bg-orange-400/10 dark:bg-orange-400/5',
  browser:    'bg-emerald-400/10 dark:bg-emerald-400/5',
};

type CategoryWithCards = Category & {
  cards: (PrismaCard & { progress: CardProgress[] })[];
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/${locale}/auth/signin`);
  }

  const userId = session.user.id;
  const now = new Date();
  const isRu = locale === 'ru';
  const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const [dueCount, totalLearned, categoryStats, activityRaw] = await Promise.all([
    prisma.cardProgress.count({ where: { userId, dueDate: { lte: now } } }),
    prisma.cardProgress.count({ where: { userId, repetitions: { gt: 0 } } }),
    prisma.category.findMany({
      include: {
        cards: {
          include: { progress: { where: { userId } } },
          where: { isPublished: true },
        },
      },
      orderBy: { order: 'asc' },
    }) as Promise<CategoryWithCards[]>,
    prisma.cardProgress.findMany({
      where: { userId, lastReviewedAt: { not: null, gte: yearAgo } },
      select: { lastReviewedAt: true },
    }),
  ]);

  const learnedCardIds = (
    await prisma.cardProgress.findMany({ where: { userId }, select: { cardId: true } })
  ).map((p: { cardId: string }) => p.cardId);

  const newCardsCount = await prisma.card.count({
    where: { isPublished: true, id: { notIn: learnedCardIds } },
  });

  const totalDue = dueCount + Math.min(newCardsCount, 10);

  // Heatmap data
  const dayMap = new Map<string, number>();
  for (const { lastReviewedAt } of activityRaw) {
    if (!lastReviewedAt) continue;
    const key = lastReviewedAt.toISOString().slice(0, 10);
    dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
  }
  const heatmapData = Array.from(dayMap, ([date, count]) => ({ date, count }));
  const totalActiveDays = dayMap.size;

  // Calculate streak
  let streak = 0;
  const today = now.toISOString().slice(0, 10);
  const yesterday = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);
  const startDay = dayMap.has(today) ? today : dayMap.has(yesterday) ? yesterday : null;
  if (startDay) {
    let d = new Date(startDay);
    while (dayMap.has(d.toISOString().slice(0, 10))) {
      streak++;
      d = new Date(d.getTime() - 86400000);
    }
  }

  // Difficulty stats
  const difficultyStats: Record<'EASY' | 'MEDIUM' | 'HARD', { total: number; learned: number }> = {
    EASY:   { total: 0, learned: 0 },
    MEDIUM: { total: 0, learned: 0 },
    HARD:   { total: 0, learned: 0 },
  };
  for (const cat of categoryStats as CategoryWithCards[]) {
    for (const card of cat.cards) {
      const d = card.difficulty as Difficulty;
      difficultyStats[d].total++;
      if (card.progress.some((p: CardProgress) => p.repetitions > 0)) {
        difficultyStats[d].learned++;
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session.user} />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              {isRu ? 'Добрый день' : 'Good day'}, {session.user.name?.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {totalDue > 0
                ? (isRu ? `У тебя ${totalDue} карточек на сегодня` : `You have ${totalDue} cards today`)
                : (isRu ? 'Всё повторено на сегодня!' : 'All caught up for today!')}
            </p>
          </div>
          <Link href={`/${locale}/study`} className={cn(buttonVariants({ size: 'lg' }))}>
            <Brain className="h-4 w-4 mr-2" />
            {isRu ? 'Повторить' : 'Review'}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={<BookOpen className="h-5 w-5 text-blue-500" />}
            label={isRu ? 'На сегодня' : 'Due today'}
            value={totalDue}
            highlight={totalDue > 0}
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
            label={isRu ? 'Изучено' : 'Learned'}
            value={totalLearned}
          />
          <StatCard
            icon={<BookOpen className="h-5 w-5 text-purple-500" />}
            label={isRu ? 'Новых карточек' : 'New cards'}
            value={newCardsCount}
          />
        </div>

        {/* Progress sections */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <DifficultyStats stats={difficultyStats} locale={locale} />
          <CategoryStats
            categories={(categoryStats as CategoryWithCards[]).map((cat) => ({
              slug: cat.slug,
              nameRu: cat.nameRu,
              nameEn: cat.nameEn,
              total: cat.cards.length,
              learned: cat.cards.filter((c: PrismaCard & { progress: CardProgress[] }) =>
                c.progress.some((p: CardProgress) => p.repetitions > 0)
              ).length,
            }))}
            locale={locale}
          />
        </div>
        <div className="mb-6">
          <ActivityHeatmap
            data={heatmapData}
            locale={locale}
            totalDays={totalActiveDays}
            streak={streak}
          />
        </div>

        {/* Categories */}
        <h2 className="text-lg font-semibold mb-4">{isRu ? 'Темы' : 'Topics'}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(categoryStats as CategoryWithCards[]).map((cat) => {
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
                <Card className="overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full">
                  <div className={cn('h-32 flex items-center justify-center', bg)}>
                    <CategoryIcon slug={cat.slug} className="w-16 h-16" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="font-bold text-sm leading-tight">{name}</span>
                      <CheckCircle2 className={cn('h-4 w-4 shrink-0 mt-0.5', learned === total && total > 0 ? 'text-green-500' : 'text-muted-foreground/30')} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{desc}</p>

                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{isRu ? 'Прогресс' : 'Progress'}</span>
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
                        {total} {isRu ? 'вопросов' : 'questions'}
                      </span>
                      <span>{learned} {isRu ? 'изучено' : 'learned'}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon, label, value, highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? 'border-primary/50 bg-primary/5' : ''}>
      <CardContent className="pt-5">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
