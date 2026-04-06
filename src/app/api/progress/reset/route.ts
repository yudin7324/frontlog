import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await req.json();
  const userId = session.user.id;

  const category = await prisma.category.findUnique({
    where: { slug },
    select: { id: true, cards: { select: { id: true } } },
  });

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const cardIds = category.cards.map((c) => c.id);

  const { count } = await prisma.cardProgress.deleteMany({
    where: { userId, cardId: { in: cardIds } },
  });

  return NextResponse.json({ deleted: count });
}
