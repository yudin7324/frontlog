import { prisma } from '@/lib/prisma';
import type { CategoryWithCards } from '@/types/db';

export type { DateLabels, StatusLabels } from '@/types/ui';

export async function getCategoryData(
  slug: string,
  userId?: string
): Promise<CategoryWithCards | null> {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      cards: {
        where: { isPublished: true },
        include: { progress: { where: { userId: userId ?? '' } } },
        orderBy: { order: 'asc' },
      },
    },
  }) as unknown as CategoryWithCards | null;
}

export function formatDueDate(date: Date, now: Date, labels: { now: string; tomorrow: string; days: (n: number) => string; weeks: (n: number) => string; months: (n: number) => string }): string {
  const diff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return labels.now;
  if (diff === 1) return labels.tomorrow;
  if (diff < 7) return labels.days(diff);
  if (diff < 30) return labels.weeks(Math.round(diff / 7));
  return labels.months(Math.round(diff / 30));
}
