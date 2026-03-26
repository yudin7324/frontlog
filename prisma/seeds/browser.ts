import type { CardSeed } from './types';

export const cards: CardSeed[] = [
  {
    id: 'browser-001',
    difficulty: 'MEDIUM',
    order: 1,
    tags: ['rendering'],
    questionRu: 'Что происходит когда браузер получает HTML?',
    questionEn: 'What happens when the browser receives HTML?',
    answerRu: `Браузер парсит HTML → строит **DOM**.

Встречает CSS → загружает и строит **CSSOM**.

**DOM** + **CSSOM** → **Render Tree** (только видимые элементы).

- **Layout** — вычисляет размеры и позиции
- **Paint** — рисует пиксели
- **Composite** — собирает слои

Скрипты без \`defer\`/\`async\` блокируют парсинг HTML.`,
    answerEn: `The browser parses HTML → builds the **DOM**.

Encounters CSS → loads and builds the **CSSOM**.

**DOM** + **CSSOM** → **Render Tree** (visible elements only).

- **Layout** — calculates sizes and positions
- **Paint** — draws pixels
- **Composite** — assembles layers

Scripts without \`defer\`/\`async\` block HTML parsing.`,
  },
  {
    id: 'browser-002',
    difficulty: 'EASY',
    order: 2,
    tags: ['rendering'],
    questionRu: 'Что такое DOM и CSSOM?',
    questionEn: 'What are the DOM and CSSOM?',
    answerRu: `**DOM** (Document Object Model) — древовидное представление HTML в памяти, API для JS.

**CSSOM** (CSS Object Model) — аналогичное дерево для CSS со всеми стилями, включая унаследованные.

Браузер не может построить **Render Tree** пока не готовы оба — CSS блокирует рендеринг.`,
    answerEn: `**DOM** (Document Object Model) — an in-memory tree representation of HTML, used as an API for JS.

**CSSOM** (CSS Object Model) — a similar tree for CSS with all styles including inherited ones.

The browser cannot build the **Render Tree** until both are ready — CSS blocks rendering.`,
  },
  {
    id: 'browser-003',
    difficulty: 'MEDIUM',
    order: 3,
    tags: ['rendering'],
    questionRu: 'Почему CSS блокирует рендеринг, а JS блокирует парсинг?',
    questionEn: 'Why does CSS block rendering while JS blocks parsing?',
    answerRu: `**CSS блокирует рендеринг**: браузер не строит **Render Tree** без **CSSOM**, чтобы не показывать **FOUC**.

**JS блокирует парсинг**: скрипт может изменить **DOM** и **CSSOM**, поэтому браузер останавливается, загружает и выполняет JS.

\`defer\`/\`async\` снимают блокировку парсинга.`,
    answerEn: `**CSS blocks rendering**: the browser will not build the **Render Tree** without the **CSSOM**, to avoid showing **FOUC**.

**JS blocks parsing**: a script may modify the **DOM** and **CSSOM**, so the browser stops, downloads, and executes JS.

\`defer\`/\`async\` remove the parsing block.`,
  },
  {
    id: 'browser-004',
    difficulty: 'MEDIUM',
    order: 4,
    tags: ['rendering'],
    questionRu: 'Что такое render-blocking ресурсы и как с ними бороться?',
    questionEn: 'What are render-blocking resources and how do you deal with them?',
    answerRu: `**Render-blocking** ресурсы: CSS в \`<head>\`, синхронный JS.

Решения для CSS:
- inline **critical CSS**
- \`media\` queries (print CSS не блокирует)

Для JS:
- \`defer\`, \`async\`
- перенос в конец \`body\`

Также: \`preload\` для приоритетных ресурсов, **HTTP/2** для параллельной загрузки.`,
    answerEn: `**Render-blocking** resources: CSS in \`<head>\`, synchronous JS.

Solutions for CSS:
- inline **critical CSS**
- \`media\` queries (print CSS does not block)

For JS:
- \`defer\`, \`async\`
- moving to the end of \`body\`

Also: \`preload\` for high-priority resources, **HTTP/2** for parallel loading.`,
  },
  {
    id: 'browser-005',
    difficulty: 'MEDIUM',
    order: 5,
    tags: ['rendering'],
    questionRu: 'Что такое critical CSS?',
    questionEn: 'What is critical CSS?',
    answerRu: `**Critical CSS** — минимальный набор стилей для отрисовки видимой части страницы (**above the fold**).

Инлайнится в \`<style>\` в \`<head>\` для мгновенного рендера без ожидания загрузки CSS-файла.

Остальные стили загружаются асинхронно.

Улучшает **FCP** и **LCP**.`,
    answerEn: `**Critical CSS** — the minimal set of styles needed to render the visible part of the page (**above the fold**).

It is inlined in a \`<style>\` tag in \`<head>\` for instant rendering without waiting for the CSS file to load.

The remaining styles are loaded asynchronously.

Improves **FCP** and **LCP**.`,
  },
  {
    id: 'browser-006',
    difficulty: 'MEDIUM',
    order: 6,
    tags: ['rendering'],
    questionRu: 'Что такое preload, prefetch и preconnect?',
    questionEn: 'What are preload, prefetch, and preconnect?',
    answerRu: `- \`preload\` (\`<link rel="preload">\`): загрузить ресурс с **высоким приоритетом** для текущей страницы — шрифты, критичные скрипты
- \`prefetch\`: загрузить с **низким приоритетом** для следующей навигации
- \`preconnect\`: заранее установить TCP/TLS соединение с доменом
- \`dns-prefetch\`: только DNS-резолюция`,
    answerEn: `- \`preload\` (\`<link rel="preload">\`): load a resource with **high priority** for the current page — fonts, critical scripts
- \`prefetch\`: load with **low priority** for the next navigation
- \`preconnect\`: establish a TCP/TLS connection to a domain in advance
- \`dns-prefetch\`: DNS resolution only`,
  },
  {
    id: 'browser-007',
    difficulty: 'MEDIUM',
    order: 7,
    tags: ['rendering'],
    questionRu: 'Что такое Core Web Vitals?',
    questionEn: 'What are Core Web Vitals?',
    answerRu: `**Core Web Vitals** — метрики Google для оценки UX.

- **LCP** (Largest Contentful Paint): загрузка главного контента, цель < 2.5s
- **FID** (First Input Delay) / **INP** (Interaction to Next Paint): отзывчивость, цель < 200ms
- **CLS** (Cumulative Layout Shift): стабильность layout, цель < 0.1

Влияют на поисковый рейтинг.`,
    answerEn: `**Core Web Vitals** — Google metrics for evaluating UX.

- **LCP** (Largest Contentful Paint): main content load time, target < 2.5s
- **FID** (First Input Delay) / **INP** (Interaction to Next Paint): responsiveness, target < 200ms
- **CLS** (Cumulative Layout Shift): layout stability, target < 0.1

They affect search rankings.`,
  },
  {
    id: 'browser-008',
    difficulty: 'MEDIUM',
    order: 8,
    tags: ['reflow'],
    questionRu: 'В чём разница между reflow и repaint?',
    questionEn: 'What is the difference between reflow and repaint?',
    answerRu: `**Reflow** (layout): пересчёт геометрии элементов — размеров и позиций. Дорогая операция, затрагивает соседей и родителей.

Триггеры reflow: изменение \`width\`, \`height\`, \`margin\`, \`font-size\`, добавление/удаление элементов.

**Repaint**: перерисовка пикселей без изменения геометрии.

Триггеры repaint: \`color\`, \`background\`, \`visibility\`.

**Reflow** всегда вызывает **repaint**.`,
    answerEn: `**Reflow** (layout): recalculates element geometry — sizes and positions. An expensive operation that affects siblings and parents.

Reflow triggers: changing \`width\`, \`height\`, \`margin\`, \`font-size\`, adding/removing elements.

**Repaint**: redraws pixels without changing geometry.

Repaint triggers: \`color\`, \`background\`, \`visibility\`.

**Reflow** always causes a **repaint**.`,
  },
  {
    id: 'browser-009',
    difficulty: 'HARD',
    order: 9,
    tags: ['reflow'],
    questionRu: 'Что такое композитинг (compositing)?',
    questionEn: 'What is compositing?',
    answerRu: `**Compositing** — финальный этап: браузер собирает **слои** (layers) в итоговое изображение на GPU.

Элементы, выносимые в отдельный compositor layer:
- \`transform\`
- \`opacity\`
- \`will-change\`
- \`video\`, \`canvas\`

Анимации \`transform\`/\`opacity\` происходят только на этапе compositing — не вызывают **reflow**/**repaint**.`,
    answerEn: `**Compositing** — the final stage: the browser assembles **layers** into the final image on the GPU.

Elements promoted to their own compositor layer:
- \`transform\`
- \`opacity\`
- \`will-change\`
- \`video\`, \`canvas\`

Animations of \`transform\`/\`opacity\` happen only at the compositing stage — they do not trigger **reflow** or **repaint**.`,
  },
  {
    id: 'browser-010',
    difficulty: 'MEDIUM',
    order: 10,
    tags: ['reflow'],
    questionRu: 'Как минимизировать reflow?',
    questionEn: 'How do you minimize reflow?',
    answerRu: `- Батчить DOM-изменения: читать геометрию отдельно от записи (избегать **layout thrashing**)
- Использовать \`DocumentFragment\`
- Скрывать элемент через \`display:none\` перед множественными изменениями
- Использовать \`transform\` вместо \`top\`/\`left\`
- \`requestAnimationFrame\` для визуальных изменений
- Избегать чтение \`offsetWidth\` в цикле`,
    answerEn: `- Batch DOM changes: separate reads from writes (avoid **layout thrashing**)
- Use \`DocumentFragment\`
- Hide the element with \`display:none\` before making multiple changes
- Use \`transform\` instead of \`top\`/\`left\`
- Use \`requestAnimationFrame\` for visual changes
- Avoid reading \`offsetWidth\` inside a loop`,
  },
  {
    id: 'browser-011',
    difficulty: 'HARD',
    order: 11,
    tags: ['reflow'],
    questionRu: 'Что такое layout thrashing?',
    questionEn: 'What is layout thrashing?',
    answerRu: `**Layout thrashing** — чередование чтения и записи DOM-геометрии в цикле.

Пример: \`el.style.width = el.offsetWidth + 'px'\` в цикле заставляет браузер делать **reflow** на каждой итерации.

**Решение**: сначала прочитать все значения, потом записать все изменения.

Библиотека **FastDOM** помогает батчить операции.`,
    answerEn: `**Layout thrashing** — alternating reads and writes of DOM geometry in a loop.

Example: \`el.style.width = el.offsetWidth + 'px'\` inside a loop forces the browser to **reflow** on every iteration.

**Solution**: read all values first, then write all changes.

The **FastDOM** library helps batch these operations.`,
  },
  {
    id: 'browser-012',
    difficulty: 'HARD',
    order: 12,
    tags: ['reflow'],
    questionRu: 'Что такое paint flashing и как его обнаружить?',
    questionEn: 'What is paint flashing and how do you detect it?',
    answerRu: `**Paint flashing** — визуальная индикация областей, которые браузер перерисовывает.

Включается в **Chrome DevTools**: Rendering → Paint flashing.

Зелёные вспышки = **repaint**.

Частые перерисовки больших областей — признак проблемы с производительностью.

Цель: минимизировать перерисовываемые области.`,
    answerEn: `**Paint flashing** — a visual indicator of the areas the browser is repainting.

Enabled in **Chrome DevTools**: Rendering → Paint flashing.

Green flashes = **repaint**.

Frequent repaints of large areas indicate a performance problem.

The goal is to minimize the repainted areas.`,
  },
  {
    id: 'browser-013',
    difficulty: 'MEDIUM',
    order: 13,
    tags: ['reflow'],
    questionRu: 'Как работает requestAnimationFrame?',
    questionEn: 'How does requestAnimationFrame work?',
    answerRu: `\`requestAnimationFrame(callback)\` вызывает callback перед следующим рендером браузера (~60fps).

Синхронизирован с частотой обновления дисплея.

Преимущества над \`setTimeout\`:
- не вызывается в фоновых вкладках (экономит CPU)
- точно приурочен к циклу рендера
- автоматически батчит визуальные обновления`,
    answerEn: `\`requestAnimationFrame(callback)\` calls the callback just before the next browser render (~60fps).

Synchronized with the display refresh rate.

Advantages over \`setTimeout\`:
- not called in background tabs (saves CPU)
- precisely timed to the render cycle
- automatically batches visual updates`,
  },
  {
    id: 'browser-014',
    difficulty: 'MEDIUM',
    order: 14,
    tags: ['web-apis'],
    questionRu: 'Что такое IntersectionObserver и как использовать?',
    questionEn: 'What is IntersectionObserver and how do you use it?',
    answerRu: `\`IntersectionObserver\` отслеживает пересечение элемента с viewport или другим элементом.

\`new IntersectionObserver(callback, { threshold: 0.5 })\` — вызов при 50% видимости.

Применения:
- ленивая загрузка изображений
- бесконечный скролл
- анимации при появлении

Эффективнее \`scroll\`-событий — не блокирует **main thread**.`,
    answerEn: `\`IntersectionObserver\` tracks the intersection of an element with the viewport or another element.

\`new IntersectionObserver(callback, { threshold: 0.5 })\` — fires at 50% visibility.

Use cases:
- lazy loading images
- infinite scroll
- entrance animations

More efficient than \`scroll\` events — does not block the **main thread**.`,
  },
  {
    id: 'browser-015',
    difficulty: 'MEDIUM',
    order: 15,
    tags: ['web-apis'],
    questionRu: 'Что такое MutationObserver?',
    questionEn: 'What is MutationObserver?',
    answerRu: `\`MutationObserver\` отслеживает изменения в DOM-дереве: добавление/удаление узлов, изменения атрибутов и текста.

Асинхронный — использует **микрозадачи**, не блокирует.

Применения:
- отслеживание изменений сторонних скриптов
- полифилы
- автоматизация

Эффективнее устаревших **mutation events**.`,
    answerEn: `\`MutationObserver\` tracks changes in the DOM tree: node additions/removals, attribute and text changes.

Asynchronous — uses **microtasks**, does not block.

Use cases:
- monitoring third-party script changes
- polyfills
- automation

More efficient than the deprecated **mutation events**.`,
  },
  {
    id: 'browser-016',
    difficulty: 'MEDIUM',
    order: 16,
    tags: ['web-apis'],
    questionRu: 'Что такое ResizeObserver?',
    questionEn: 'What is ResizeObserver?',
    answerRu: `\`ResizeObserver\` отслеживает изменения размеров элемента.

В отличие от \`window resize\` event — работает для любого элемента, не только окна.

Применения:
- адаптивные компоненты (container queries вручную)
- \`canvas\` с динамическим размером
- виртуализация

Не вызывает **reflow** при чтении размеров.`,
    answerEn: `\`ResizeObserver\` tracks size changes of an element.

Unlike the \`window resize\` event — it works for any element, not just the window.

Use cases:
- responsive components (manual container queries)
- dynamically sized \`canvas\`
- virtualization

Does not trigger **reflow** when reading sizes.`,
  },
  {
    id: 'browser-017',
    difficulty: 'MEDIUM',
    order: 17,
    tags: ['web-apis'],
    questionRu: 'Что такое Web Workers и когда использовать?',
    questionEn: 'What are Web Workers and when should you use them?',
    answerRu: `**Web Workers** — отдельные потоки для тяжёлых вычислений без блокировки **main thread**.

Общение через \`postMessage\`/\`onmessage\`. Нет доступа к **DOM**.

Типы:
- **Dedicated Worker** — один потребитель
- **Shared Worker** — несколько вкладок
- **Service Worker** — перехват сетевых запросов

Для: парсинга, шифрования, обработки данных.`,
    answerEn: `**Web Workers** — separate threads for heavy computations without blocking the **main thread**.

Communication via \`postMessage\`/\`onmessage\`. No **DOM** access.

Types:
- **Dedicated Worker** — single consumer
- **Shared Worker** — multiple tabs
- **Service Worker** — network request interception

Use for: parsing, encryption, data processing.`,
  },
  {
    id: 'browser-018',
    difficulty: 'MEDIUM',
    order: 18,
    tags: ['web-apis'],
    questionRu: 'Что такое Service Worker?',
    questionEn: 'What is a Service Worker?',
    answerRu: `**Service Worker** — скрипт в фоновом потоке, перехватывающий сетевые запросы. Основа **PWA**.

Возможности:
- офлайн-работа через **Cache API**
- push-уведомления
- фоновая синхронизация

Жизненный цикл: \`install\` → \`activate\` → \`fetch\`.

Работает только по **HTTPS** (кроме \`localhost\`).`,
    answerEn: `A **Service Worker** is a script running in a background thread that intercepts network requests. It is the foundation of **PWAs**.

Capabilities:
- offline support via **Cache API**
- push notifications
- background sync

Lifecycle: \`install\` → \`activate\` → \`fetch\`.

Works only over **HTTPS** (except \`localhost\`).`,
  },
  {
    id: 'browser-019',
    difficulty: 'MEDIUM',
    order: 19,
    tags: ['web-apis'],
    questionRu: 'Что такое WebSocket и когда использовать?',
    questionEn: 'What is WebSocket and when should you use it?',
    answerRu: `**WebSocket** — протокол для двусторонней связи клиент-сервер в реальном времени по одному соединению.

В отличие от HTTP: сервер может инициировать отправку данных.

Применения:
- чат
- live-обновления
- онлайн-игры
- совместное редактирование

Альтернативы: **SSE** (только сервер → клиент), **long polling**.`,
    answerEn: `**WebSocket** — a protocol for real-time bidirectional client-server communication over a single connection.

Unlike HTTP: the server can initiate data delivery.

Use cases:
- chat
- live updates
- online games
- collaborative editing

Alternatives: **SSE** (server → client only), **long polling**.`,
  },
  {
    id: 'browser-020',
    difficulty: 'MEDIUM',
    order: 20,
    tags: ['web-apis'],
    questionRu: 'Что такое History API и как работает SPA-роутинг?',
    questionEn: 'What is the History API and how does SPA routing work?',
    answerRu: `**History API**: \`pushState\`, \`replaceState\` — изменяют URL без перезагрузки страницы.

Событие \`popstate\` — при нажатии назад/вперёд.

**SPA-роутинг**: перехватывает клики по ссылкам, вызывает \`pushState\`, рендерит нужный компонент.

Сервер должен отдавать \`index.html\` для всех маршрутов.`,
    answerEn: `**History API**: \`pushState\`, \`replaceState\` — change the URL without reloading the page.

The \`popstate\` event fires on back/forward navigation.

**SPA routing**: intercepts link clicks, calls \`pushState\`, renders the appropriate component.

The server must serve \`index.html\` for all routes.`,
  },
  {
    id: 'browser-021',
    difficulty: 'EASY',
    order: 21,
    tags: ['storage'],
    questionRu: 'В чём разница между localStorage, sessionStorage и cookies?',
    questionEn: 'What is the difference between localStorage, sessionStorage, and cookies?',
    answerRu: `- \`localStorage\`: до 5–10MB, постоянное, только клиент, один origin
- \`sessionStorage\`: то же, но очищается при закрытии вкладки
- **Cookies**: до 4KB, отправляются с каждым запросом на сервер, управляются сервером, поддерживают \`httpOnly\`/\`secure\`/\`SameSite\`

Для сессий и авторизации — **cookies**. Для UI-настроек — \`localStorage\`.`,
    answerEn: `- \`localStorage\`: up to 5–10MB, persistent, client-only, same origin
- \`sessionStorage\`: the same, but cleared when the tab is closed
- **Cookies**: up to 4KB, sent with every request to the server, managed by the server, support \`httpOnly\`/\`secure\`/\`SameSite\`

Use **cookies** for sessions and auth. Use \`localStorage\` for UI preferences.`,
  },
  {
    id: 'browser-022',
    difficulty: 'MEDIUM',
    order: 22,
    tags: ['storage'],
    questionRu: 'Что такое IndexedDB?',
    questionEn: 'What is IndexedDB?',
    answerRu: `**IndexedDB** — низкоуровневая **NoSQL** база данных в браузере.

Хранит большие объёмы структурированных данных (сотни MB), поддерживает транзакции, индексы, бинарные данные.

Асинхронный API. Используется в **PWA** для офлайн-данных.

Обёртки для удобства: \`idb\`, \`Dexie.js\`.`,
    answerEn: `**IndexedDB** — a low-level **NoSQL** database in the browser.

Stores large amounts of structured data (hundreds of MB), supports transactions, indexes, and binary data.

Asynchronous API. Used in **PWAs** for offline data.

Convenience wrappers: \`idb\`, \`Dexie.js\`.`,
  },
  {
    id: 'browser-023',
    difficulty: 'MEDIUM',
    order: 23,
    tags: ['storage'],
    questionRu: 'Как работает HTTP-кеширование?',
    questionEn: 'How does HTTP caching work?',
    answerRu: `- \`Cache-Control: max-age=3600\` — кешировать на 1 час
- \`no-cache\` — всегда валидировать с сервером
- \`no-store\` — не кешировать

**Условные запросы**: \`ETag\` и \`Last-Modified\` — браузер отправляет \`If-None-Match\`, сервер отвечает \`304 Not Modified\` если не изменилось.

\`immutable\` — для неизменяемых ресурсов.`,
    answerEn: `- \`Cache-Control: max-age=3600\` — cache for 1 hour
- \`no-cache\` — always revalidate with the server
- \`no-store\` — do not cache

**Conditional requests**: \`ETag\` and \`Last-Modified\` — the browser sends \`If-None-Match\`, the server responds with \`304 Not Modified\` if unchanged.

\`immutable\` — for versioned/unchanging resources.`,
  },
  {
    id: 'browser-024',
    difficulty: 'HARD',
    order: 24,
    tags: ['storage'],
    questionRu: 'Что такое Cache API и как использовать с Service Worker?',
    questionEn: 'What is the Cache API and how do you use it with a Service Worker?',
    answerRu: `**Cache API** — хранилище пар запрос/ответ для офлайн-работы.

Используется в **Service Worker**: \`cache.put(request, response)\`, \`cache.match(request)\`.

Стратегии:
- **Cache First** — офлайн
- **Network First** — актуальность
- **Stale While Revalidate** — скорость + свежесть

**Workbox** автоматизирует стратегии.`,
    answerEn: `**Cache API** — a store of request/response pairs for offline support.

Used in a **Service Worker**: \`cache.put(request, response)\`, \`cache.match(request)\`.

Strategies:
- **Cache First** — offline
- **Network First** — freshness
- **Stale While Revalidate** — speed + freshness

**Workbox** automates these strategies.`,
  },
  {
    id: 'browser-025',
    difficulty: 'HARD',
    order: 25,
    tags: ['storage'],
    questionRu: 'Что такое мемоизация на уровне браузера (bfcache)?',
    questionEn: 'What is the browser-level back/forward cache (bfcache)?',
    answerRu: `**bfcache** (back/forward cache) — браузер сохраняет полный снимок страницы в памяти при навигации. При нажатии назад — мгновенное восстановление без повторной загрузки.

Страница не подходит для **bfcache** если:
- открытое **WebSocket**-соединение
- \`Cache-Control: no-store\`
- обработчик \`unload\`

Проверка в **DevTools** → Application.`,
    answerEn: `**bfcache** (back/forward cache) — the browser saves a full snapshot of the page in memory during navigation. Pressing back instantly restores it without a reload.

A page is ineligible for **bfcache** if:
- it has an open **WebSocket** connection
- \`Cache-Control: no-store\`
- an \`unload\` event handler

Inspect eligibility in **DevTools** → Application.`,
  },
];
