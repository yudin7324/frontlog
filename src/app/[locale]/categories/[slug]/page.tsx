import { auth } from '@/shared/lib/auth';
import { notFound } from 'next/navigation';
import { Navbar } from '@/widgets/navbar/ui/navbar';
import { CategoryIcon } from '@/entities/category/ui/category-icon';
import { buttonVariants } from '@/shared/lib/button-variants';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getCategoryData } from '@/entities/category/lib/db';
import type { CategoryWithCards } from '@/shared/types/db';
import { CardList } from '@/entities/category/ui/card-list';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frontlog.ru';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isRu = locale === 'ru';
  const category = await getCategoryData(slug, undefined);
  if (!category) return {};

  const name = isRu ? category.nameRu : category.nameEn;
  const desc = isRu ? category.descriptionRu : category.descriptionEn;
  const title = isRu
    ? `${name} — вопросы на собеседование`
    : `${name} — Interview Questions`;
  const description = desc ?? (isRu
    ? `${category.cards.length} вопросов по теме ${name} с ответами и интервальным повторением`
    : `${category.cards.length} ${name} interview questions with answers and spaced repetition`);

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/categories/${slug}`,
      languages: {
        ru: `${BASE_URL}/ru/categories/${slug}`,
        en: `${BASE_URL}/en/categories/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/categories/${slug}`,
      locale: isRu ? 'ru_RU' : 'en_US',
    },
  };
}

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
          now={now}
        />
      </main>
    </div>
  );
}
