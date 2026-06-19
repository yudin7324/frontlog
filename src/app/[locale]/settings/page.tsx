import { auth } from '@/shared/lib/auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@/widgets/navbar/ui/navbar';
import { prisma } from '@/shared/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { SettingsShell } from '@/widgets/settings/ui/settings-shell';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user?.id) redirect(`/${locale}/auth/signin`);

  const userId = session.user.id;
  const t = await getTranslations('settings');

  const [userSettings, categoriesRaw] = await Promise.all([
    prisma.userSettings.findUnique({ where: { userId } }),
    prisma.category.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
      include: {
        cards: {
          where: { isPublished: true },
          include: { progress: { where: { userId } } },
        },
      },
    }),
  ]);

  const settings = {
    dailyNewCards: userSettings?.dailyNewCards ?? 10,
    dailyReviews:  userSettings?.dailyReviews  ?? 50,
    intervalAgain: userSettings?.intervalAgain ?? 5,
    intervalHard:  userSettings?.intervalHard  ?? 10,
    intervalGood:  userSettings?.intervalGood  ?? 1440,
    intervalEasy:  userSettings?.intervalEasy  ?? 4320,
  };

  const categories = categoriesRaw.map((cat) => ({
    slug:    cat.slug,
    nameRu:  cat.nameRu,
    nameEn:  cat.nameEn,
    total:   cat.cards.length,
    learned: cat.cards.filter((c) => c.progress.some((p) => p.repetitions > 0)).length,
  })).filter((c) => c.total > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session.user} />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
        <SettingsShell
          user={session.user}
          settings={settings}
          activeStudyPlanSlug={userSettings?.activeStudyPlanSlug ?? null}
          categories={categories}
        />
      </main>
    </div>
  );
}
