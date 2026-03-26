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
    title: 'FrontLog — Вопросы и ответы на frontend собеседование',
    description: 'Подготовься к собеседованию фронтенд разработчика с помощью карточек. Вопросы и ответы по JavaScript, TypeScript, React, Next.js, CSS, алгоритмам и системному дизайну. Интервальное повторение — учи быстро и запоминай надолго.',
    keywords: ['frontend собеседование вопросы', 'подготовка к собеседованию фронтенд', 'javascript вопросы собеседование', 'react typescript вопросы и ответы', 'флеш карточки программист'],
  },
  en: {
    title: 'FrontLog — Frontend Interview Questions & Answers',
    description: 'Prepare for your frontend developer interview with spaced repetition flashcards. JavaScript, TypeScript, React, Next.js, CSS, algorithms and system design questions with answers.',
    keywords: ['frontend interview questions', 'javascript interview prep', 'react interview questions', 'typescript flashcards', 'frontend developer interview'],
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
    keywords: meta.keywords,
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
