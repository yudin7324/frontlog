import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import { IntervalsForm } from '@/components/settings/intervals-form';
import { CategoryResetList } from '@/components/settings/category-reset-list';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignOutButton } from '@/components/settings/sign-out-button';

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
    intervalAgain: userSettings?.intervalAgain  ?? 1,
    intervalGood1: userSettings?.intervalGood1  ?? 1,
    intervalGood2: userSettings?.intervalGood2  ?? 6,
    intervalEasy1: userSettings?.intervalEasy1  ?? 4,
    intervalEasy2: userSettings?.intervalEasy2  ?? 8,
  };

  const categories = categoriesRaw.map((cat) => ({
    slug:    cat.slug,
    nameRu:  cat.nameRu,
    nameEn:  cat.nameEn,
    total:   cat.cards.length,
    learned: cat.cards.filter((c) => c.progress.some((p) => p.repetitions > 0)).length,
  })).filter((c) => c.total > 0);

  const user = session.user;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

        {/* Profile */}
        <div className="border rounded-xl p-5 mb-4 flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
            <AvatarFallback className="text-lg">
              {user.name?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <SignOutButton />
        </div>

        {/* Intervals & daily limits */}
        <div className="mb-4">
          <IntervalsForm initial={settings} />
        </div>

        {/* Progress reset */}
        <div className="border rounded-xl p-5">
          <h2 className="font-semibold mb-1">{t('progressTitle')}</h2>
          <p className="text-sm text-muted-foreground mb-4">{t('progressDesc')}</p>
          <CategoryResetList categories={categories} />
        </div>
      </main>
    </div>
  );
}
