import { prisma } from '@/lib/prisma';
import type { Difficulty } from '@prisma/client';
import type { CategoryWithCards, CategoryStat, DifficultyStats, DashboardData } from '@/types/db';

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const now = new Date();
  const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const userSettings = await prisma.userSettings.findUnique({
    where: { userId },
    select: { dailyNewCards: true },
  });
  const dailyNewCardsLimit = userSettings?.dailyNewCards ?? 10;

  const [dueCount, totalLearned, rawCategoryStats, activityRaw] = await Promise.all([
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
    }),
    prisma.cardProgress.findMany({
      where: { userId, lastReviewedAt: { not: null, gte: yearAgo } },
      select: { lastReviewedAt: true },
    }),
  ]);

  const categoryStats = rawCategoryStats as CategoryWithCards[];

  const learnedCardIds = (
    await prisma.cardProgress.findMany({ where: { userId }, select: { cardId: true } })
  ).map((p) => p.cardId);

  const newCardsCount = await prisma.card.count({
    where: { isPublished: true, id: { notIn: learnedCardIds } },
  });

  const totalDue = dueCount + Math.min(newCardsCount, dailyNewCardsLimit);

  // Heatmap
  const dayMap = new Map<string, number>();
  for (const { lastReviewedAt } of activityRaw) {
    if (!lastReviewedAt) continue;
    const key = lastReviewedAt.toISOString().slice(0, 10);
    dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
  }
  const heatmapData = Array.from(dayMap, ([date, count]) => ({ date, count }));
  const totalActiveDays = dayMap.size;

  // Streak
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
  const difficultyStats: DifficultyStats = {
    EASY:   { total: 0, learned: 0 },
    MEDIUM: { total: 0, learned: 0 },
    HARD:   { total: 0, learned: 0 },
  };
  for (const cat of categoryStats) {
    for (const card of cat.cards) {
      const d = card.difficulty as Difficulty;
      difficultyStats[d].total++;
      if (card.progress.some((p) => p.repetitions > 0)) {
        difficultyStats[d].learned++;
      }
    }
  }

  const categoryStatsForDisplay: CategoryStat[] = categoryStats.map((cat) => ({
    slug: cat.slug,
    nameRu: cat.nameRu,
    nameEn: cat.nameEn,
    total: cat.cards.length,
    learned: cat.cards.filter((c) => c.progress.some((p) => p.repetitions > 0)).length,
  }));

  return {
    totalDue,
    totalLearned,
    newCardsCount,
    categoryStats,
    categoryStatsForDisplay,
    heatmapData,
    totalActiveDays,
    streak,
    difficultyStats,
  };
}
