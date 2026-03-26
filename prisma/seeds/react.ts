import type { CardSeed } from './types';

export const cards: CardSeed[] = [
  {
    id: 'react-001',
    difficulty: 'EASY',
    order: 1,
    tags: ['basics'],
    questionRu: 'Что такое React и в чём его ключевая идея?',
    questionEn: 'What is React and what is its core idea?',
    answerRu: `**React** — библиотека для построения UI на основе **компонентов**.

Ключевые идеи:
- **Декларативность** — описываешь что отрендерить, не как
- **Компонентный подход**
- **Однонаправленный поток данных**

**Virtual DOM** минимизирует реальные DOM-операции через **reconciliation**.`,
    answerEn: `**React** is a library for building UI based on **components**.

Core ideas:
- **Declarativeness** — you describe what to render, not how
- **Component-based approach**
- **One-way data flow**

The **Virtual DOM** minimizes real DOM operations through **reconciliation**.`,
  },
  {
    id: 'react-002',
    difficulty: 'EASY',
    order: 2,
    tags: ['basics'],
    questionRu: 'Что такое JSX и во что он компилируется?',
    questionEn: 'What is JSX and what does it compile to?',
    answerRu: '**JSX** — синтаксическое расширение JS, позволяет писать HTML-подобный код в JS.\n\nКомпилируется в `React.createElement(type, props, ...children)`.\n\nС React 17+ через новый JSX transform — в `_jsx` из `react/jsx-runtime`, без необходимости импортировать `React`.',
    answerEn: '**JSX** is a syntax extension for JS that allows writing HTML-like code in JS.\n\nIt compiles to `React.createElement(type, props, ...children)`.\n\nWith React 17+ via the new JSX transform — to `_jsx` from `react/jsx-runtime`, without needing to import `React`.',
  },
  {
    id: 'react-003',
    difficulty: 'EASY',
    order: 3,
    tags: ['basics'],
    questionRu: 'В чём разница между props и state?',
    questionEn: 'What is the difference between props and state?',
    answerRu: `**props** — данные, переданные извне компонента (только для чтения).

**state** — внутреннее состояние компонента, управляемое им самим. Изменение \`state\` вызывает ре-рендер.

\`props\` нельзя изменять внутри компонента — это нарушение **однонаправленного потока данных**.`,
    answerEn: `**props** are data passed from outside the component (read-only).

**state** is the internal state of the component, managed by itself. Changing \`state\` triggers a re-render.

\`props\` cannot be modified inside the component — that would violate **one-way data flow**.`,
  },
  {
    id: 'react-004',
    difficulty: 'MEDIUM',
    order: 4,
    tags: ['basics'],
    questionRu: 'Что такое controlled и uncontrolled компоненты?',
    questionEn: 'What are controlled and uncontrolled components?',
    answerRu: `**Controlled** — значение формы управляется React \`state\` через \`value\` + \`onChange\`. Данные всегда в sync с состоянием.

**Uncontrolled** — данные хранятся в DOM, доступны через \`ref\`.

Controlled предпочтительны — предсказуемы, легче валидировать. Uncontrolled используются для \`file input\` и интеграции с не-React кодом.`,
    answerEn: `**Controlled** — the form value is managed by React \`state\` via \`value\` + \`onChange\`. Data is always in sync with state.

**Uncontrolled** — data is stored in the DOM and accessed via \`ref\`.

Controlled components are preferred — they are predictable and easier to validate. Uncontrolled components are used for \`file input\` and integration with non-React code.`,
  },
  {
    id: 'react-005',
    difficulty: 'MEDIUM',
    order: 5,
    tags: ['basics'],
    questionRu: 'Зачем нужен key в списках и как правильно его выбирать?',
    questionEn: 'Why is the key prop needed in lists and how should it be chosen?',
    answerRu: `\`key\` помогает React идентифицировать элементы при **reconciliation** — понять что изменилось, добавилось или удалилось.

Должен быть уникальным среди siblings и **стабильным**.

Нельзя использовать \`index\` если порядок может меняться — это ломает \`state\` и анимации.

Лучший \`key\` — \`id\` из данных.`,
    answerEn: `\`key\` helps React identify elements during **reconciliation** — to understand what changed, was added, or was removed.

It must be unique among siblings and **stable**.

Using the \`index\` as a key when the order can change will break \`state\` and animations.

The best \`key\` is an \`id\` from the data.`,
  },
  {
    id: 'react-006',
    difficulty: 'EASY',
    order: 6,
    tags: ['basics'],
    questionRu: 'Что такое React.Fragment и зачем нужен?',
    questionEn: 'What is React.Fragment and why is it needed?',
    answerRu: `\`React.Fragment\` позволяет возвращать несколько элементов без лишнего DOM-узла.

Синтаксис: \`<React.Fragment>\` или сокращённо \`<>...</>\`.

Полная форма нужна когда требуется \`key\`: \`<React.Fragment key={id}>\`.

Помогает избежать лишних \`div\` в разметке.`,
    answerEn: `\`React.Fragment\` allows returning multiple elements without an extra DOM node.

Syntax: \`<React.Fragment>\` or the shorthand \`<>...</>\`.

The full form is needed when a \`key\` is required: \`<React.Fragment key={id}>\`.

It helps avoid unnecessary \`div\` wrappers in the markup.`,
  },
  {
    id: 'react-007',
    difficulty: 'MEDIUM',
    order: 7,
    tags: ['basics'],
    questionRu: 'Что такое React reconciliation и Virtual DOM?',
    questionEn: 'What is React reconciliation and the Virtual DOM?',
    answerRu: `**Virtual DOM** — лёгкое JS-представление реального DOM.

При изменении \`state\` React строит новый VDOM и сравнивает с предыдущим (**diffing**).

Алгоритм **reconciliation** находит минимальный набор изменений и применяет их к реальному DOM.

Ключи (\`key\`) помогают алгоритму работать корректно.`,
    answerEn: `The **Virtual DOM** is a lightweight JS representation of the real DOM.

When \`state\` changes, React builds a new VDOM and compares it with the previous one (**diffing**).

The **reconciliation** algorithm finds the minimal set of changes and applies them to the real DOM.

Keys (\`key\`) help the algorithm work correctly.`,
  },
  {
    id: 'react-008',
    difficulty: 'MEDIUM',
    order: 8,
    tags: ['hooks'],
    questionRu: 'Что такое хуки и какие правила их использования?',
    questionEn: 'What are hooks and what are the rules for using them?',
    answerRu: `**Хуки** — функции для использования \`state\` и других возможностей React в функциональных компонентах.

Правила:
- Вызывать только на **верхнем уровне** — не в условиях, циклах, вложенных функциях
- Вызывать только в **React-компонентах** или **кастомных хуках**

Порядок вызовов должен быть **стабильным**.`,
    answerEn: `**Hooks** are functions that let you use \`state\` and other React features in functional components.

Rules:
- Only call hooks at the **top level** — not inside conditions, loops, or nested functions
- Only call hooks in **React components** or **custom hooks**

The order of hook calls must be **stable**.`,
  },
  {
    id: 'react-009',
    difficulty: 'EASY',
    order: 9,
    tags: ['hooks'],
    questionRu: 'Как работает useState?',
    questionEn: 'How does useState work?',
    answerRu: `\`useState(initialValue)\` возвращает \`[value, setter]\`.

\`setter\` вызывает ре-рендер. Обновления **батчатся** (с React 18 — всегда, включая async).

Для обновления на основе предыдущего значения: \`setState(prev => prev + 1)\`.

Начальное значение вычисляется только при **первом рендере**.`,
    answerEn: `\`useState(initialValue)\` returns \`[value, setter]\`.

The \`setter\` triggers a re-render. Updates are **batched** (with React 18 — always, including async).

To update based on the previous value: \`setState(prev => prev + 1)\`.

The initial value is only computed on the **first render**.`,
  },
  {
    id: 'react-010',
    difficulty: 'MEDIUM',
    order: 10,
    tags: ['hooks'],
    questionRu: 'Как работает useEffect и каков его жизненный цикл?',
    questionEn: 'How does useEffect work and what is its lifecycle?',
    answerRu: `\`useEffect(fn, deps)\` запускает эффект после рендера.

- Без \`deps\` — после каждого рендера
- \`[]\` — только после mount
- \`[dep]\` — при изменении \`dep\`

Возвращаемая функция — **cleanup** (аналог \`componentWillUnmount\`).

Порядок: рендер → обновление DOM → cleanup предыдущего эффекта → новый эффект.`,
    answerEn: `\`useEffect(fn, deps)\` runs the effect after a render.

- No \`deps\` — after every render
- \`[]\` — only after mount
- \`[dep]\` — when \`dep\` changes

The returned function is the **cleanup** (equivalent to \`componentWillUnmount\`).

Order: render → DOM update → cleanup of previous effect → new effect.`,
  },
  {
    id: 'react-011',
    difficulty: 'MEDIUM',
    order: 11,
    tags: ['hooks'],
    questionRu: 'В чём разница между useEffect и useLayoutEffect?',
    questionEn: 'What is the difference between useEffect and useLayoutEffect?',
    answerRu: `\`useEffect\` — **асинхронный**, запускается после того как браузер отрисовал изменения.

\`useLayoutEffect\` — **синхронный**, запускается после DOM-мутаций но до отрисовки браузером.

\`useLayoutEffect\` используется для:
- Измерения DOM
- Предотвращения мерцания

По умолчанию использовать \`useEffect\`.`,
    answerEn: `\`useEffect\` — **asynchronous**, runs after the browser has painted the changes.

\`useLayoutEffect\` — **synchronous**, runs after DOM mutations but before the browser paints.

\`useLayoutEffect\` is used for:
- Measuring the DOM
- Preventing flicker

Use \`useEffect\` by default.`,
  },
  {
    id: 'react-012',
    difficulty: 'MEDIUM',
    order: 12,
    tags: ['hooks'],
    questionRu: 'Как работает useRef?',
    questionEn: 'How does useRef work?',
    answerRu: `\`useRef\` возвращает мутируемый объект \`{ current: value }\`.

Два применения:
- Доступ к DOM-элементу: \`ref={myRef}\`, затем \`myRef.current\`
- Хранение изменяемого значения между рендерами без вызова ре-рендера (аналог instance variable)

Изменение \`.current\` **не вызывает ре-рендер**.`,
    answerEn: `\`useRef\` returns a mutable object \`{ current: value }\`.

Two use cases:
- Accessing a DOM element: \`ref={myRef}\`, then \`myRef.current\`
- Storing a mutable value between renders without triggering a re-render (similar to an instance variable)

Changing \`.current\` **does not cause a re-render**.`,
  },
  {
    id: 'react-013',
    difficulty: 'MEDIUM',
    order: 13,
    tags: ['hooks'],
    questionRu: 'Как работает useContext?',
    questionEn: 'How does useContext work?',
    answerRu: `\`useContext(MyContext)\` возвращает текущее значение контекста.

Компонент ре-рендерится при **каждом изменении** значения контекста.

Контекст создаётся через \`createContext(defaultValue)\`. Provider оборачивает дерево: \`<MyContext.Provider value={...}>\`.

Не заменяет state-менеджер для **частых обновлений**.`,
    answerEn: `\`useContext(MyContext)\` returns the current context value.

The component re-renders on **every context value change**.

Context is created via \`createContext(defaultValue)\`. The Provider wraps the tree: \`<MyContext.Provider value={...}>\`.

It is not a replacement for a state manager when updates are **frequent**.`,
  },
  {
    id: 'react-014',
    difficulty: 'MEDIUM',
    order: 14,
    tags: ['hooks'],
    questionRu: 'Как работает useReducer и когда предпочесть его useState?',
    questionEn: 'How does useReducer work and when should it be preferred over useState?',
    answerRu: `\`useReducer(reducer, initialState)\` возвращает \`[state, dispatch]\`.

\`reducer(state, action) => newState\`

Предпочесть \`useReducer\` когда:
- Сложная логика с несколькими sub-values
- Следующий \`state\` зависит от предыдущего
- Несколько связанных полей обновляются вместе`,
    answerEn: `\`useReducer(reducer, initialState)\` returns \`[state, dispatch]\`.

\`reducer(state, action) => newState\`

Prefer \`useReducer\` when:
- The logic is complex with multiple sub-values
- The next \`state\` depends on the previous one
- Several related fields are updated together`,
  },
  {
    id: 'react-015',
    difficulty: 'MEDIUM',
    order: 15,
    tags: ['hooks'],
    questionRu: 'Что такое useMemo и useCallback?',
    questionEn: 'What are useMemo and useCallback?',
    answerRu: `\`useMemo(fn, deps)\` **мемоизирует результат вычисления** — пересчитывает только при изменении \`deps\`.

\`useCallback(fn, deps)\` **мемоизирует функцию** — возвращает ту же ссылку при неизменных \`deps\`.

Оба для **оптимизации**: предотвращают лишние вычисления и ре-рендеры дочерних компонентов.`,
    answerEn: `\`useMemo(fn, deps)\` **memoizes the result of a computation** — it only recalculates when \`deps\` change.

\`useCallback(fn, deps)\` **memoizes a function** — it returns the same reference when \`deps\` are unchanged.

Both are for **optimization**: they prevent unnecessary computations and re-renders of child components.`,
  },
  {
    id: 'react-016',
    difficulty: 'MEDIUM',
    order: 16,
    tags: ['hooks'],
    questionRu: 'Что такое кастомный хук и как его создать?',
    questionEn: 'What is a custom hook and how do you create one?',
    answerRu: `**Кастомный хук** — функция с именем начинающимся на \`use\`, которая может использовать другие хуки.

Позволяет выносить и переиспользовать логику с состоянием.

Примеры: \`useFetch\`, \`useLocalStorage\`, \`useDebounce\`.

Не шарит \`state\` между компонентами — каждый вызов создаёт **изолированный state**.`,
    answerEn: `A **custom hook** is a function whose name starts with \`use\`, which can call other hooks.

It allows extracting and reusing stateful logic.

Examples: \`useFetch\`, \`useLocalStorage\`, \`useDebounce\`.

It does not share \`state\` between components — each call creates **isolated state**.`,
  },
  {
    id: 'react-017',
    difficulty: 'MEDIUM',
    order: 17,
    tags: ['hooks'],
    questionRu: 'Что такое useId и когда использовать?',
    questionEn: 'What is useId and when should it be used?',
    answerRu: `\`useId\` (React 18) генерирует **уникальный стабильный ID**, одинаковый на сервере и клиенте — решает проблему **гидрации**.

Использовать для:
- Связи \`label\` и \`input\` через \`htmlFor\`
- \`aria\`-атрибутов

Не использовать для \`key\` в списках.`,
    answerEn: `\`useId\` (React 18) generates a **unique stable ID** that is the same on the server and client — it solves the **hydration** mismatch problem.

Use it for:
- Linking \`label\` and \`input\` via \`htmlFor\`
- \`aria\` attributes

Do not use it for list \`key\`s.`,
  },
  {
    id: 'react-018',
    difficulty: 'HARD',
    order: 18,
    tags: ['hooks'],
    questionRu: 'Что такое useTransition и useDeferredValue?',
    questionEn: 'What are useTransition and useDeferredValue?',
    answerRu: `\`useTransition\` (React 18) помечает обновление как **некритичное** — React может прерывать его для срочных обновлений. Возвращает \`[isPending, startTransition]\`.

\`useDeferredValue\` откладывает обновление значения.

Используются для:
- Поиска
- Фильтрации больших списков

UI остаётся **отзывчивым**.`,
    answerEn: `\`useTransition\` (React 18) marks an update as **non-urgent** — React can interrupt it in favor of urgent updates. Returns \`[isPending, startTransition]\`.

\`useDeferredValue\` defers updating a value.

Used for:
- Search
- Filtering large lists

Keeps the UI **responsive**.`,
  },
  {
    id: 'react-019',
    difficulty: 'HARD',
    order: 19,
    tags: ['hooks'],
    questionRu: 'Что такое useImperativeHandle?',
    questionEn: 'What is useImperativeHandle?',
    answerRu: `\`useImperativeHandle(ref, () => ({ method }), deps)\` позволяет компоненту кастомизировать значение \`ref\`, доступное родителю через \`forwardRef\`.

Используется для предоставления **императивного API**: \`focus()\`, \`scroll()\`, \`reset()\`.

**Антипаттерн** если можно решить декларативно через \`props\`.`,
    answerEn: `\`useImperativeHandle(ref, () => ({ method }), deps)\` lets a component customize the \`ref\` value exposed to its parent via \`forwardRef\`.

Used to provide an **imperative API**: \`focus()\`, \`scroll()\`, \`reset()\`.

It is an **anti-pattern** if the problem can be solved declaratively via \`props\`.`,
  },
  {
    id: 'react-020',
    difficulty: 'EASY',
    order: 20,
    tags: ['state'],
    questionRu: 'Что такое lifting state up?',
    questionEn: 'What is lifting state up?',
    answerRu: `**Lifting state up** — перемещение \`state\` в ближайшего общего предка компонентов, которым нужен доступ к нему.

Компоненты получают данные и колбэки через \`props\`.

Основной паттерн React для **шаринга state между siblings**.`,
    answerEn: `**Lifting state up** is moving \`state\` to the nearest common ancestor of the components that need access to it.

Components receive data and callbacks via \`props\`.

It is the primary React pattern for **sharing state between siblings**.`,
  },
  {
    id: 'react-021',
    difficulty: 'MEDIUM',
    order: 21,
    tags: ['state'],
    questionRu: 'Что такое prop drilling и как его избежать?',
    questionEn: 'What is prop drilling and how do you avoid it?',
    answerRu: `**Prop drilling** — передача \`props\` через несколько уровней компонентов, которые сами их не используют.

Решения:
- **Context API** для глобальных данных (тема, локаль, пользователь)
- **Composition pattern** (\`children\` / render props)
- Внешний **state-менеджер** (Redux, Zustand)`,
    answerEn: `**Prop drilling** is passing \`props\` through multiple component levels that do not use them themselves.

Solutions:
- **Context API** for global data (theme, locale, user)
- **Composition pattern** (\`children\` / render props)
- External **state manager** (Redux, Zustand)`,
  },
  {
    id: 'react-022',
    difficulty: 'MEDIUM',
    order: 22,
    tags: ['state'],
    questionRu: 'Когда использовать Context, а когда внешний state-менеджер?',
    questionEn: 'When should you use Context vs. an external state manager?',
    answerRu: `**Context** хорош для:
- Редко меняющихся данных (тема, локаль, авторизация)
- Передачи данных глубоко в дерево

**Внешний менеджер** (Redux, Zustand, Jotai) нужен когда:
- Частые обновления
- Сложная логика
- Нужны devtools
- \`state\` шарится между несвязанными частями приложения`,
    answerEn: `**Context** is good for:
- Infrequently changing data (theme, locale, auth)
- Passing data deep into the component tree

An **external manager** (Redux, Zustand, Jotai) is needed when:
- Updates are frequent
- Logic is complex
- Devtools are needed
- \`state\` is shared between unrelated parts of the app`,
  },
  {
    id: 'react-023',
    difficulty: 'MEDIUM',
    order: 23,
    tags: ['state'],
    questionRu: 'Как работает Redux?',
    questionEn: 'How does Redux work?',
    answerRu: `**Redux**: единый \`store\`, однонаправленный поток.

\`Action\` → \`Reducer\` (чистая функция: \`state + action = newState\`) → \`Store\` → \`View\`

**Redux Toolkit** упрощает:
- \`createSlice\` генерирует \`actions\` и \`reducer\`
- \`createAsyncThunk\` для асинхронных действий
- **Middleware** (\`thunk\`) для side effects`,
    answerEn: `**Redux**: a single \`store\`, one-way data flow.

\`Action\` → \`Reducer\` (pure function: \`state + action = newState\`) → \`Store\` → \`View\`

**Redux Toolkit** simplifies it:
- \`createSlice\` generates \`actions\` and a \`reducer\`
- \`createAsyncThunk\` handles async actions
- **Middleware** (\`thunk\`) handles side effects`,
  },
  {
    id: 'react-024',
    difficulty: 'MEDIUM',
    order: 24,
    tags: ['state'],
    questionRu: 'Что такое Zustand и чем отличается от Redux?',
    questionEn: 'What is Zustand and how does it differ from Redux?',
    answerRu: `**Zustand** — минималистичный state-менеджер.

Проще: нет \`actions\` / \`reducers\`, \`store\` — просто объект с методами. Меньше бойлерплейта.

Подписка на конкретные поля через **selector** предотвращает лишние ре-рендеры.

Хорошо для средних приложений. **Redux** лучше для сложной логики и команд.`,
    answerEn: `**Zustand** is a minimalist state manager.

It is simpler: no \`actions\` / \`reducers\`, the \`store\` is just an object with methods. Less boilerplate.

Subscribing to specific fields via **selectors** prevents unnecessary re-renders.

Great for medium-sized apps. **Redux** is better for complex logic and larger teams.`,
  },
  {
    id: 'react-025',
    difficulty: 'MEDIUM',
    order: 25,
    tags: ['state'],
    questionRu: 'Что такое React Query (TanStack Query)?',
    questionEn: 'What is React Query (TanStack Query)?',
    answerRu: `**React Query** — библиотека для управления **серверным состоянием**.

Автоматически:
- Кеширует запросы
- Обновляет при фокусе / переподключении
- Дедублирует параллельные запросы
- Управляет \`loading\` / \`error\` состоянием

Разделяет **серверный state** (React Query) и **клиентский** (Zustand / Redux).`,
    answerEn: `**React Query** is a library for managing **server state**.

It automatically:
- Caches requests
- Refetches on focus / reconnect
- Deduplicates parallel requests
- Manages \`loading\` / \`error\` state

It separates **server state** (React Query) from **client state** (Zustand / Redux).`,
  },
  {
    id: 'react-026',
    difficulty: 'MEDIUM',
    order: 26,
    tags: ['state'],
    questionRu: 'Что такое серверный state vs клиентский state?',
    questionEn: 'What is server state vs. client state?',
    answerRu: `**Серверный state** — данные с сервера: асинхронны, могут устареть, нужно кешировать и синхронизировать.
Инструменты: \`React Query\`, \`SWR\`, \`RTK Query\`

**Клиентский state** — UI-state: модалки, фильтры, форма.
Инструменты: \`useState\`, \`Zustand\`, \`Redux\`

Смешивание в одном \`store\` — **антипаттерн**.`,
    answerEn: `**Server state** — data from the server: asynchronous, can become stale, needs to be cached and synchronized.
Tools: \`React Query\`, \`SWR\`, \`RTK Query\`

**Client state** — UI state: modals, filters, forms.
Tools: \`useState\`, \`Zustand\`, \`Redux\`

Mixing them in a single \`store\` is an **anti-pattern**.`,
  },
  {
    id: 'react-027',
    difficulty: 'HARD',
    order: 27,
    tags: ['state'],
    questionRu: 'Как избежать лишних ре-рендеров при использовании Context?',
    questionEn: 'How do you avoid unnecessary re-renders when using Context?',
    answerRu: `Context ре-рендерит **всех потребителей** при изменении \`value\`.

Решения:
- Разделить контексты по частоте обновления
- Мемоизировать \`value\` через \`useMemo\`
- Разделить \`state\` и \`dispatch\` на разные контексты
- Использовать внешний state-менеджер с **селекторами**`,
    answerEn: `Context re-renders **all consumers** when the \`value\` changes.

Solutions:
- Split contexts by update frequency
- Memoize the \`value\` with \`useMemo\`
- Split \`state\` and \`dispatch\` into separate contexts
- Use an external state manager with **selectors**`,
  },
  {
    id: 'react-028',
    difficulty: 'MEDIUM',
    order: 28,
    tags: ['performance'],
    questionRu: 'Что такое React.memo и когда его использовать?',
    questionEn: 'What is React.memo and when should it be used?',
    answerRu: `\`React.memo\` — HOC, который **мемоизирует компонент**: пропускает ре-рендер если \`props\` не изменились (shallow comparison).

Использовать когда:
- Компонент рендерится часто с теми же \`props\`
- Рендер дорогой

Не использовать везде — сравнение тоже стоит памяти и времени.`,
    answerEn: `\`React.memo\` is a HOC that **memoizes a component**: it skips re-rendering if \`props\` have not changed (shallow comparison).

Use it when:
- The component re-renders often with the same \`props\`
- Rendering is expensive

Do not use it everywhere — the comparison itself has memory and time costs.`,
  },
  {
    id: 'react-029',
    difficulty: 'MEDIUM',
    order: 29,
    tags: ['performance'],
    questionRu: 'В чём разница между useMemo и React.memo?',
    questionEn: 'What is the difference between useMemo and React.memo?',
    answerRu: `\`React.memo\` — мемоизация **компонента целиком** (сравнивает \`props\`).

\`useMemo\` — мемоизация **значения внутри компонента** (сравнивает \`deps\`).

\`useCallback\` — мемоизация **функции**.

\`React.memo\` бесполезен без \`useCallback\` / \`useMemo\` для функций-\`props\`, так как функции создаются заново каждый рендер.`,
    answerEn: `\`React.memo\` memoizes the **entire component** (compares \`props\`).

\`useMemo\` memoizes a **value inside a component** (compares \`deps\`).

\`useCallback\` memoizes a **function**.

\`React.memo\` is useless without \`useCallback\` / \`useMemo\` for function \`props\`, since functions are recreated on every render.`,
  },
  {
    id: 'react-030',
    difficulty: 'MEDIUM',
    order: 30,
    tags: ['performance'],
    questionRu: 'Что такое code splitting и React.lazy?',
    questionEn: 'What is code splitting and React.lazy?',
    answerRu: `**Code splitting** — разбивка бандла на части, загружаемые по требованию.

\`React.lazy(() => import('./Component'))\` — динамический импорт компонента.

Обязательно оборачивать в \`Suspense\` с \`fallback\`.

Позволяет уменьшить начальный бандл и ускорить загрузку.`,
    answerEn: `**Code splitting** is breaking the bundle into chunks that are loaded on demand.

\`React.lazy(() => import('./Component'))\` is a dynamic component import.

It must be wrapped in \`Suspense\` with a \`fallback\`.

This reduces the initial bundle size and speeds up loading.`,
  },
  {
    id: 'react-031',
    difficulty: 'MEDIUM',
    order: 31,
    tags: ['performance'],
    questionRu: 'Что такое виртуализация списков?',
    questionEn: 'What is list virtualization?',
    answerRu: `**Виртуализация** — рендеринг только **видимых элементов** списка. Для 10 000 строк в DOM рендерится только ~20 видимых.

Библиотеки:
- \`react-window\` (легковесная)
- \`react-virtual\` (TanStack)

Критично для: больших таблиц, бесконечных лент.

Без виртуализации — тормоза и высокое потребление памяти.`,
    answerEn: `**Virtualization** is rendering only the **visible items** in a list. For 10,000 rows, only ~20 visible ones are rendered in the DOM.

Libraries:
- \`react-window\` (lightweight)
- \`react-virtual\` (TanStack)

Critical for: large tables, infinite feeds.

Without virtualization — slow performance and high memory usage.`,
  },
  {
    id: 'react-032',
    difficulty: 'MEDIUM',
    order: 32,
    tags: ['performance'],
    questionRu: 'Что такое batching в React 18?',
    questionEn: 'What is batching in React 18?',
    answerRu: `**Batching** — группировка нескольких вызовов \`setState\` в один ре-рендер.

В React 17 batching работал только в обработчиках событий. React 18 ввёл **automatic batching** — везде: async функции, \`setTimeout\`, промисы.

Уменьшает количество ре-рендеров. Отключить: \`flushSync()\`.`,
    answerEn: `**Batching** is grouping multiple \`setState\` calls into a single re-render.

In React 17, batching only worked in event handlers. React 18 introduced **automatic batching** — everywhere: async functions, \`setTimeout\`, promises.

It reduces the number of re-renders. To opt out: \`flushSync()\`.`,
  },
  {
    id: 'react-033',
    difficulty: 'MEDIUM',
    order: 33,
    tags: ['performance'],
    questionRu: 'Как профилировать производительность React-приложения?',
    questionEn: 'How do you profile the performance of a React application?',
    answerRu: `Инструменты:
- **React DevTools Profiler** — записывает рендеры, показывает причину и длительность
- **why-did-you-render** — логирует лишние ре-рендеры
- **Chrome Performance tab** — общий профиль

Паттерн: сначала найти **узкое место**, потом оптимизировать (не преждевременно).`,
    answerEn: `Tools:
- **React DevTools Profiler** — records renders, shows the reason and duration
- **why-did-you-render** — logs unnecessary re-renders
- **Chrome Performance tab** — overall profile

Pattern: find the **bottleneck** first, then optimize (not prematurely).`,
  },
  {
    id: 'react-034',
    difficulty: 'HARD',
    order: 34,
    tags: ['performance'],
    questionRu: 'Что такое Concurrent Mode и React 18?',
    questionEn: 'What is Concurrent Mode and React 18?',
    answerRu: `**Concurrent Mode** — React может **прерывать, откладывать и возобновлять** рендеринг. Позволяет UI оставаться отзывчивым при тяжёлых операциях.

Основные возможности:
- **Automatic batching**
- **Suspense** для данных
- \`useTransition\`
- \`useDeferredValue\`
- **Streaming SSR**`,
    answerEn: `**Concurrent Mode** allows React to **interrupt, pause, and resume** rendering. It keeps the UI responsive during heavy operations.

Key features:
- **Automatic batching**
- **Suspense** for data
- \`useTransition\`
- \`useDeferredValue\`
- **Streaming SSR**`,
  },
  {
    id: 'react-035',
    difficulty: 'MEDIUM',
    order: 35,
    tags: ['patterns'],
    questionRu: 'Что такое HOC (Higher-Order Component)?',
    questionEn: 'What is a HOC (Higher-Order Component)?',
    answerRu: `**HOC** — функция, принимающая компонент и возвращающая новый компонент с расширенными возможностями.

Примеры: \`withAuth(Component)\`, \`withTheme(Component)\`.

Сейчас часто заменяются **хуками** — они проще и без проблем с именованием и вложенностью.

HOC актуальны для **class-компонентов**.`,
    answerEn: `A **HOC** is a function that takes a component and returns a new component with enhanced capabilities.

Examples: \`withAuth(Component)\`, \`withTheme(Component)\`.

They are now often replaced by **hooks** — simpler and without naming / nesting issues.

HOCs remain relevant for **class components**.`,
  },
  {
    id: 'react-036',
    difficulty: 'MEDIUM',
    order: 36,
    tags: ['patterns'],
    questionRu: 'Что такое render props?',
    questionEn: 'What are render props?',
    answerRu: `**Render props** — паттерн передачи функции как \`prop\` для контроля рендеринга:

\`<DataProvider render={data => <View data={data}/>}/>\`

Позволяет переиспользовать логику с состоянием.

Сейчас в основном заменён **кастомными хуками**, но встречается в библиотеках.`,
    answerEn: `**Render props** is a pattern of passing a function as a \`prop\` to control rendering:

\`<DataProvider render={data => <View data={data}/>}/>\`

It allows reusing stateful logic.

It has largely been replaced by **custom hooks** but is still found in libraries.`,
  },
  {
    id: 'react-037',
    difficulty: 'HARD',
    order: 37,
    tags: ['patterns'],
    questionRu: 'Что такое compound components?',
    questionEn: 'What are compound components?',
    answerRu: `**Compound components** — группа компонентов, работающих вместе через общий \`state\` через **Context**.

Пример:
\`<Select><Select.Option value="1">One</Select.Option></Select>\`

Даёт гибкость в разметке при сокрытии внутренней логики.

Используется в UI-библиотеках (Radix, Headless UI).`,
    answerEn: `**Compound components** are a group of components that work together by sharing \`state\` via **Context**.

Example:
\`<Select><Select.Option value="1">One</Select.Option></Select>\`

Provides layout flexibility while hiding internal logic.

Used in UI libraries (Radix, Headless UI).`,
  },
  {
    id: 'react-038',
    difficulty: 'MEDIUM',
    order: 38,
    tags: ['patterns'],
    questionRu: 'Что такое Error Boundary?',
    questionEn: 'What is an Error Boundary?',
    answerRu: `**Error Boundary** — class-компонент с \`componentDidCatch\` и \`getDerivedStateFromError\`, перехватывающий JS-ошибки в дочерних компонентах и показывающий fallback UI.

Хуки не поддерживают Error Boundary нативно (нет \`useErrorBoundary\`).

Библиотека \`react-error-boundary\` упрощает использование.`,
    answerEn: `An **Error Boundary** is a class component with \`componentDidCatch\` and \`getDerivedStateFromError\` that catches JS errors in child components and displays a fallback UI.

Hooks do not support Error Boundaries natively (no \`useErrorBoundary\`).

The \`react-error-boundary\` library simplifies their use.`,
  },
  {
    id: 'react-039',
    difficulty: 'MEDIUM',
    order: 39,
    tags: ['patterns'],
    questionRu: 'Что такое Portal?',
    questionEn: 'What is a Portal?',
    answerRu: `\`ReactDOM.createPortal(children, domNode)\` рендерит \`children\` в другой DOM-узел вне иерархии компонента (например, в \`document.body\`).

События всплывают через **React-дерево**, не через DOM.

Используется для: модальных окон, тултипов, дропдаунов — чтобы избежать проблем с \`overflow:hidden\` и \`z-index\`.`,
    answerEn: `\`ReactDOM.createPortal(children, domNode)\` renders \`children\` into a different DOM node outside the component hierarchy (e.g., \`document.body\`).

Events bubble through the **React tree**, not the DOM tree.

Used for: modals, tooltips, dropdowns — to avoid issues with \`overflow:hidden\` and \`z-index\`.`,
  },
  {
    id: 'react-040',
    difficulty: 'MEDIUM',
    order: 40,
    tags: ['patterns'],
    questionRu: 'Что такое Suspense и как работает?',
    questionEn: 'What is Suspense and how does it work?',
    answerRu: `\`Suspense\` позволяет компонентам «приостанавливать» рендер до готовности данных или кода. Показывает \`fallback\` пока дочерние компоненты загружаются.

Работает с:
- \`React.lazy\` (code splitting)
- \`React Query\` / \`SWR\` с \`suspense: true\`
- \`use()\` хуком (React 19)

Вложенные \`Suspense\` создают **независимые зоны загрузки**.`,
    answerEn: `\`Suspense\` lets components "pause" rendering until data or code is ready. It shows a \`fallback\` while child components are loading.

Works with:
- \`React.lazy\` (code splitting)
- \`React Query\` / \`SWR\` with \`suspense: true\`
- The \`use()\` hook (React 19)

Nested \`Suspense\` boundaries create **independent loading zones**.`,
  },
  {
    id: 'react-041',
    difficulty: 'MEDIUM',
    order: 41,
    tags: ['patterns'],
    questionRu: 'Что такое forwardRef?',
    questionEn: 'What is forwardRef?',
    answerRu: `\`forwardRef\` позволяет компоненту передавать \`ref\`, полученный от родителя, вглубь к DOM-элементу или дочернему компоненту.

Нужен когда:
- UI-библиотека должна дать доступ к DOM
- Нужно фокусировать \`input\` внутри компонента снаружи

В React 19 \`ref\` передаётся как **обычный prop**.`,
    answerEn: `\`forwardRef\` lets a component pass a \`ref\` received from its parent down to a DOM element or child component.

Needed when:
- A UI library must expose DOM access
- An \`input\` inside a component needs to be focused from the outside

In React 19, \`ref\` is passed as a **regular prop**.`,
  },
  {
    id: 'react-042',
    difficulty: 'MEDIUM',
    order: 42,
    tags: ['patterns'],
    questionRu: 'В чём разница между presentational и container компонентами?',
    questionEn: 'What is the difference between presentational and container components?',
    answerRu: `Паттерн **разделения ответственности**:

- **Presentational** («глупые») — только рендер UI, получают данные через \`props\`, нет бизнес-логики
- **Container** («умные») — получают данные, управляют \`state\`, передают в presentational

Сейчас часто заменяется **хуками** — логика в хуке, компонент только рендерит.`,
    answerEn: `A **separation of concerns** pattern:

- **Presentational** ("dumb") — only render UI, receive data via \`props\`, no business logic
- **Container** ("smart") — fetch data, manage \`state\`, and pass it to presentational components

Now often replaced by **hooks** — logic in the hook, the component just renders.`,
  },
];
