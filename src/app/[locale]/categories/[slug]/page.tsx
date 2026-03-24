import { auth } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { CategoryIcon } from '@/components/ui/category-icon';
import { buttonVariants } from '@/lib/button-variants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getCategoryData } from '@/lib/db/category';
import type { CategoryWithCards } from '@/types/db';
import { CardList } from '@/components/category/card-list';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const now = new Date();
  const isRu = locale === 'ru';
  const t = await getTranslations('category');

  const category = await getCategoryData(slug, userId);
  if (!category) notFound();

  const name = isRu ? category.nameRu : category.nameEn;
  const desc = isRu ? category.descriptionRu : category.descriptionEn;
  const total = category.cards.length;
  type CardItem = CategoryWithCards['cards'][number];
  type ProgressItem = CardItem['progress'][number];
  const learned = userId
    ? category.cards.filter((c: CardItem) => c.progress.some((p: ProgressItem) => p.repetitions > 0)).length
    : 0;

  const difficultyLabel: Record<string, string> = {
    EASY:   t('difficultyEasy'),
    MEDIUM: t('difficultyMedium'),
    HARD:   t('difficultyHard'),
  };

  const statusLabels = {
    new:      t('statusNew'),
    learning: t('statusLearning'),
    due:      t('statusDue'),
    learned:  t('statusLearned'),
  };

  const dateLabels = {
    now:      t('dueDateNow'),
    tomorrow: t('dueDateTomorrow'),
    days:     (n: number) => t('dueDateDays', { n }),
    weeks:    (n: number) => t('dueDateWeeks', { n }),
    months:   (n: number) => t('dueDateMonths', { n }),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session?.user} />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">

        <Link
          href={`/${locale}/categories`}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-6 -ml-2')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('back')}
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <CategoryIcon slug={slug} className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            {desc && <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>}
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4 mb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {total} {t('questions')}
          </span>
          {userId && (
            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              {learned} {t('learned')}
            </span>
          )}
          <Link
            href={`/${locale}/study?category=${slug}`}
            className={cn(buttonVariants({ size: 'sm' }), 'ml-auto')}
          >
            {t('review')}
          </Link>
        </div>

        <CardList
          cards={category.cards}
          locale={locale}
          now={now}
          difficultyLabel={difficultyLabel}
          statusLabels={statusLabels}
          dateLabels={dateLabels}
        />
      </main>
    </div>
  );
}
