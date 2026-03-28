'use client';

import { useTranslations } from 'next-intl';

type GreetingKey = 'greetingMorning' | 'greetingAfternoon' | 'greetingEvening' | 'greetingNight';

function getGreetingKey(): GreetingKey {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'greetingMorning';
  if (hour >= 12 && hour < 18) return 'greetingAfternoon';
  if (hour >= 18 && hour < 22) return 'greetingEvening';
  return 'greetingNight';
}

export function Greeting({ name }: { name: string }) {
  const t = useTranslations('dashboard');
  return <h1 className="text-2xl font-bold">{t(getGreetingKey(), { name })}</h1>;
}
