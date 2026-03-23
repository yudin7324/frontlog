import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/layout/navbar';
import { buttonVariants } from '@/lib/button-variants';
import { Brain, BarChart3, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/auth';

export default async function HomePage() {
  const locale = await getLocale();
  const session = await auth();
  const isRu = locale === 'ru';

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
            MVP — {isRu ? 'открытый бета-доступ' : 'open beta'}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {isRu ? (
              <>Готовься к собеседованию<br /><span className="text-primary">по-умному</span></>
            ) : (
              <>Prepare for interviews<br /><span className="text-primary">the smart way</span></>
            )}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isRu
              ? 'Flashcard-система с интервальным повторением для frontend-разработчиков. Учи только то, что готов забыть.'
              : "Spaced repetition flashcard system for frontend developers. Study only what you're about to forget."}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            {/* <Link
              href={`/${locale}/auth/signin`}
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              {isRu ? 'Начать бесплатно' : 'Get started for free'}
            </Link> */}
            <Link
              href={`/${locale}/study`}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              {isRu ? 'Попробовать без регистрации' : 'Try without signup'}
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-primary" />}
              title={isRu ? 'Интервальное повторение' : 'Spaced Repetition'}
              desc={isRu
                ? 'Алгоритм SM-2 показывает карточки именно тогда, когда ты готов их забыть'
                : "SM-2 algorithm shows cards exactly when you're about to forget them"}
            />
            <FeatureCard
              icon={<Layers className="h-8 w-8 text-primary" />}
              title={isRu ? 'Все темы фронтенда' : 'All Frontend Topics'}
              desc={isRu
                ? 'HTML, CSS, JavaScript, TypeScript, React, Next.js и алгоритмы'
                : 'HTML, CSS, JavaScript, TypeScript, React, Next.js and algorithms'}
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title={isRu ? 'Отслеживай прогресс' : 'Track Progress'}
              desc={isRu
                ? 'Видь как растёт твоя уверенность день за днём'
                : 'Watch your confidence grow day by day'}
            />
          </div>
        </section>

        {/* Categories preview */}
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {isRu ? 'Темы для изучения' : 'Topics to study'}
          </h2>
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
        FrontLog © 2025 · {isRu ? 'Подготовка к frontend-собеседованиям' : 'Frontend interview prep'}
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
