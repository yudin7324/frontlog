import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'javascript' },
      update: {},
      create: {
        slug: 'javascript',
        nameRu: 'JavaScript',
        nameEn: 'JavaScript',
        descriptionRu: 'Основы и продвинутые концепции JS',
        descriptionEn: 'Core and advanced JS concepts',
        icon: '🟨',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: {
        slug: 'typescript',
        nameRu: 'TypeScript',
        nameEn: 'TypeScript',
        descriptionRu: 'Типизация и возможности TypeScript',
        descriptionEn: 'Types and TypeScript features',
        icon: '🔷',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'react' },
      update: {},
      create: {
        slug: 'react',
        nameRu: 'React',
        nameEn: 'React',
        descriptionRu: 'Хуки, паттерны и жизненный цикл',
        descriptionEn: 'Hooks, patterns and lifecycle',
        icon: '⚛️',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'css' },
      update: {
        nameRu: 'HTML и CSS',
        nameEn: 'HTML & CSS',
        descriptionRu: 'Разметка, верстка, флексбокс, гриды',
        descriptionEn: 'Markup, layout, flexbox, grid',
      },
      create: {
        slug: 'css',
        nameRu: 'HTML и CSS',
        nameEn: 'HTML & CSS',
        descriptionRu: 'Разметка, верстка, флексбокс, гриды',
        descriptionEn: 'Markup, layout, flexbox, grid',
        icon: '🎨',
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'browser' },
      update: {},
      create: {
        slug: 'browser',
        nameRu: 'Браузер',
        nameEn: 'Browser',
        descriptionRu: 'Как работает браузер, события',
        descriptionEn: 'How browsers work, events',
        icon: '🌐',
        order: 5,
      },
    }),
  ]);

  const [js, ts, react, css, browser] = categories;

  // JavaScript cards
  await Promise.all([
    prisma.card.upsert({
      where: { id: 'js-001' },
      update: {},
      create: {
        id: 'js-001',
        categoryId: js.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое замыкание (closure) в JavaScript?',
        questionEn: 'What is a closure in JavaScript?',
        answerRu: 'Замыкание — это функция, которая имеет доступ к переменным из своей внешней области видимости (лексического окружения), даже после того как внешняя функция завершила выполнение.\n\nПример:\n```js\nfunction counter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\nconst inc = counter();\ninc(); // 1\ninc(); // 2\n```',
        answerEn: 'A closure is a function that has access to variables from its outer (lexical) scope even after the outer function has finished executing.\n\nExample:\n```js\nfunction counter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\nconst inc = counter();\ninc(); // 1\ninc(); // 2\n```',
        tags: ['closure', 'scope', 'functions'],
        order: 1,
      },
    }),
    prisma.card.upsert({
      where: { id: 'js-002' },
      update: {},
      create: {
        id: 'js-002',
        categoryId: js.id,
        difficulty: 'MEDIUM',
        questionRu: 'В чём разница между == и === в JavaScript?',
        questionEn: 'What is the difference between == and === in JavaScript?',
        answerRu: '**==** (нестрогое равенство) — сравнивает значения с приведением типов.\n\n**===** (строгое равенство) — сравнивает значения без приведения типов.\n\nПримеры:\n```js\n0 == false   // true (приведение типа)\n0 === false  // false (разные типы)\n\n"" == false  // true\n"" === false // false\n\nnull == undefined  // true\nnull === undefined // false\n```\n\nВсегда предпочитай === в реальном коде.',
        answerEn: '**==** (loose equality) — compares values with type coercion.\n\n**===** (strict equality) — compares values without type coercion.\n\nExamples:\n```js\n0 == false   // true (coercion)\n0 === false  // false (different types)\n\n"" == false  // true\n"" === false // false\n\nnull == undefined  // true\nnull === undefined // false\n```\n\nAlways prefer === in real code.',
        tags: ['equality', 'types', 'coercion'],
        order: 2,
      },
    }),
    prisma.card.upsert({
      where: { id: 'js-003' },
      update: {},
      create: {
        id: 'js-003',
        categoryId: js.id,
        difficulty: 'HARD',
        questionRu: 'Что такое Event Loop в JavaScript? Как он работает?',
        questionEn: 'What is the Event Loop in JavaScript? How does it work?',
        answerRu: 'Event Loop — механизм, позволяющий JavaScript выполнять асинхронный код, несмотря на однопоточность.\n\n**Компоненты:**\n- **Call Stack** — стек вызовов для синхронного кода\n- **Web APIs** — браузерные API (setTimeout, fetch, DOM events)\n- **Callback Queue** (Macrotask) — очередь callback\'ов (setTimeout, setInterval)\n- **Microtask Queue** — Promise.then, queueMicrotask, MutationObserver\n\n**Порядок выполнения:**\n1. Выполняется весь синхронный код (Call Stack)\n2. Очищается Microtask Queue полностью\n3. Берётся одна задача из Macrotask Queue\n4. Снова очищается Microtask Queue\n5. Повторяется\n\n```js\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// Вывод: 1, 4, 3, 2\n```',
        answerEn: 'The Event Loop is the mechanism that allows JavaScript to execute asynchronous code despite being single-threaded.\n\n**Components:**\n- **Call Stack** — for synchronous code execution\n- **Web APIs** — browser APIs (setTimeout, fetch, DOM events)\n- **Callback Queue** (Macrotask) — callbacks from setTimeout, setInterval\n- **Microtask Queue** — Promise.then, queueMicrotask, MutationObserver\n\n**Execution order:**\n1. Execute all synchronous code (Call Stack)\n2. Drain the Microtask Queue completely\n3. Take one task from the Macrotask Queue\n4. Drain the Microtask Queue again\n5. Repeat\n\n```js\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// Output: 1, 4, 3, 2\n```',
        tags: ['event-loop', 'async', 'promises', 'microtasks'],
        order: 3,
      },
    }),
    prisma.card.upsert({
      where: { id: 'js-004' },
      update: {},
      create: {
        id: 'js-004',
        categoryId: js.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое прототипное наследование в JS?',
        questionEn: 'What is prototypal inheritance in JS?',
        answerRu: 'В JavaScript каждый объект имеет скрытое свойство **[[Prototype]]** — ссылку на другой объект (прототип). При обращении к свойству JS сначала ищет его в самом объекте, затем идёт вверх по цепочке прототипов.\n\n```js\nconst animal = { breathe() { return "breathing"; } };\nconst dog = Object.create(animal);\ndog.bark = () => "woof";\n\ndog.bark();    // "woof" (собственное)\ndog.breathe(); // "breathing" (из прототипа)\n```\n\nС классами это работает аналогично под капотом:\n```js\nclass Animal { breathe() {} }\nclass Dog extends Animal { bark() {} }\n```',
        answerEn: 'In JavaScript, every object has a hidden **[[Prototype]]** property — a reference to another object (its prototype). When accessing a property, JS first looks in the object itself, then walks up the prototype chain.\n\n```js\nconst animal = { breathe() { return "breathing"; } };\nconst dog = Object.create(animal);\ndog.bark = () => "woof";\n\ndog.bark();    // "woof" (own)\ndog.breathe(); // "breathing" (from prototype)\n```\n\nClasses work the same way under the hood:\n```js\nclass Animal { breathe() {} }\nclass Dog extends Animal { bark() {} }\n```',
        tags: ['prototype', 'inheritance', 'oop'],
        order: 4,
      },
    }),
    prisma.card.upsert({
      where: { id: 'js-005' },
      update: {},
      create: {
        id: 'js-005',
        categoryId: js.id,
        difficulty: 'MEDIUM',
        questionRu: 'В чём разница между var, let и const?',
        questionEn: 'What is the difference between var, let and const?',
        answerRu: '| | var | let | const |\n|---|---|---|---|\n| Область видимости | Функция | Блок | Блок |\n| Hoisting | Да (undefined) | Да (TDZ) | Да (TDZ) |\n| Переприсвоение | ✅ | ✅ | ❌ |\n| Переобъявление | ✅ | ❌ | ❌ |\n\n**TDZ (Temporal Dead Zone)** — переменная существует, но недоступна до объявления.\n\n```js\nconsole.log(a); // undefined (var hoisted)\nconsole.log(b); // ReferenceError (TDZ)\nvar a = 1;\nlet b = 2;\n```\n\n⚠️ const не делает объект неизменяемым — только запрещает переприсвоение.',
        answerEn: '| | var | let | const |\n|---|---|---|---|\n| Scope | Function | Block | Block |\n| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |\n| Reassignment | ✅ | ✅ | ❌ |\n| Redeclaration | ✅ | ❌ | ❌ |\n\n**TDZ (Temporal Dead Zone)** — variable exists but is inaccessible before declaration.\n\n```js\nconsole.log(a); // undefined (var hoisted)\nconsole.log(b); // ReferenceError (TDZ)\nvar a = 1;\nlet b = 2;\n```\n\n⚠️ const does not make objects immutable — only prevents reassignment.',
        tags: ['var', 'let', 'const', 'scope', 'hoisting'],
        order: 5,
      },
    }),
    prisma.card.upsert({
      where: { id: 'js-006' },
      update: {},
      create: {
        id: 'js-006',
        categoryId: js.id,
        difficulty: 'HARD',
        questionRu: 'Что такое Promise? Какие состояния он может иметь?',
        questionEn: 'What is a Promise? What states can it have?',
        answerRu: 'Promise — объект, представляющий результат асинхронной операции.\n\n**3 состояния:**\n- **pending** — начальное, операция в процессе\n- **fulfilled** — операция успешно завершена\n- **rejected** — операция завершена с ошибкой\n\nПереход состояния необратим.\n\n```js\nconst p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("done"), 1000);\n});\n\np.then(result => console.log(result))  // "done"\n .catch(err => console.error(err))\n .finally(() => console.log("always"));\n```\n\n**Promise.all** — ждёт все, падает если хоть один rejected.\n**Promise.allSettled** — ждёт все, не падает.\n**Promise.race** — берёт первый завершившийся.',
        answerEn: 'A Promise is an object representing the eventual result of an asynchronous operation.\n\n**3 states:**\n- **pending** — initial state, operation in progress\n- **fulfilled** — operation completed successfully\n- **rejected** — operation failed\n\nState transition is irreversible.\n\n```js\nconst p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("done"), 1000);\n});\n\np.then(result => console.log(result))  // "done"\n .catch(err => console.error(err))\n .finally(() => console.log("always"));\n```\n\n**Promise.all** — waits for all, fails if any rejected.\n**Promise.allSettled** — waits for all, never fails.\n**Promise.race** — takes the first to settle.',
        tags: ['promise', 'async', 'microtasks'],
        order: 6,
      },
    }),
    prisma.card.upsert({
      where: { id: 'js-007' },
      update: {},
      create: {
        id: 'js-007',
        categoryId: js.id,
        difficulty: 'EASY',
        questionRu: 'Что такое this в JavaScript?',
        questionEn: 'What is "this" in JavaScript?',
        answerRu: '**this** — ссылка на объект, в контексте которого выполняется функция. Значение зависит от способа вызова:\n\n```js\n// Метод объекта — this = объект\nconst obj = { name: "A", greet() { return this.name; } };\nobj.greet(); // "A"\n\n// Обычная функция — this = undefined (strict) или window\nfunction fn() { return this; }\n\n// Стрелочная функция — this из внешнего контекста\nconst arrow = () => this; // берёт this снаружи\n\n// Явное связывание\nfn.call(obj);  // this = obj\nfn.apply(obj); // this = obj\nconst bound = fn.bind(obj);\n```',
        answerEn: '**this** is a reference to the object in whose context a function is executing. The value depends on how the function is called:\n\n```js\n// Object method — this = object\nconst obj = { name: "A", greet() { return this.name; } };\nobj.greet(); // "A"\n\n// Regular function — this = undefined (strict) or window\nfunction fn() { return this; }\n\n// Arrow function — this from outer context\nconst arrow = () => this; // inherits this\n\n// Explicit binding\nfn.call(obj);  // this = obj\nfn.apply(obj); // this = obj\nconst bound = fn.bind(obj);\n```',
        tags: ['this', 'context', 'arrow-functions'],
        order: 7,
      },
    }),
  ]);

  // TypeScript cards
  await Promise.all([
    prisma.card.upsert({
      where: { id: 'ts-001' },
      update: {},
      create: {
        id: 'ts-001',
        categoryId: ts.id,
        difficulty: 'EASY',
        questionRu: 'В чём разница между interface и type в TypeScript?',
        questionEn: 'What is the difference between interface and type in TypeScript?',
        answerRu: 'Оба описывают форму объекта, но есть различия:\n\n**interface:**\n- Только для объектов и классов\n- Поддерживает declaration merging (слияние)\n- Расширяется через `extends`\n\n**type:**\n- Любые типы: объекты, примитивы, union, tuple\n- Не поддерживает merging\n- Использует `&` для пересечения\n\n```ts\ninterface User { name: string; }\ninterface User { age: number; } // OK — merging\n\ntype User = { name: string; };\ntype User = { age: number; }; // Error — дублирование\n\ntype ID = string | number; // только type\n```\n\n**Правило:** используй `interface` для публичных API и объектов, `type` для остального.',
        answerEn: 'Both describe object shapes, but differ:\n\n**interface:**\n- Objects and classes only\n- Supports declaration merging\n- Extended via `extends`\n\n**type:**\n- Any types: objects, primitives, unions, tuples\n- No merging\n- Uses `&` for intersection\n\n```ts\ninterface User { name: string; }\ninterface User { age: number; } // OK — merging\n\ntype User = { name: string; };\ntype User = { age: number; }; // Error — duplicate\n\ntype ID = string | number; // type only\n```\n\n**Rule:** use `interface` for public APIs and objects, `type` for everything else.',
        tags: ['interface', 'type', 'typescript-basics'],
        order: 1,
      },
    }),
    prisma.card.upsert({
      where: { id: 'ts-002' },
      update: {},
      create: {
        id: 'ts-002',
        categoryId: ts.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое generics в TypeScript?',
        questionEn: 'What are generics in TypeScript?',
        answerRu: 'Generics — параметры типов, позволяющие писать переиспользуемый типобезопасный код.\n\n```ts\n// Без generics — теряем тип\nfunction identity(arg: any): any { return arg; }\n\n// С generics — тип сохраняется\nfunction identity<T>(arg: T): T { return arg; }\n\nconst n = identity(42);      // n: number\nconst s = identity("hello"); // s: string\n```\n\n**Constraint (ограничение):**\n```ts\nfunction getLength<T extends { length: number }>(arg: T): number {\n  return arg.length;\n}\n\ngetLength("hello"); // OK\ngetLength([1, 2]);   // OK\ngetLength(42);       // Error — нет length\n```',
        answerEn: 'Generics are type parameters that allow writing reusable, type-safe code.\n\n```ts\n// Without generics — type is lost\nfunction identity(arg: any): any { return arg; }\n\n// With generics — type is preserved\nfunction identity<T>(arg: T): T { return arg; }\n\nconst n = identity(42);      // n: number\nconst s = identity("hello"); // s: string\n```\n\n**Constraint:**\n```ts\nfunction getLength<T extends { length: number }>(arg: T): number {\n  return arg.length;\n}\n\ngetLength("hello"); // OK\ngetLength([1, 2]);   // OK\ngetLength(42);       // Error — no length\n```',
        tags: ['generics', 'type-parameters'],
        order: 2,
      },
    }),
    prisma.card.upsert({
      where: { id: 'ts-003' },
      update: {},
      create: {
        id: 'ts-003',
        categoryId: ts.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое utility types в TypeScript? Назови основные.',
        questionEn: 'What are utility types in TypeScript? Name the most common ones.',
        answerRu: 'Utility types — встроенные типы для трансформации других типов.\n\n```ts\ninterface User { id: number; name: string; email: string; }\n\nPartial<User>     // все поля необязательные\nRequired<User>    // все поля обязательные\nReadonly<User>    // все поля readonly\n\nPick<User, "id" | "name">  // только указанные поля\nOmit<User, "email">         // все кроме указанных\n\nRecord<string, number>      // { [key: string]: number }\n\nExclude<"a" | "b" | "c", "a">  // "b" | "c"\nExtract<"a" | "b", "a" | "d">  // "a"\n\nReturnType<typeof fn>       // тип возврата функции\nParameters<typeof fn>       // типы аргументов функции\n```',
        answerEn: 'Utility types are built-in types for transforming other types.\n\n```ts\ninterface User { id: number; name: string; email: string; }\n\nPartial<User>     // all fields optional\nRequired<User>    // all fields required\nReadonly<User>    // all fields readonly\n\nPick<User, "id" | "name">  // only specified fields\nOmit<User, "email">         // all except specified\n\nRecord<string, number>      // { [key: string]: number }\n\nExclude<"a" | "b" | "c", "a">  // "b" | "c"\nExtract<"a" | "b", "a" | "d">  // "a"\n\nReturnType<typeof fn>       // function return type\nParameters<typeof fn>       // function parameter types\n```',
        tags: ['utility-types', 'partial', 'pick', 'omit'],
        order: 3,
      },
    }),
    prisma.card.upsert({
      where: { id: 'ts-004' },
      update: {},
      create: {
        id: 'ts-004',
        categoryId: ts.id,
        difficulty: 'HARD',
        questionRu: 'Что такое type narrowing в TypeScript?',
        questionEn: 'What is type narrowing in TypeScript?',
        answerRu: 'Type narrowing — сужение типа внутри условных блоков на основе проверок.\n\n```ts\nfunction process(value: string | number) {\n  // typeof narrowing\n  if (typeof value === "string") {\n    value.toUpperCase(); // value: string\n  } else {\n    value.toFixed(2); // value: number\n  }\n}\n\n// instanceof narrowing\nif (error instanceof Error) {\n  console.log(error.message);\n}\n\n// in narrowing\nif ("swim" in animal) {\n  animal.swim();\n}\n\n// Discriminated union\ntype Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number };\n\nfunction area(s: Shape) {\n  if (s.kind === "circle") return Math.PI * s.radius ** 2;\n  return s.side ** 2;\n}\n```',
        answerEn: 'Type narrowing is the process of refining a type to a more specific one within conditional blocks.\n\n```ts\nfunction process(value: string | number) {\n  // typeof narrowing\n  if (typeof value === "string") {\n    value.toUpperCase(); // value: string\n  } else {\n    value.toFixed(2); // value: number\n  }\n}\n\n// instanceof narrowing\nif (error instanceof Error) {\n  console.log(error.message);\n}\n\n// in narrowing\nif ("swim" in animal) {\n  animal.swim();\n}\n\n// Discriminated union\ntype Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number };\n\nfunction area(s: Shape) {\n  if (s.kind === "circle") return Math.PI * s.radius ** 2;\n  return s.side ** 2;\n}\n```',
        tags: ['narrowing', 'type-guards', 'discriminated-union'],
        order: 4,
      },
    }),
    prisma.card.upsert({
      where: { id: 'ts-005' },
      update: {},
      create: {
        id: 'ts-005',
        categoryId: ts.id,
        difficulty: 'EASY',
        questionRu: 'Что такое unknown и как он отличается от any?',
        questionEn: 'What is unknown and how does it differ from any?',
        answerRu: 'Оба принимают любое значение, но:\n\n**any** — отключает проверку типов полностью. Опасен.\n\n**unknown** — безопасная альтернатива. Требует сужения типа перед использованием.\n\n```ts\nlet a: any = "hello";\na.toUpperCase(); // OK — нет проверки\na.foo.bar.baz;   // OK — нет проверки (runtime error!)\n\nlet u: unknown = "hello";\nu.toUpperCase(); // Error — нельзя без проверки\n\nif (typeof u === "string") {\n  u.toUpperCase(); // OK — тип сужен\n}\n```\n\n**Правило:** используй `unknown` вместо `any` везде где не знаешь тип заранее (например, в catch блоках).',
        answerEn: 'Both accept any value, but:\n\n**any** — completely disables type checking. Dangerous.\n\n**unknown** — safe alternative. Requires type narrowing before use.\n\n```ts\nlet a: any = "hello";\na.toUpperCase(); // OK — no checking\na.foo.bar.baz;   // OK — no checking (runtime error!)\n\nlet u: unknown = "hello";\nu.toUpperCase(); // Error — cannot use without check\n\nif (typeof u === "string") {\n  u.toUpperCase(); // OK — type narrowed\n}\n```\n\n**Rule:** use `unknown` instead of `any` whenever you don\'t know the type in advance (e.g., in catch blocks).',
        tags: ['unknown', 'any', 'type-safety'],
        order: 5,
      },
    }),
  ]);

  // React cards
  await Promise.all([
    prisma.card.upsert({
      where: { id: 'react-001' },
      update: {},
      create: {
        id: 'react-001',
        categoryId: react.id,
        difficulty: 'MEDIUM',
        questionRu: 'Когда использовать useCallback?',
        questionEn: 'When should you use useCallback?',
        answerRu: '**useCallback** мемоизирует функцию — возвращает ту же ссылку между рендерами, если зависимости не изменились.\n\n**Используй когда:**\n1. Функция передаётся в дочерний компонент, обёрнутый в `React.memo`\n2. Функция используется в зависимостях `useEffect`\n\n```jsx\n// Без useCallback — новая ссылка на каждый рендер\nconst handle = () => doSomething(id);\n\n// С useCallback — стабильная ссылка\nconst handle = useCallback(() => doSomething(id), [id]);\n```\n\n⚠️ Не оборачивай всё подряд — это добавляет overhead. Используй осознанно.',
        answerEn: '**useCallback** memoizes a function — returns the same reference between renders if dependencies haven\'t changed.\n\n**Use when:**\n1. The function is passed to a child component wrapped in `React.memo`\n2. The function is used in `useEffect` dependencies\n\n```jsx\n// Without useCallback — new reference every render\nconst handle = () => doSomething(id);\n\n// With useCallback — stable reference\nconst handle = useCallback(() => doSomething(id), [id]);\n```\n\n⚠️ Don\'t wrap everything — it adds overhead. Use intentionally.',
        tags: ['hooks', 'usecallback', 'performance', 'memoization'],
        order: 1,
      },
    }),
    prisma.card.upsert({
      where: { id: 'react-002' },
      update: {},
      create: {
        id: 'react-002',
        categoryId: react.id,
        difficulty: 'HARD',
        questionRu: 'Как работает reconciliation в React?',
        questionEn: 'How does reconciliation work in React?',
        answerRu: 'Reconciliation — процесс, при котором React сравнивает новый Virtual DOM со старым (diffing) и применяет минимальный набор изменений к реальному DOM.\n\n**Алгоритм (heuristics):**\n1. Если тип элемента изменился — старое дерево уничтожается, создаётся новое\n2. Если тип тот же — обновляются только изменившиеся атрибуты\n3. **key** — помогает React отслеживать элементы в списках\n\n```jsx\n[\n  <Item key="a" />,\n  <Item key="b" />,\n]\n```\n\nReact 18 использует **Fiber** — структуру данных для прерываемого рендеринга (Concurrent Mode).',
        answerEn: 'Reconciliation is the process where React compares the new Virtual DOM to the old one (diffing) and applies the minimal set of changes to the real DOM.\n\n**Algorithm (heuristics):**\n1. If element type changed — old tree is destroyed, new one is created\n2. If type is same — only changed attributes are updated\n3. **key** — helps React track elements in lists\n\n```jsx\n[\n  <Item key="a" />,\n  <Item key="b" />,\n]\n```\n\nReact 18 uses **Fiber** — a data structure for interruptible rendering (Concurrent Mode).',
        tags: ['reconciliation', 'virtual-dom', 'diffing', 'fiber'],
        order: 2,
      },
    }),
    prisma.card.upsert({
      where: { id: 'react-003' },
      update: {},
      create: {
        id: 'react-003',
        categoryId: react.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое useEffect и как правильно им пользоваться?',
        questionEn: 'What is useEffect and how to use it correctly?',
        answerRu: '**useEffect** — хук для побочных эффектов: запросы к API, подписки, работа с DOM.\n\n```jsx\nuseEffect(() => {\n  // эффект\n  const sub = subscribe(id);\n\n  // cleanup — вызывается при размонтировании\n  // или перед следующим запуском эффекта\n  return () => sub.unsubscribe();\n}, [id]); // зависимости\n```\n\n**Варианты зависимостей:**\n- `[]` — только при монтировании\n- `[a, b]` — при изменении a или b\n- без массива — каждый рендер (⚠️ опасно)\n\n**Частые ошибки:**\n- Не указывать все зависимости\n- Делать async саму функцию useEffect (нельзя)',
        answerEn: '**useEffect** — hook for side effects: API requests, subscriptions, DOM manipulation.\n\n```jsx\nuseEffect(() => {\n  // effect\n  const sub = subscribe(id);\n\n  // cleanup — called on unmount\n  // or before the next effect run\n  return () => sub.unsubscribe();\n}, [id]); // dependencies\n```\n\n**Dependency options:**\n- `[]` — only on mount\n- `[a, b]` — when a or b change\n- no array — every render (⚠️ dangerous)\n\n**Common mistakes:**\n- Missing dependencies\n- Making the useEffect callback itself async (not allowed)',
        tags: ['hooks', 'useeffect', 'side-effects'],
        order: 3,
      },
    }),
    prisma.card.upsert({
      where: { id: 'react-004' },
      update: {},
      create: {
        id: 'react-004',
        categoryId: react.id,
        difficulty: 'EASY',
        questionRu: 'Что такое React.memo и когда его использовать?',
        questionEn: 'What is React.memo and when to use it?',
        answerRu: '**React.memo** — HOC, который мемоизирует компонент. Пропускает ре-рендер если пропсы не изменились (shallow comparison).\n\n```jsx\nconst Button = React.memo(({ onClick, label }) => {\n  console.log("render");\n  return <button onClick={onClick}>{label}</button>;\n});\n\n// Компонент не перерендерится если onClick и label те же\n```\n\n**Используй когда:**\n- Компонент часто рендерится с теми же пропсами\n- Рендер дорогостоящий\n\n⚠️ Не использовать если:\n- Пропсы меняются почти каждый рендер\n- Компонент простой — overhead мемоизации больше выгоды',
        answerEn: '**React.memo** — HOC that memoizes a component. Skips re-render if props haven\'t changed (shallow comparison).\n\n```jsx\nconst Button = React.memo(({ onClick, label }) => {\n  console.log("render");\n  return <button onClick={onClick}>{label}</button>;\n});\n\n// Won\'t re-render if onClick and label are the same\n```\n\n**Use when:**\n- Component re-renders often with the same props\n- Render is expensive\n\n⚠️ Don\'t use when:\n- Props change almost every render\n- Component is simple — memoization overhead exceeds benefit',
        tags: ['memo', 'performance', 'hoc'],
        order: 4,
      },
    }),
    prisma.card.upsert({
      where: { id: 'react-005' },
      update: {},
      create: {
        id: 'react-005',
        categoryId: react.id,
        difficulty: 'HARD',
        questionRu: 'В чём разница между useMemo и useCallback?',
        questionEn: 'What is the difference between useMemo and useCallback?',
        answerRu: 'Оба мемоизируют значение, но:\n\n**useCallback** — мемоизирует **функцию**\n```jsx\nconst fn = useCallback(() => compute(a, b), [a, b]);\n// fn — стабильная ссылка на функцию\n```\n\n**useMemo** — мемоизирует **результат** вычисления\n```jsx\nconst result = useMemo(() => compute(a, b), [a, b]);\n// result — кешированное значение\n```\n\nПо сути `useCallback(fn, deps)` === `useMemo(() => fn, deps)`\n\n**Когда useMemo:**\n- Дорогостоящие вычисления (сортировка, фильтрация)\n- Стабильная ссылка на объект/массив для зависимостей\n\n**Когда useCallback:**\n- Передача функции в React.memo компонент\n- Функция в deps useEffect',
        answerEn: 'Both memoize values, but:\n\n**useCallback** — memoizes a **function**\n```jsx\nconst fn = useCallback(() => compute(a, b), [a, b]);\n// fn — stable function reference\n```\n\n**useMemo** — memoizes a **computed result**\n```jsx\nconst result = useMemo(() => compute(a, b), [a, b]);\n// result — cached value\n```\n\nEssentially `useCallback(fn, deps)` === `useMemo(() => fn, deps)`\n\n**When useMemo:**\n- Expensive computations (sorting, filtering)\n- Stable reference for objects/arrays in dependencies\n\n**When useCallback:**\n- Passing function to React.memo component\n- Function in useEffect deps',
        tags: ['usememo', 'usecallback', 'performance', 'memoization'],
        order: 5,
      },
    }),
  ]);

  // CSS cards
  await Promise.all([
    prisma.card.upsert({
      where: { id: 'css-001' },
      update: {},
      create: {
        id: 'css-001',
        categoryId: css.id,
        difficulty: 'MEDIUM',
        questionRu: 'В чём разница между Flexbox и Grid?',
        questionEn: 'What is the difference between Flexbox and Grid?',
        answerRu: '**Flexbox** — одномерная система (строка или колонка). Лучше для:\n- Навигации\n- Выравнивания элементов по оси\n- Компонентов с переменным числом элементов\n\n**Grid** — двумерная система (строки И колонки). Лучше для:\n- Макетов страниц\n- Сложных сеток\n- Точного позиционирования\n\n```css\n/* Flexbox */\n.flex { display: flex; justify-content: space-between; }\n\n/* Grid */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n```\n\nПравило: Flex для компонентов, Grid для layouts.',
        answerEn: '**Flexbox** — one-dimensional (row or column). Better for:\n- Navigation\n- Aligning items along an axis\n- Components with variable number of items\n\n**Grid** — two-dimensional (rows AND columns). Better for:\n- Page layouts\n- Complex grids\n- Precise placement\n\n```css\n/* Flexbox */\n.flex { display: flex; justify-content: space-between; }\n\n/* Grid */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n```\n\nRule of thumb: Flex for components, Grid for layouts.',
        tags: ['flexbox', 'grid', 'layout'],
        order: 1,
      },
    }),
    prisma.card.upsert({
      where: { id: 'css-002' },
      update: {},
      create: {
        id: 'css-002',
        categoryId: css.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое CSS specificity (специфичность)?',
        questionEn: 'What is CSS specificity?',
        answerRu: 'Специфичность определяет, какое CSS-правило применяется при конфликте. Считается по весам:\n\n| Селектор | Вес |\n|---|---|\n| `!important` | перебивает всё |\n| inline style | 1-0-0-0 |\n| #id | 0-1-0-0 |\n| .class, [attr], :pseudo-class | 0-0-1-0 |\n| tag, ::pseudo-element | 0-0-0-1 |\n| * | 0-0-0-0 |\n\n```css\n#nav .link { }   /* 0-1-1-0 */\n.nav a.active { } /* 0-0-2-1 */\n\n/* Побеждает #nav .link — у него больше вес */\n```\n\nПри равной специфичности побеждает правило, объявленное позже.',
        answerEn: 'Specificity determines which CSS rule applies when there\'s a conflict. Calculated by weights:\n\n| Selector | Weight |\n|---|---|\n| `!important` | overrides all |\n| inline style | 1-0-0-0 |\n| #id | 0-1-0-0 |\n| .class, [attr], :pseudo-class | 0-0-1-0 |\n| tag, ::pseudo-element | 0-0-0-1 |\n| * | 0-0-0-0 |\n\n```css\n#nav .link { }    /* 0-1-1-0 */\n.nav a.active { }  /* 0-0-2-1 */\n\n/* #nav .link wins — higher weight */\n```\n\nWith equal specificity, the last declared rule wins.',
        tags: ['specificity', 'cascade', 'selectors'],
        order: 2,
      },
    }),
    prisma.card.upsert({
      where: { id: 'css-003' },
      update: {},
      create: {
        id: 'css-003',
        categoryId: css.id,
        difficulty: 'EASY',
        questionRu: 'Что такое box model в CSS?',
        questionEn: 'What is the CSS box model?',
        answerRu: 'Box model — модель отображения элемента в браузере. Каждый элемент — прямоугольник из 4 слоёв:\n\n```\n┌─────────────────────┐\n│       margin        │\n│  ┌───────────────┐  │\n│  │    border     │  │\n│  │  ┌─────────┐  │  │\n│  │  │ padding │  │  │\n│  │  │ content │  │  │\n│  │  └─────────┘  │  │\n│  └───────────────┘  │\n└─────────────────────┘\n```\n\n**box-sizing:**\n```css\n/* По умолчанию — width не включает padding и border */\nbox-sizing: content-box;\n\n/* Обычно предпочтительно — width включает всё */\nbox-sizing: border-box;\n```\n\nБольшинство проектов сбрасывают через `* { box-sizing: border-box; }`',
        answerEn: 'The box model describes how elements are rendered in the browser. Every element is a rectangle with 4 layers:\n\n```\n┌─────────────────────┐\n│       margin        │\n│  ┌───────────────┐  │\n│  │    border     │  │\n│  │  ┌─────────┐  │  │\n│  │  │ padding │  │  │\n│  │  │ content │  │  │\n│  │  └─────────┘  │  │\n│  └───────────────┘  │\n└─────────────────────┘\n```\n\n**box-sizing:**\n```css\n/* Default — width excludes padding and border */\nbox-sizing: content-box;\n\n/* Usually preferred — width includes everything */\nbox-sizing: border-box;\n```\n\nMost projects reset with `* { box-sizing: border-box; }`',
        tags: ['box-model', 'padding', 'margin', 'border'],
        order: 3,
      },
    }),
    prisma.card.upsert({
      where: { id: 'css-004' },
      update: {},
      create: {
        id: 'css-004',
        categoryId: css.id,
        difficulty: 'HARD',
        questionRu: 'Что такое stacking context в CSS?',
        questionEn: 'What is a stacking context in CSS?',
        answerRu: 'Stacking context — трёхмерная концепция отображения элементов по оси Z. Новый контекст создаётся когда элемент имеет:\n\n- `position` + `z-index` (не auto)\n- `opacity` < 1\n- `transform`, `filter`, `perspective`\n- `isolation: isolate`\n- и другие свойства\n\n**Важно:** z-index работает только внутри своего stacking context!\n\n```css\n.parent { position: relative; z-index: 1; }\n.child  { position: relative; z-index: 999; }\n.other  { position: relative; z-index: 2; }\n\n/* child (999) НЕ перекроет other (2),\n   потому что parent (1) < other (2) */\n```',
        answerEn: 'A stacking context is a three-dimensional rendering concept along the Z axis. A new context is created when an element has:\n\n- `position` + `z-index` (not auto)\n- `opacity` < 1\n- `transform`, `filter`, `perspective`\n- `isolation: isolate`\n- and other properties\n\n**Key point:** z-index only works within its own stacking context!\n\n```css\n.parent { position: relative; z-index: 1; }\n.child  { position: relative; z-index: 999; }\n.other  { position: relative; z-index: 2; }\n\n/* child (999) will NOT overlap other (2),\n   because parent (1) < other (2) */\n```',
        tags: ['stacking-context', 'z-index', 'positioning'],
        order: 4,
      },
    }),
  ]);

  // Browser cards
  await Promise.all([
    prisma.card.upsert({
      where: { id: 'browser-001' },
      update: {},
      create: {
        id: 'browser-001',
        categoryId: browser.id,
        difficulty: 'HARD',
        questionRu: 'Как браузер отображает страницу? Опиши Critical Rendering Path.',
        questionEn: 'How does the browser render a page? Describe the Critical Rendering Path.',
        answerRu: '**Critical Rendering Path** — последовательность шагов от HTML до пикселей на экране:\n\n1. **Parse HTML → DOM** — парсинг HTML в дерево объектов\n2. **Parse CSS → CSSOM** — парсинг CSS в дерево стилей\n3. **DOM + CSSOM → Render Tree** — объединение видимых элементов со стилями\n4. **Layout (Reflow)** — вычисление размеров и позиций\n5. **Paint** — отрисовка пикселей\n6. **Composite** — склейка слоёв на GPU\n\n**Блокирующие ресурсы:**\n- CSS блокирует рендеринг\n- `<script>` без `async/defer` блокирует парсинг HTML\n\n**Оптимизации:** `async`/`defer` для скриптов, минификация CSS, критический CSS inline.',
        answerEn: '**Critical Rendering Path** — sequence of steps from HTML to pixels on screen:\n\n1. **Parse HTML → DOM** — parse HTML into object tree\n2. **Parse CSS → CSSOM** — parse CSS into style tree\n3. **DOM + CSSOM → Render Tree** — combine visible elements with styles\n4. **Layout (Reflow)** — calculate sizes and positions\n5. **Paint** — draw pixels\n6. **Composite** — merge layers on GPU\n\n**Blocking resources:**\n- CSS blocks rendering\n- `<script>` without `async/defer` blocks HTML parsing\n\n**Optimizations:** `async`/`defer` for scripts, CSS minification, critical CSS inline.',
        tags: ['rendering', 'dom', 'cssom', 'performance'],
        order: 1,
      },
    }),
    prisma.card.upsert({
      where: { id: 'browser-002' },
      update: {},
      create: {
        id: 'browser-002',
        categoryId: browser.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое event bubbling и capturing?',
        questionEn: 'What is event bubbling and capturing?',
        answerRu: 'При клике на элемент событие проходит 3 фазы:\n\n1. **Capturing** (перехват) — от window вниз до цели\n2. **Target** — на самом элементе\n3. **Bubbling** (всплытие) — от цели вверх до window\n\n```js\n// По умолчанию — bubbling фаза\nelement.addEventListener("click", handler);\n\n// Capturing фаза\nelement.addEventListener("click", handler, true);\n\n// Остановить всплытие\nevent.stopPropagation();\n\n// Остановить всплытие + другие обработчики на этом элементе\nevent.stopImmediatePropagation();\n```\n\n**Event Delegation** — используй всплытие чтобы вешать один обработчик на родителя вместо многих на детей.',
        answerEn: 'When clicking an element, the event passes through 3 phases:\n\n1. **Capturing** — from window down to the target\n2. **Target** — on the element itself\n3. **Bubbling** — from target up to window\n\n```js\n// Default — bubbling phase\nelement.addEventListener("click", handler);\n\n// Capturing phase\nelement.addEventListener("click", handler, true);\n\n// Stop bubbling\nevent.stopPropagation();\n\n// Stop bubbling + other handlers on this element\nevent.stopImmediatePropagation();\n```\n\n**Event Delegation** — use bubbling to attach one handler to a parent instead of many handlers to children.',
        tags: ['events', 'bubbling', 'capturing', 'delegation'],
        order: 2,
      },
    }),
    prisma.card.upsert({
      where: { id: 'browser-003' },
      update: {},
      create: {
        id: 'browser-003',
        categoryId: browser.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое LocalStorage, SessionStorage и Cookie? В чём отличия?',
        questionEn: 'What are LocalStorage, SessionStorage and Cookies? What are the differences?',
        answerRu: '|  | localStorage | sessionStorage | Cookie |\n|---|---|---|---|\n| Объём | ~5-10MB | ~5MB | ~4KB |\n| Срок жизни | Бессрочно | Вкладка | Задаётся |\n| Отправка на сервер | ❌ | ❌ | ✅ автоматически |\n| Доступ из JS | ✅ | ✅ | ✅ (если не httpOnly) |\n| Домен | Текущий | Текущий | Настраивается |\n\n```js\n// localStorage\nlocalStorage.setItem("key", "value");\nlocalStorage.getItem("key");\nlocalStorage.removeItem("key");\n\n// sessionStorage — тот же API\nsessionStorage.setItem("key", "value");\n```\n\n**Cookie флаги безопасности:** `HttpOnly` (нет доступа из JS), `Secure` (только HTTPS), `SameSite` (защита от CSRF).',
        answerEn: '|  | localStorage | sessionStorage | Cookie |\n|---|---|---|---|\n| Size | ~5-10MB | ~5MB | ~4KB |\n| Lifetime | Permanent | Tab session | Configurable |\n| Sent to server | ❌ | ❌ | ✅ automatically |\n| JS access | ✅ | ✅ | ✅ (if not httpOnly) |\n| Domain | Current | Current | Configurable |\n\n```js\n// localStorage\nlocalStorage.setItem("key", "value");\nlocalStorage.getItem("key");\nlocalStorage.removeItem("key");\n\n// sessionStorage — same API\nsessionStorage.setItem("key", "value");\n```\n\n**Cookie security flags:** `HttpOnly` (no JS access), `Secure` (HTTPS only), `SameSite` (CSRF protection).',
        tags: ['storage', 'localstorage', 'cookies', 'security'],
        order: 3,
      },
    }),
    prisma.card.upsert({
      where: { id: 'browser-004' },
      update: {},
      create: {
        id: 'browser-004',
        categoryId: browser.id,
        difficulty: 'HARD',
        questionRu: 'Что такое CORS и как он работает?',
        questionEn: 'What is CORS and how does it work?',
        answerRu: '**CORS (Cross-Origin Resource Sharing)** — механизм браузера, контролирующий запросы между разными источниками (origin = protocol + host + port).\n\n**Preflight запрос** — браузер отправляет OPTIONS перед реальным запросом, если:\n- Метод не GET/POST/HEAD\n- Нестандартные заголовки\n- Content-Type не простой\n\n```\nBrowser → OPTIONS /api/data → Server\nBrowser ← Access-Control-Allow-Origin: * ← Server\nBrowser → POST /api/data → Server\n```\n\n**Нужные заголовки сервера:**\n```\nAccess-Control-Allow-Origin: https://mysite.com\nAccess-Control-Allow-Methods: GET, POST\nAccess-Control-Allow-Headers: Content-Type\n```\n\nCORS — защита браузера, не сервера. curl не соблюдает CORS.',
        answerEn: '**CORS (Cross-Origin Resource Sharing)** — browser mechanism controlling requests between different origins (origin = protocol + host + port).\n\n**Preflight request** — browser sends OPTIONS before the real request if:\n- Method is not GET/POST/HEAD\n- Non-standard headers\n- Content-Type is not simple\n\n```\nBrowser → OPTIONS /api/data → Server\nBrowser ← Access-Control-Allow-Origin: * ← Server\nBrowser → POST /api/data → Server\n```\n\n**Required server headers:**\n```\nAccess-Control-Allow-Origin: https://mysite.com\nAccess-Control-Allow-Methods: GET, POST\nAccess-Control-Allow-Headers: Content-Type\n```\n\nCORS is a browser protection, not a server one. curl ignores CORS.',
        tags: ['cors', 'security', 'http', 'preflight'],
        order: 4,
      },
    }),
    prisma.card.upsert({
      where: { id: 'browser-005' },
      update: {},
      create: {
        id: 'browser-005',
        categoryId: browser.id,
        difficulty: 'MEDIUM',
        questionRu: 'Что такое reflow и repaint? Как их минимизировать?',
        questionEn: 'What are reflow and repaint? How to minimize them?',
        answerRu: '**Reflow (layout)** — пересчёт геометрии элементов (дорого!). Вызывается:\n- Изменением размеров/позиций\n- Добавлением/удалением DOM-элементов\n- Чтением layout-свойств (offsetWidth, getBoundingClientRect)\n\n**Repaint** — перерисовка пикселей без изменения геометрии (дешевле).\n\n**Как минимизировать:**\n```js\n// ❌ Плохо — читаем и пишем поочерёдно (layout thrashing)\nfor (const el of elements) {\n  el.style.width = el.offsetWidth + 10 + "px";\n}\n\n// ✅ Хорошо — сначала все чтения, потом все записи\nconst widths = elements.map(el => el.offsetWidth);\nelements.forEach((el, i) => {\n  el.style.width = widths[i] + 10 + "px";\n});\n```\n\nИспользуй `transform` и `opacity` — они не вызывают reflow.',
        answerEn: '**Reflow (layout)** — recalculation of element geometry (expensive!). Triggered by:\n- Size/position changes\n- Adding/removing DOM elements\n- Reading layout properties (offsetWidth, getBoundingClientRect)\n\n**Repaint** — redrawing pixels without geometry changes (cheaper).\n\n**How to minimize:**\n```js\n// ❌ Bad — interleaved reads/writes (layout thrashing)\nfor (const el of elements) {\n  el.style.width = el.offsetWidth + 10 + "px";\n}\n\n// ✅ Good — batch reads first, then writes\nconst widths = elements.map(el => el.offsetWidth);\nelements.forEach((el, i) => {\n  el.style.width = widths[i] + 10 + "px";\n});\n```\n\nUse `transform` and `opacity` — they don\'t trigger reflow.',
        tags: ['reflow', 'repaint', 'performance', 'rendering'],
        order: 5,
      },
    }),
  ]);

  console.log('✅ Seed completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
