import type { Prisma } from '@prisma/client';

export type CategoryWithCards = Prisma.CategoryGetPayload<{
  include: { cards: { include: { progress: true } } };
}>;

export type DifficultyStats = Record<
  'EASY' | 'MEDIUM' | 'HARD',
  { total: number; learned: number }
>;

export interface CategoryStat {
  slug: string;
  nameRu: string;
  nameEn: string;
  total: number;
  learned: number;
}

export interface DashboardData {
  totalDue: number;
  totalLearned: number;
  newCardsCount: number;
  categoryStats: CategoryWithCards[];
  categoryStatsForDisplay: CategoryStat[];
  heatmapData: { date: string; count: number }[];
  totalActiveDays: number;
  streak: number;
  difficultyStats: DifficultyStats;
}
