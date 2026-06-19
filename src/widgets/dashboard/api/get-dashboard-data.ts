import { prisma } from '@/shared/lib/prisma';
import { getStudyPlan, getStudyPlanDay } from '@/entities/study-plan/model/plans';
import type { Difficulty, Prisma } from '@prisma/client';
import type { CategoryWithCards, CategoryStat, DifficultyStats, DashboardData } from '@/shared/types/db';

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const userSettings = await prisma.userSettings.findUnique({
    where: { userId },
    select: { dailyNewCards: true, activeStudyPlanSlug: true, studyPlanStartedAt: true },
  });
  const dailyNewCardsLimit = userSettings?.dailyNewCards ?? 10;
  const activePlan = getStudyPlan(userSettings?.activeStudyPlanSlug);
  const activePlanCardWhere: Prisma.CardWhereInput = activePlan
    ? { category: { slug: { in: activePlan.categorySlugs } } }
    : {};
  const activePlanCategoryWhere: Prisma.CategoryWhereInput = activePlan
    ? { slug: { in: activePlan.categorySlugs } }
    : {};

  const [dueCount, totalLearned, rawCategoryStats, activityRaw] = await Promise.all([
    prisma.cardProgress.count({
      where: { userId, dueDate: { lte: now }, card: { isPublished: true, ...activePlanCardWhere } },
    }),
    prisma.cardProgress.count({
      where: { userId, repetitions: { gt: 0 }, card: { isPublished: true, ...activePlanCardWhere } },
    }),
    prisma.category.findMany({
      where: { isVisible: true, ...activePlanCategoryWhere },
      include: {
        cards: {
          include: { progress: { where: { userId } } },
          where: { isPublished: true },
        },
      },
      orderBy: { order: 'asc' },
    }),
    prisma.reviewLog.findMany({
      where: { userId, reviewedAt: { gte: yearAgo } },
      select: { reviewedAt: true },
    }),
  ]);

  const categoryStats = rawCategoryStats as CategoryWithCards[];

  const learnedCardIds = (
    await prisma.cardProgress.findMany({ where: { userId }, select: { cardId: true } })
  ).map((p) => p.cardId);

  const [newCardsCount, newIntroducedToday] = await Promise.all([
    prisma.card.count({
      where: {
        isPublished: true,
        ...activePlanCardWhere,
        ...(learnedCardIds.length > 0 ? { id: { notIn: learnedCardIds } } : {}),
      },
    }),
    prisma.cardProgress.count({ where: { userId, createdAt: { gte: startOfToday } } }),
  ]);

  const remainingNewToday = Math.max(0, dailyNewCardsLimit - newIntroducedToday);
  const totalDue = dueCount + Math.min(newCardsCount, remainingNewToday);

  // Heatmap
  const dayMap = new Map<string, number>();
  for (const { reviewedAt } of activityRaw) {
    const key = reviewedAt.toISOString().slice(0, 10);
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
    activeStudyPlan: activePlan
      ? {
          slug: activePlan.slug,
          nameRu: activePlan.nameRu,
          nameEn: activePlan.nameEn,
          durationDays: activePlan.durationDays,
          currentDay: getStudyPlanDay(userSettings?.studyPlanStartedAt),
        }
      : null,
    categoryStats,
    categoryStatsForDisplay,
    heatmapData,
    totalActiveDays,
    streak,
    difficultyStats,
    dailyNewCards: dailyNewCardsLimit,
  };
}
