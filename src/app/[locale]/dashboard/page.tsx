import { auth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@/widgets/navbar/ui/navbar';
import { buttonVariants } from '@/shared/lib/button-variants';
import Link from 'next/link';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { ActivityHeatmap } from '@/widgets/activity-heatmap/ui/activity-heatmap';
import { Greeting } from '@/widgets/dashboard/ui/greeting';
import { DifficultyStats } from '@/widgets/difficulty-stats/ui/difficulty-stats';
import { CategoryStats } from '@/widgets/category-stats/ui/category-stats';
import { StatCard } from '@/widgets/dashboard/ui/stat-card';
import { CategoryGrid } from '@/widgets/dashboard/ui/category-grid';
import { getDashboardData } from '@/widgets/dashboard/api/get-dashboard-data';
import { getTranslations } from 'next-intl/server';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/${locale}/auth/signin`);
  }

  const [t, data] = await Promise.all([
    getTranslations('dashboard'),
    getDashboardData(session.user.id),
  ]);

  const firstName = session.user.name?.split(' ')[0] ?? '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session.user} />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Greeting name={firstName} />
            <p className="text-muted-foreground mt-1">
              {data.totalDue > 0
                ? t('dueCardsToday', { count: data.totalDue })
                : t('allCaughtUpToday')}
            </p>
          </div>
          <Link href={`/${locale}/study`} className={cn(buttonVariants({ size: 'lg' }))}>
            <Brain className="h-4 w-4 mr-2" />
            {t('review')}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={<BookOpen className="h-5 w-5 text-blue-500" />}
            label={t('dueToday')}
            value={data.totalDue}
            highlight={data.totalDue > 0}
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
            label={t('learned')}
            value={data.totalLearned}
          />
          <StatCard
            icon={<BookOpen className="h-5 w-5 text-purple-500" />}
            label={t('newCards')}
            value={data.newCardsCount}
          />
        </div>

        <div className="mb-6">
          <ActivityHeatmap
            data={data.heatmapData}
            locale={locale}
            totalDays={data.totalActiveDays}
            streak={data.streak}
            dailyGoal={data.dailyNewCards}
          />
        </div>

        <h2 className="text-lg font-semibold mb-4">{t('topics')}</h2>
        <CategoryGrid categories={data.categoryStats} locale={locale} />
      </main>
    </div>
  );
}
