import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import type { CardSeed } from './seeds/types';
import { cards as jsCards } from './seeds/javascript';
import { cards as tsCards } from './seeds/typescript';
import { cards as htmlCards } from './seeds/html';
import { cards as cssCards } from './seeds/css';
import { cards as browserCards } from './seeds/browser';
import { cards as reactCards } from './seeds/react';
import { cards as nextjsCards } from './seeds/nextjs';
import { cards as networkingCards } from './seeds/networking';
import { cards as performanceCards } from './seeds/performance';
import { cards as testingCards } from './seeds/testing';
import { cards as securityCards } from './seeds/security';
import { cards as toolsCards } from './seeds/tools';
import { cards as algorithmsCards } from './seeds/algorithms';
import { cards as systemDesignCards } from './seeds/system-design';
import { cards as patternsCards } from './seeds/patterns';

const prisma = new PrismaClient();

async function upsertCards(categoryId: string, cards: CardSeed[]) {
  await Promise.all(
    cards.map((card) =>
      prisma.card.upsert({
        where: { id: card.id },
        update: {},
        create: { ...card, categoryId, isPublished: true },
      })
    )
  );
}

async function main() {
  console.log('Seeding database...');

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'javascript' },
      update: { nameRu: 'JavaScript Core', nameEn: 'JavaScript Core', order: 1, isVisible: true },
      create: {
        slug: 'javascript',
        nameRu: 'JavaScript Core',
        nameEn: 'JavaScript Core',
        descriptionRu: 'Основы и продвинутые концепции JS',
        descriptionEn: 'Core and advanced JS concepts',
        icon: '🟨',
        order: 1,
        isVisible: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'typescript' },
      update: { order: 2, isVisible: true },
      create: {
        slug: 'typescript',
        nameRu: 'TypeScript',
        nameEn: 'TypeScript',
        descriptionRu: 'Типизация и возможности TypeScript',
        descriptionEn: 'Types and TypeScript features',
        icon: '🔷',
        order: 2,
        isVisible: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'html' },
      update: { order: 3, isVisible: true },
      create: {
        slug: 'html',
        nameRu: 'HTML',
        nameEn: 'HTML',
        descriptionRu: 'Семантика, доступность, формы',
        descriptionEn: 'Semantics, accessibility, forms',
        icon: '🧱',
        order: 3,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'css' },
      update: { order: 4, isVisible: true },
      create: {
        slug: 'css',
        nameRu: 'CSS',
        nameEn: 'CSS',
        descriptionRu: 'Верстка, флексбокс, гриды, анимации',
        descriptionEn: 'Layout, flexbox, grid, animations',
        icon: '🎨',
        order: 4,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'browser' },
      update: { nameRu: 'Браузер и рендеринг', nameEn: 'Browser & Rendering', order: 5, isVisible: true },
      create: {
        slug: 'browser',
        nameRu: 'Браузер и рендеринг',
        nameEn: 'Browser & Rendering',
        descriptionRu: 'Как работает браузер, события, rendering',
        descriptionEn: 'How browsers work, events, rendering',
        icon: '🌐',
        order: 5,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'networking' },
      update: { order: 6, isVisible: true },
      create: {
        slug: 'networking',
        nameRu: 'Сеть и HTTP',
        nameEn: 'Networking & HTTP',
        descriptionRu: 'HTTP, REST, WebSockets, протоколы',
        descriptionEn: 'HTTP, REST, WebSockets, protocols',
        icon: '🔗',
        order: 6,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'performance' },
      update: { order: 7, isVisible: true },
      create: {
        slug: 'performance',
        nameRu: 'Производительность',
        nameEn: 'Performance',
        descriptionRu: 'Оптимизация загрузки и рендеринга',
        descriptionEn: 'Load and rendering optimization',
        icon: '⚡',
        order: 7,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'react' },
      update: { order: 8, isVisible: true },
      create: {
        slug: 'react',
        nameRu: 'React',
        nameEn: 'React',
        descriptionRu: 'Хуки, паттерны и жизненный цикл',
        descriptionEn: 'Hooks, patterns and lifecycle',
        icon: '⚛️',
        order: 8,
        isVisible: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'nextjs' },
      update: { order: 9, isVisible: true },
      create: {
        slug: 'nextjs',
        nameRu: 'Next.js',
        nameEn: 'Next.js',
        descriptionRu: 'App Router, SSR, RSC, data fetching',
        descriptionEn: 'App Router, SSR, RSC, data fetching',
        icon: '▲',
        order: 9,
        isVisible: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'vue' },
      update: { order: 10, isVisible: false },
      create: {
        slug: 'vue',
        nameRu: 'Vue',
        nameEn: 'Vue',
        descriptionRu: 'Composition API, реактивность, экосистема',
        descriptionEn: 'Composition API, reactivity, ecosystem',
        icon: '💚',
        order: 9,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'angular' },
      update: { order: 10, isVisible: false },
      create: {
        slug: 'angular',
        nameRu: 'Angular',
        nameEn: 'Angular',
        descriptionRu: 'Компоненты, сервисы, DI, RxJS',
        descriptionEn: 'Components, services, DI, RxJS',
        icon: '🅰️',
        order: 10,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'svelte' },
      update: { order: 11, isVisible: false },
      create: {
        slug: 'svelte',
        nameRu: 'Svelte',
        nameEn: 'Svelte',
        descriptionRu: 'Реактивность, stores, transitions',
        descriptionEn: 'Reactivity, stores, transitions',
        icon: '🔥',
        order: 11,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'testing' },
      update: { order: 12, isVisible: true },
      create: {
        slug: 'testing',
        nameRu: 'Тестирование',
        nameEn: 'Testing',
        descriptionRu: 'Unit, интеграционные, E2E тесты',
        descriptionEn: 'Unit, integration, E2E tests',
        icon: '🧪',
        order: 12,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'security' },
      update: { order: 13, isVisible: true },
      create: {
        slug: 'security',
        nameRu: 'Безопасность',
        nameEn: 'Security',
        descriptionRu: 'XSS, CSRF, CSP, аутентификация',
        descriptionEn: 'XSS, CSRF, CSP, authentication',
        icon: '🔒',
        order: 13,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tools' },
      update: { order: 14, isVisible: true },
      create: {
        slug: 'tools',
        nameRu: 'Инструменты',
        nameEn: 'Tools',
        descriptionRu: 'Webpack, Vite, ESLint, Git',
        descriptionEn: 'Webpack, Vite, ESLint, Git',
        icon: '🔧',
        order: 14,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'algorithms' },
      update: { order: 15, isVisible: true },
      create: {
        slug: 'algorithms',
        nameRu: 'Алгоритмы и структуры данных',
        nameEn: 'Algorithms & Data Structures',
        descriptionRu: 'Сортировки, поиск, сложность O(n)',
        descriptionEn: 'Sorting, search, complexity O(n)',
        icon: '📊',
        order: 15,
        isVisible: false,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'system-design' },
      update: { order: 16 },
      create: {
        slug: 'system-design',
        nameRu: 'Системный дизайн',
        nameEn: 'System Design',
        descriptionRu: 'Масштабирование, паттерны, архитектура',
        descriptionEn: 'Scaling, patterns, architecture',
        icon: '🏗️',
        order: 16,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'patterns' },
      update: { order: 17, isVisible: true },
      create: {
        slug: 'patterns',
        nameRu: 'Паттерны и принципы',
        nameEn: 'Patterns & Principles',
        descriptionRu: 'SOLID, GoF паттерны, чистый код',
        descriptionEn: 'SOLID, GoF patterns, clean code',
        icon: '🧩',
        order: 17,
        isVisible: false,
      },
    }),
  ]);

  const [js, ts, html, css, browser, networking, performance, react, nextjs, , , , testing, security, tools, algorithms, systemDesign, patterns] = categories;

  await upsertCards(js.id, jsCards);
  await upsertCards(ts.id, tsCards);
  await upsertCards(html.id, htmlCards);
  await upsertCards(css.id, cssCards);
  await upsertCards(browser.id, browserCards);
  await upsertCards(react.id, reactCards);
  await upsertCards(nextjs.id, nextjsCards);
  await upsertCards(networking.id, networkingCards);
  await upsertCards(performance.id, performanceCards);
  await upsertCards(testing.id, testingCards);
  await upsertCards(security.id, securityCards);
  await upsertCards(tools.id, toolsCards);
  await upsertCards(algorithms.id, algorithmsCards);
  await upsertCards(systemDesign.id, systemDesignCards);
  await upsertCards(patterns.id, patternsCards);

  console.log('✅ Seed completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
