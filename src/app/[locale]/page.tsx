import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/layout/navbar';
import { buttonVariants } from '@/lib/button-variants';
import { Brain, BarChart3, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/auth';

export default async function HomePage() {
  const locale = await getLocale();
  const session = await auth();
  const t = await getTranslations('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session?.user} />

      <main className="flex-1">
        <section className="container mx-auto max-w-6xl px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            MVP — {t('beta')}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {t('heroTitle1')}<br />
            <span className="text-primary">{t('heroTitle2')}</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/${locale}/study`}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              {t('tryButton')}
            </Link>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-primary" />}
              title={t('feature1Title')}
              desc={t('feature1Desc')}
            />
            <FeatureCard
              icon={<Layers className="h-8 w-8 text-primary" />}
              title={t('feature2Title')}
              desc={t('feature2Desc')}
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title={t('feature3Title')}
              desc={t('feature3Desc')}
            />
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('topicsTitle')}</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'CSS', 'HTML', 'Алгоритмы', 'Браузер', 'Оптимизация'].map((topic) => (
              <span key={topic} className="px-4 py-2 rounded-full border bg-muted text-sm font-medium">
                {topic}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        FrontLog © 2025 · {t('footerText')}
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </CardContent>
    </Card>
  );
}
