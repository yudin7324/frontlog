import { NextRequest, NextResponse } from 'next/server';
import { getStudyPlan } from '@/entities/study-plan/model/plans';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const planSlug = typeof body.planSlug === 'string' ? body.planSlug : null;

  if (planSlug && !getStudyPlan(planSlug)) {
    return NextResponse.json({ error: 'Unknown study plan' }, { status: 400 });
  }

  const settings = await prisma.userSettings.upsert({
    where: { userId: session.user.id },
    update: {
      activeStudyPlanSlug: planSlug,
      studyPlanStartedAt: planSlug ? new Date() : null,
    },
    create: {
      userId: session.user.id,
      activeStudyPlanSlug: planSlug,
      studyPlanStartedAt: planSlug ? new Date() : null,
    },
  });

  return NextResponse.json(settings);
}
