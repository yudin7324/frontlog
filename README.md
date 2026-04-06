# FrontLog

**Spaced repetition flashcards for frontend interview preparation.**

Study JavaScript, TypeScript, React, Next.js, CSS, algorithms and more — using the SM-2 algorithm to review cards at the right time.

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

## Roadmap

### v1.1 — UX improvements
- [ ] Search within categories
- [ ] Bookmarks — mark cards to revisit
- [ ] Streak protection notification
- [ ] Onboarding for new users

### v1.2 — Content
- [ ] New categories: Node.js, GraphQL, Docker, Accessibility
- [ ] Filter by difficulty within a category
- [ ] Filter by tags

### v2.0 — New formats
- [ ] Algorithm challenges (text-based, frontend-focused)
- [ ] Mock interview mode — timed session, no hints, final score
- [ ] Quiz mode — multiple choice instead of open-ended

### v2.5 — Social
- [ ] Public profile with shareable progress
- [ ] Achievements and badges (30-day streak, 100 cards, etc.)
- [ ] Weekly leaderboard

### v3.0 — Monetization
- [ ] Pro subscription — advanced analytics, exclusive categories
- [ ] Team / corporate plan
- [ ] Public API


1 - Замыкания в JS надо поправить
2 - пофиксить заполнение и хранение прогресса в БД
