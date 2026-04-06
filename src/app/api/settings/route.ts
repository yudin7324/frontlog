import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

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
    intervalAgain: 5,
    intervalHard: 10,
    intervalGood: 1440,
    intervalEasy: 4320,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const allowed = ['dailyNewCards', 'dailyReviews', 'intervalAgain', 'intervalHard', 'intervalGood', 'intervalEasy'];
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
