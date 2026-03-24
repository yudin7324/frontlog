import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateSM2, type Rating } from '@/lib/sm2';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { cardId, rating } = await req.json();
  const userId = session.user.id;

  const [existing, userSettings] = await Promise.all([
    prisma.cardProgress.findUnique({ where: { userId_cardId: { userId, cardId } } }),
    prisma.userSettings.findUnique({
      where: { userId },
      select: { intervalAgain: true, intervalGood1: true, intervalGood2: true, intervalEasy1: true, intervalEasy2: true },
    }),
  ]);

  const currentState = existing
    ? { easeFactor: existing.easeFactor, interval: existing.interval, repetitions: existing.repetitions }
    : { easeFactor: 2.5, interval: 0, repetitions: 0 };

  const result = calculateSM2(currentState, rating as Rating, userSettings ?? {});

  const progress = await prisma.cardProgress.upsert({
    where: { userId_cardId: { userId, cardId } },
    create: {
      userId,
      cardId,
      easeFactor: result.easeFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      dueDate: result.dueDate,
      lastReviewedAt: new Date(),
      totalReviews: 1,
      status: result.repetitions === 0 ? 'LEARNING' : 'REVIEW',
    },
    update: {
      easeFactor: result.easeFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      dueDate: result.dueDate,
      lastReviewedAt: new Date(),
      totalReviews: { increment: 1 },
      status: result.repetitions === 0 ? 'LEARNING' : 'REVIEW',
    },
  });

  return NextResponse.json({ progress });
}
