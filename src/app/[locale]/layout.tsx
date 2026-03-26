import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frontlog.ru';

const META = {
  ru: {
    title: 'FrontLog — Подготовка к frontend-собеседованиям',
    description: 'Flashcard-система с интервальным повторением для frontend-разработчиков. Учи JavaScript, TypeScript, React, Next.js, CSS и готовься к собеседованиям.',
  },
  en: {
    title: 'FrontLog — Frontend Interview Prep',
    description: 'Spaced repetition flashcard system for frontend developers. Study JavaScript, TypeScript, React, Next.js, CSS and ace your interviews.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === 'ru';
  const meta = isRu ? META.ru : META.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        ru: `${BASE_URL}/ru`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}`,
      locale: isRu ? 'ru_RU' : 'en_US',
      alternateLocale: isRu ? 'en_US' : 'ru_RU',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as 'ru' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
