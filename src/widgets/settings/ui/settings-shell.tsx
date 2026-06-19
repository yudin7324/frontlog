'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Route, Sliders, RotateCcw } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { SignOutButton } from '@/features/sign-out/ui/sign-out-button';
import { StudyPlanPicker } from '@/features/select-study-plan/ui/study-plan-picker';
import { IntervalsForm } from '@/features/update-settings/ui/intervals-form';
import { CategoryResetList } from '@/features/reset-progress/ui/category-reset-list';
import { STUDY_PLANS } from '@/entities/study-plan/model/plans';

type Section = 'plan' | 'learning' | 'reset';

interface Settings {
  dailyNewCards: number;
  dailyReviews: number;
  intervalAgain: number;
  intervalHard: number;
  intervalGood: number;
  intervalEasy: number;
}

interface CategoryStat {
  slug: string;
  nameRu: string;
  nameEn: string;
  total: number;
  learned: number;
}

interface Props {
  user: { name?: string | null; email?: string | null; image?: string | null };
  settings: Settings;
  activeStudyPlanSlug: string | null;
  categories: CategoryStat[];
}

export function SettingsShell({ user, settings, activeStudyPlanSlug, categories }: Props) {
  const t = useTranslations('settings');
  const tPlans = useTranslations('studyPlans');
  const locale = useLocale();
  const [active, setActive] = useState<Section>('plan');

  const sections = [
    { id: 'plan' as Section,     label: t('planTitle'),      icon: Route },
    { id: 'learning' as Section, label: t('learningTitle'),  icon: Sliders },
    { id: 'reset' as Section,    label: t('progressTitle'),  icon: RotateCcw },
  ];

  const planLabels = {
    days:       tPlans('days'),
    categories: tPlans('categories'),
    active:     tPlans('active'),
    start:      tPlans('start'),
    switch:     tPlans('switch'),
    clear:      tPlans('clear'),
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">

      {/* Sidebar */}
      <aside className="md:w-52 shrink-0 flex flex-col gap-4">

        {/* Profile */}
        <div className="border rounded-xl p-4 flex md:flex-col items-center gap-3">
          <Avatar className="h-12 w-12 md:h-16 md:w-16 shrink-0">
            <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
            <AvatarFallback className="text-base">
              {user.name?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 md:text-center">
            <p className="font-semibold text-sm truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <SignOutButton />
        </div>

        {/* Nav */}
        <nav className="flex md:flex-col gap-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                'flex items-center gap-2.5 flex-1 md:flex-none px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                'md:w-full md:text-left justify-center md:justify-start',
                active === id
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline md:inline">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {active === 'plan' && (
          <div>
            <div className="mb-4">
              <h2 className="font-semibold">{t('planTitle')}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{t('planDesc')}</p>
            </div>
            <StudyPlanPicker
              plans={STUDY_PLANS}
              activeSlug={activeStudyPlanSlug}
              locale={locale}
              labels={planLabels}
            />
          </div>
        )}

        {active === 'learning' && <IntervalsForm initial={settings} />}

        {active === 'reset' && (
          <div>
            <div className="mb-4">
              <h2 className="font-semibold">{t('progressTitle')}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{t('progressDesc')}</p>
            </div>
            <CategoryResetList categories={categories} />
          </div>
        )}
      </div>
    </div>
  );
}
