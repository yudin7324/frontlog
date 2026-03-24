import type { CardSeed } from './types';

export const cards: CardSeed[] = [
  {
    id: 'css-001',
    difficulty: 'MEDIUM',
    questionRu: 'В чём разница между Flexbox и Grid?',
    questionEn: 'What is the difference between Flexbox and Grid?',
    answerRu: '**Flexbox** — одномерная система (строка или колонка). Лучше для:\n- Навигации\n- Выравнивания элементов по оси\n- Компонентов с переменным числом элементов\n\n**Grid** — двумерная система (строки И колонки). Лучше для:\n- Макетов страниц\n- Сложных сеток\n- Точного позиционирования\n\n```css\n/* Flexbox */\n.flex { display: flex; justify-content: space-between; }\n\n/* Grid */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n```\n\nПравило: Flex для компонентов, Grid для layouts.',
    answerEn: '**Flexbox** — one-dimensional (row or column). Better for:\n- Navigation\n- Aligning items along an axis\n- Components with variable number of items\n\n**Grid** — two-dimensional (rows AND columns). Better for:\n- Page layouts\n- Complex grids\n- Precise placement\n\n```css\n/* Flexbox */\n.flex { display: flex; justify-content: space-between; }\n\n/* Grid */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n```\n\nRule of thumb: Flex for components, Grid for layouts.',
    tags: ['flexbox', 'grid', 'layout'],
    order: 1,
  },
  {
    id: 'css-002',
    difficulty: 'MEDIUM',
    questionRu: 'Что такое CSS specificity (специфичность)?',
    questionEn: 'What is CSS specificity?',
    answerRu: 'Специфичность определяет, какое CSS-правило применяется при конфликте. Считается по весам:\n\n| Селектор | Вес |\n|---|---|\n| `!important` | перебивает всё |\n| inline style | 1-0-0-0 |\n| #id | 0-1-0-0 |\n| .class, [attr], :pseudo-class | 0-0-1-0 |\n| tag, ::pseudo-element | 0-0-0-1 |\n| * | 0-0-0-0 |\n\n```css\n#nav .link { }   /* 0-1-1-0 */\n.nav a.active { } /* 0-0-2-1 */\n\n/* Побеждает #nav .link — у него больше вес */\n```\n\nПри равной специфичности побеждает правило, объявленное позже.',
    answerEn: 'Specificity determines which CSS rule applies when there\'s a conflict. Calculated by weights:\n\n| Selector | Weight |\n|---|---|\n| `!important` | overrides all |\n| inline style | 1-0-0-0 |\n| #id | 0-1-0-0 |\n| .class, [attr], :pseudo-class | 0-0-1-0 |\n| tag, ::pseudo-element | 0-0-0-1 |\n| * | 0-0-0-0 |\n\n```css\n#nav .link { }    /* 0-1-1-0 */\n.nav a.active { }  /* 0-0-2-1 */\n\n/* #nav .link wins — higher weight */\n```\n\nWith equal specificity, the last declared rule wins.',
    tags: ['specificity', 'cascade', 'selectors'],
    order: 2,
  },
  {
    id: 'css-003',
    difficulty: 'EASY',
    questionRu: 'Что такое box model в CSS?',
    questionEn: 'What is the CSS box model?',
    answerRu: 'Box model — модель отображения элемента в браузере. Каждый элемент — прямоугольник из 4 слоёв:\n\n```\n┌─────────────────────┐\n│       margin        │\n│  ┌───────────────┐  │\n│  │    border     │  │\n│  │  ┌─────────┐  │  │\n│  │  │ padding │  │  │\n│  │  │ content │  │  │\n│  │  └─────────┘  │  │\n│  └───────────────┘  │\n└─────────────────────┘\n```\n\n**box-sizing:**\n```css\n/* По умолчанию — width не включает padding и border */\nbox-sizing: content-box;\n\n/* Обычно предпочтительно — width включает всё */\nbox-sizing: border-box;\n```\n\nБольшинство проектов сбрасывают через `* { box-sizing: border-box; }`',
    answerEn: 'The box model describes how elements are rendered in the browser. Every element is a rectangle with 4 layers:\n\n```\n┌─────────────────────┐\n│       margin        │\n│  ┌───────────────┐  │\n│  │    border     │  │\n│  │  ┌─────────┐  │  │\n│  │  │ padding │  │  │\n│  │  │ content │  │  │\n│  │  └─────────┘  │  │\n│  └───────────────┘  │\n└─────────────────────┘\n```\n\n**box-sizing:**\n```css\n/* Default — width excludes padding and border */\nbox-sizing: content-box;\n\n/* Usually preferred — width includes everything */\nbox-sizing: border-box;\n```\n\nMost projects reset with `* { box-sizing: border-box; }`',
    tags: ['box-model', 'padding', 'margin', 'border'],
    order: 3,
  },
  {
    id: 'css-004',
    difficulty: 'HARD',
    questionRu: 'Что такое stacking context в CSS?',
    questionEn: 'What is a stacking context in CSS?',
    answerRu: 'Stacking context — трёхмерная концепция отображения элементов по оси Z. Новый контекст создаётся когда элемент имеет:\n\n- `position` + `z-index` (не auto)\n- `opacity` < 1\n- `transform`, `filter`, `perspective`\n- `isolation: isolate`\n- и другие свойства\n\n**Важно:** z-index работает только внутри своего stacking context!\n\n```css\n.parent { position: relative; z-index: 1; }\n.child  { position: relative; z-index: 999; }\n.other  { position: relative; z-index: 2; }\n\n/* child (999) НЕ перекроет other (2),\n   потому что parent (1) < other (2) */\n```',
    answerEn: 'A stacking context is a three-dimensional rendering concept along the Z axis. A new context is created when an element has:\n\n- `position` + `z-index` (not auto)\n- `opacity` < 1\n- `transform`, `filter`, `perspective`\n- `isolation: isolate`\n- and other properties\n\n**Key point:** z-index only works within its own stacking context!\n\n```css\n.parent { position: relative; z-index: 1; }\n.child  { position: relative; z-index: 999; }\n.other  { position: relative; z-index: 2; }\n\n/* child (999) will NOT overlap other (2),\n   because parent (1) < other (2) */\n```',
    tags: ['stacking-context', 'z-index', 'positioning'],
    order: 4,
  },
];
