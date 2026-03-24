import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await prisma.userSettings.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json(settings ?? {
    dailyNewCards: 10,
    dailyReviews: 50,
    intervalAgain: 1,
    intervalGood1: 1,
    intervalGood2: 6,
    intervalEasy1: 4,
    intervalEasy2: 8,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const allowed = ['dailyNewCards', 'dailyReviews', 'intervalAgain', 'intervalGood1', 'intervalGood2', 'intervalEasy1', 'intervalEasy2'];
  const data: Record<string, number> = {};

  for (const key of allowed) {
    if (key in body && typeof body[key] === 'number') {
      data[key] = Math.max(1, Math.round(body[key]));
    }
  }

  const settings = await prisma.userSettings.upsert({
    where: { userId: session.user.id },
    update: data,
    create: { userId: session.user.id, ...data },
  });

  return NextResponse.json(settings);
}
