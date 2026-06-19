export type StudyPlanSlug =
  | 'junior-frontend'
  | 'middle-frontend'
  | 'react-sprint'
  | 'browser-performance';

export interface StudyPlan {
  slug: StudyPlanSlug;
  durationDays: number;
  categorySlugs: string[];
  nameRu: string;
  nameEn: string;
  descriptionRu: string;
  descriptionEn: string;
}

export const STUDY_PLANS: StudyPlan[] = [
  {
    slug: 'junior-frontend',
    durationDays: 14,
    categorySlugs: ['html', 'css', 'javascript', 'browser', 'react', 'tools'],
    nameRu: 'Junior Frontend Interview',
    nameEn: 'Junior Frontend Interview',
    descriptionRu: 'Базовый маршрут по HTML, CSS, JavaScript, браузеру, React и инструментам.',
    descriptionEn: 'A focused path through HTML, CSS, JavaScript, browser basics, React, and tooling.',
  },
  {
    slug: 'middle-frontend',
    durationDays: 30,
    categorySlugs: ['javascript', 'typescript', 'react', 'nextjs', 'browser', 'performance', 'security', 'testing', 'system-design'],
    nameRu: 'Middle Frontend Interview',
    nameEn: 'Middle Frontend Interview',
    descriptionRu: 'Глубокий план для middle-интервью: JS/TS, React, Next.js, браузер, performance, security и testing.',
    descriptionEn: 'A deeper middle-level plan covering JS/TS, React, Next.js, browser internals, performance, security, and testing.',
  },
  {
    slug: 'react-sprint',
    durationDays: 10,
    categorySlugs: ['javascript', 'typescript', 'react', 'patterns', 'testing'],
    nameRu: 'React Interview Sprint',
    nameEn: 'React Interview Sprint',
    descriptionRu: 'Короткий интенсив перед React-собеседованием: компоненты, хуки, состояние, паттерны и тестирование.',
    descriptionEn: 'A short sprint for React interviews: components, hooks, state, patterns, and testing.',
  },
  {
    slug: 'browser-performance',
    durationDays: 10,
    categorySlugs: ['browser', 'performance', 'networking', 'security'],
    nameRu: 'Browser & Performance Deep Dive',
    nameEn: 'Browser & Performance Deep Dive',
    descriptionRu: 'Фокус на браузере, сети, производительности и безопасности для сильного middle+ блока.',
    descriptionEn: 'A focused browser, networking, performance, and security plan for stronger middle+ interviews.',
  },
];

export function getStudyPlan(slug?: string | null) {
  return STUDY_PLANS.find((plan) => plan.slug === slug) ?? null;
}

export function getStudyPlanDay(startedAt?: Date | null) {
  if (!startedAt) return 1;

  const elapsed = Date.now() - startedAt.getTime();
  return Math.max(1, Math.floor(elapsed / 86400000) + 1);
}
