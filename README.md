# FrontLog

**Spaced repetition flashcards for frontend interview preparation.**

Study JavaScript, TypeScript, React, Next.js, CSS, algorithms and more — using the SM-2 algorithm to review cards at the right time.

## Architecture

[Feature-Sliced Design (FSD)](https://feature-sliced.design/) — `src/` is organized into layers:

```
shared/    — UI primitives, utils, auth, i18n
entities/  — business entities: card (SM-2), category
features/  — user scenarios: reset progress, update settings, sign out
widgets/   — composite UI blocks: navbar, study session, dashboard, heatmap
app/       — Next.js App Router (pages layer)
```

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Prisma** + PostgreSQL (Neon)
- **NextAuth.js** — GitHub & Google OAuth
- **Tailwind CSS v4**
- **next-intl** — i18n (ru / en)

## Getting Started

```bash
npm install
cp .env.example .env  # fill in DB and OAuth credentials
npx prisma db push
npm run db:seed
npm run dev
```
