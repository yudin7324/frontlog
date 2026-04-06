import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/widgets/navbar/ui/navbar';
import { buttonVariants } from '@/shared/lib/button-variants';
import { cn } from '@/shared/lib/utils';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { CATEGORY_BG, CATEGORY_BORDER } from '@/entities/category/lib/category-colors';
import { HeroBackground } from '@/shared/ui/hero-background';

export default async function HomePage() {
  const locale = await getLocale() as 'ru' | 'en';
  const isRu = locale === 'ru';
  const [session, categories] = await Promise.all([
    auth(),
    prisma.category.findMany({
      where: { isVisible: true },
      select: { slug: true, nameRu: true, nameEn: true },
      orderBy: { order: 'asc' },
    }),
  ]);
  const t = await getTranslations('home');

  const steps = [
    { num: '01', title: t('step1Title'), desc: t('step1Desc') },
    { num: '02', title: t('step2Title'), desc: t('step2Desc') },
    { num: '03', title: t('step3Title'), desc: t('step3Desc') },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 flex flex-col flex-1">
      <Navbar user={session?.user} />

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto max-w-3xl px-4 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            {t('beta')}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 whitespace-pre-line leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            {t('heroSubtitle')}
          </p>

          <Link
            href={`/${locale}/study`}
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            {t('tryButton')}
          </Link>
        </section>

        {/* How it works */}
        <section className="border-t">
          <div className="container mx-auto max-w-3xl px-4 py-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-10">
              {t('howTitle')}
            </h2>
            <div className="flex flex-col gap-8">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-6 items-start">
                  <span className="text-2xl font-bold text-muted-foreground/30 w-10 shrink-0 leading-tight">
                    {step.num}
                  </span>
                  <div>
                    <p className="font-semibold mb-1">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="border-t">
          <div className="container mx-auto max-w-3xl px-4 py-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              {t('topicsTitle')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat.slug}
                  className={cn(
                    'px-3 py-1.5 rounded-md border text-sm font-medium',
                    CATEGORY_BG[cat.slug] ?? 'bg-muted',
                    CATEGORY_BORDER[cat.slug] ?? 'border-border',
                  )}
                >
                  {isRu ? cat.nameRu : cat.nameEn}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto max-w-3xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold mb-1">{t('contactTitle')}</p>
            <p className="text-xs text-muted-foreground mb-2">{t('contactDesc')}</p>
            <a
              href="mailto:frontlogapp@gmail.com"
              className="text-sm font-medium hover:underline"
            >
              {t('contactEmail')}
            </a>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right shrink-0">
            FrontLog © {new Date().getFullYear()}<br />{t('footerText')}
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
