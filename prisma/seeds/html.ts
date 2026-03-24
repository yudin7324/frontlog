import type { CardSeed } from './types';

export const cards: CardSeed[] = [
  {
    id: 'html-001',
    difficulty: 'MEDIUM',
    questionRu: 'Что такое семантический HTML и зачем он нужен?',
    questionEn: 'What is semantic HTML and why does it matter?',
    answerRu: '**Семантические теги** — элементы, которые несут смысл о структуре документа, а не только о внешнем виде.\n\n**Несемантические:** `<div>`, `<span>` — ничего не говорят о содержимом\n\n**Семантические:**\n```html\n<header>   — шапка страницы/секции\n<nav>      — навигация\n<main>     — основной контент\n<article>  — самостоятельный материал\n<section>  — тематическая секция\n<aside>    — боковой контент\n<footer>   — подвал\n```\n\n**Зачем:**\n- **SEO** — поисковики лучше понимают структуру\n- **Доступность** — скринридеры навигируют по landmark-элементам\n- **Читаемость** — код понятнее без комментариев\n\n```html\n<!-- ❌ div-soup -->\n<div class="header"><div class="nav">...\n\n<!-- ✅ семантично -->\n<header><nav>...\n```',
    answerEn: '**Semantic tags** — elements that convey meaning about document structure, not just appearance.\n\n**Non-semantic:** `<div>`, `<span>` — say nothing about content\n\n**Semantic:**\n```html\n<header>   — page/section header\n<nav>      — navigation\n<main>     — main content\n<article>  — standalone content\n<section>  — thematic section\n<aside>    — sidebar content\n<footer>   — footer\n```\n\n**Why it matters:**\n- **SEO** — search engines better understand structure\n- **Accessibility** — screen readers navigate by landmark elements\n- **Readability** — code is self-documenting\n\n```html\n<!-- ❌ div-soup -->\n<div class="header"><div class="nav">...\n\n<!-- ✅ semantic -->\n<header><nav>...\n```',
    tags: ['semantic', 'html5', 'seo', 'accessibility'],
    order: 1,
  },
  {
    id: 'html-002',
    difficulty: 'EASY',
    questionRu: 'В чём разница между block и inline элементами?',
    questionEn: 'What is the difference between block and inline elements?',
    answerRu: '**Block-элементы:**\n- Занимают всю доступную ширину\n- Начинаются с новой строки\n- Можно задать width/height, margin, padding со всех сторон\n- Примеры: `<div>`, `<p>`, `<h1>–<h6>`, `<ul>`, `<section>`\n\n**Inline-элементы:**\n- Занимают только нужную ширину\n- Не переносятся на новую строку\n- Нельзя задать width/height; вертикальный margin не работает\n- Примеры: `<span>`, `<a>`, `<strong>`, `<img>`, `<code>`\n\n**Inline-block:**\n- Как inline (в потоке), но можно задать размеры\n\n```css\ndisplay: block;\ndisplay: inline;\ndisplay: inline-block;\n```\n\n`<img>` технически inline, но ведёт себя как inline-block.',
    answerEn: '**Block elements:**\n- Take up full available width\n- Start on a new line\n- Support width/height, margin/padding on all sides\n- Examples: `<div>`, `<p>`, `<h1>–<h6>`, `<ul>`, `<section>`\n\n**Inline elements:**\n- Take only the needed width\n- Do not start on a new line\n- Cannot set width/height; vertical margin ignored\n- Examples: `<span>`, `<a>`, `<strong>`, `<img>`, `<code>`\n\n**Inline-block:**\n- Flows like inline, but supports dimensions\n\n```css\ndisplay: block;\ndisplay: inline;\ndisplay: inline-block;\n```\n\n`<img>` is technically inline but behaves like inline-block.',
    tags: ['block', 'inline', 'display', 'layout'],
    order: 2,
  },
  {
    id: 'html-003',
    difficulty: 'MEDIUM',
    questionRu: 'Что такое доступность (a11y) и ARIA?',
    questionEn: 'What is web accessibility (a11y) and ARIA?',
    answerRu: '**Доступность (a11y)** — возможность использовать сайт людьми с ограниченными возможностями (скринридеры, клавиатурная навигация).\n\n**ARIA (Accessible Rich Internet Applications)** — набор атрибутов для улучшения доступности динамического контента:\n\n```html\n<!-- role — роль элемента -->\n<div role="button" tabindex="0">Нажми</div>\n\n<!-- aria-label — текстовое описание -->\n<button aria-label="Закрыть модалку">✕</button>\n\n<!-- aria-hidden — скрыть от скринридера -->\n<span aria-hidden="true">🎉</span>\n\n<!-- aria-expanded — состояние раскрытия -->\n<button aria-expanded="false">Меню</button>\n\n<!-- aria-live — объявлять изменения -->\n<div aria-live="polite">Загрузка...</div>\n```\n\n**Правило первое:** используй нативные семантические теги — они уже доступны. ARIA нужна когда нативных тегов не хватает.',
    answerEn: '**Accessibility (a11y)** — ability for people with disabilities to use a site (screen readers, keyboard navigation).\n\n**ARIA (Accessible Rich Internet Applications)** — attributes to enhance accessibility of dynamic content:\n\n```html\n<!-- role — element role -->\n<div role="button" tabindex="0">Click me</div>\n\n<!-- aria-label — text description -->\n<button aria-label="Close modal">✕</button>\n\n<!-- aria-hidden — hide from screen reader -->\n<span aria-hidden="true">🎉</span>\n\n<!-- aria-expanded — expanded state -->\n<button aria-expanded="false">Menu</button>\n\n<!-- aria-live — announce changes -->\n<div aria-live="polite">Loading...</div>\n```\n\n**Rule #1:** use native semantic tags — they\'re already accessible. ARIA is for when native tags aren\'t enough.',
    tags: ['accessibility', 'aria', 'a11y', 'screen-reader'],
    order: 3,
  },
  {
    id: 'html-004',
    difficulty: 'EASY',
    questionRu: 'Зачем нужны meta-теги? Что такое viewport?',
    questionEn: 'What are meta tags for? What is the viewport meta tag?',
    answerRu: '**Meta-теги** — метаданные страницы, невидимые пользователю, но важные для браузеров и поисковиков.\n\n```html\n<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <!-- Кодировка -->\n  <meta charset="UTF-8">\n\n  <!-- Адаптивность — обязательно для мобильных! -->\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n  <!-- SEO -->\n  <meta name="description" content="Описание страницы">\n\n  <!-- Open Graph (превью в соцсетях) -->\n  <meta property="og:title" content="Заголовок">\n  <meta property="og:image" content="/preview.jpg">\n\n  <title>Заголовок вкладки</title>\n</head>\n```\n\n**viewport** без `width=device-width` — страница рендерится в ~980px и масштабируется, что ломает мобильную вёрстку.',
    answerEn: '**Meta tags** — page metadata, invisible to users but important for browsers and search engines.\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <!-- Encoding -->\n  <meta charset="UTF-8">\n\n  <!-- Responsiveness — required for mobile! -->\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n  <!-- SEO -->\n  <meta name="description" content="Page description">\n\n  <!-- Open Graph (social media previews) -->\n  <meta property="og:title" content="Title">\n  <meta property="og:image" content="/preview.jpg">\n\n  <title>Tab title</title>\n</head>\n```\n\n**viewport** without `width=device-width` — page renders at ~980px and scales down, breaking mobile layout.',
    tags: ['meta', 'viewport', 'seo', 'og'],
    order: 4,
  },
];
