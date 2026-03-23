import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { CategoryIcon } from '@/components/ui/category-icon';
import { buttonVariants } from '@/lib/button-variants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowLeft, BookOpen, Clock, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import type { CardProgress } from '@prisma/client';

const DIFFICULTY_LABEL: Record<string, { ru: string; en: string; color: string }> = {
  EASY:   { ru: 'Легко',   en: 'Easy',   color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  MEDIUM: { ru: 'Средне',  en: 'Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  HARD:   { ru: 'Сложно',  en: 'Hard',   color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

function getStatusInfo(progress: CardProgress | undefined, now: Date, isRu: boolean) {
  if (!progress) {
    return {
      label: isRu ? 'Новая' : 'New',
      color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
      icon: <Sparkles className="h-3 w-3" />,
    };
  }
  if (progress.repetitions === 0) {
    return {
      label: isRu ? 'Изучается' : 'Learning',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      icon: <BookOpen className="h-3 w-3" />,
    };
  }
  if (progress.dueDate <= now) {
    return {
      label: isRu ? 'К повторению' : 'Due',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      icon: <RotateCcw className="h-3 w-3" />,
    };
  }
  return {
    label: isRu ? 'Изучено' : 'Learned',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    icon: <CheckCircle2 className="h-3 w-3" />,
  };
}

function formatDueDate(date: Date, now: Date, isRu: boolean) {
  const diff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return isRu ? 'Сейчас' : 'Now';
  if (diff === 1) return isRu ? 'Завтра' : 'Tomorrow';
  if (diff < 7) return isRu ? `Через ${diff} дн.` : `In ${diff}d`;
  if (diff < 30) return isRu ? `Через ${Math.round(diff / 7)} нед.` : `In ${Math.round(diff / 7)}w`;
  return isRu ? `Через ${Math.round(diff / 30)} мес.` : `In ${Math.round(diff / 30)}mo`;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const session = await auth();
  const isRu = locale === 'ru';
  const userId = session?.user?.id;
  const now = new Date();

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      cards: {
        where: { isPublished: true },
        include: { progress: userId ? { where: { userId } } : false },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!category) notFound();

  const name = isRu ? category.nameRu : category.nameEn;
  const desc = isRu ? category.descriptionRu : category.descriptionEn;
  const total = category.cards.length;
  const learned = userId
    ? category.cards.filter((c) => c.progress.some((p: CardProgress) => p.repetitions > 0)).length
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session?.user} />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">

        {/* Back */}
        <Link
          href={`/${locale}/categories`}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-6 -ml-2')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {isRu ? 'Все темы' : 'All topics'}
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <CategoryIcon slug={slug} className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            {desc && <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 mt-4 mb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {total} {isRu ? 'вопросов' : 'questions'}
          </span>
          {userId && (
            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              {learned} {isRu ? 'изучено' : 'learned'}
            </span>
          )}
          <Link
            href={`/${locale}/study?category=${slug}`}
            className={cn(buttonVariants({ size: 'sm' }), 'ml-auto')}
          >
            {isRu ? 'Повторить' : 'Review'}
          </Link>
        </div>

        {/* Card list */}
        <div className="border rounded-xl overflow-hidden">
          {category.cards.map((card, idx) => {
            const progress = userId ? card.progress[0] as CardProgress | undefined : undefined;
            const status = getStatusInfo(progress, now, isRu);
            const diff = DIFFICULTY_LABEL[card.difficulty];
            const question = isRu ? card.questionRu : card.questionEn;

            return (
              <div
                key={card.id}
                className={cn(
                  'flex items-start gap-4 px-4 py-3.5 text-sm',
                  idx !== category.cards.length - 1 && 'border-b',
                  idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                )}
              >
                {/* Index */}
                <span className="text-muted-foreground/50 w-6 shrink-0 mt-0.5 text-xs tabular-nums">
                  {idx + 1}
                </span>

                {/* Question */}
                <p className="flex-1 leading-snug line-clamp-2">{question}</p>

                {/* Badges */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', diff.color)}>
                    {diff[isRu ? 'ru' : 'en']}
                  </span>

                  <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', status.color)}>
                    {status.icon}
                    {status.label}
                  </span>

                  {progress && progress.repetitions > 0 && progress.dueDate > now && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDueDate(progress.dueDate, now, isRu)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
