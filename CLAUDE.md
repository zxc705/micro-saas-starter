# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Micro SaaS Starter

A production-ready Next.js starter for building AI-powered SaaS apps. Auth, payments, and Claude AI integration out of the box.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Prisma + SQLite (swap to PostgreSQL for prod)
- **Auth**: NextAuth v5 (Credentials + OAuth)
- **Payments**: Stripe
- **AI**: Anthropic Claude SDK
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
npm run db:push    # Push Prisma schema to DB
npm run db:studio  # Open Prisma Studio (DB GUI)
npm run db:generate # Generate Prisma client
```

## Architecture

src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Landing page
│   ├── login/page.tsx      # Sign-in
│   ├── register/page.tsx   # Registration
│   ├── dashboard/page.tsx  # User dashboard (protected)
│   └── api/
│       ├── auth/           # NextAuth handlers + register
│       ├── ai/chat/        # Claude AI proxy (quota-enforced)
│       └── payment/        # Stripe checkout
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Singleton Prisma client
│   ├── stripe.ts           # Stripe client + plan definitions
│   ├── claude.ts           # Claude API wrapper w/ tracking
│   └── utils.ts            # cn(), formatters
└── components/             # Reusable UI components

## Key Patterns

- **Auth flow**: `lib/auth.ts` → `[...nextauth]` route + `auth()` in Server Components
- **AI calls**: Always go through `/api/ai/chat` (not direct) — enforces quotas, tracks usage
- **Payments**: Plans defined in `lib/stripe.ts` PLANS constant; checkout via `/api/payment/checkout`
- **DB**: `lib/prisma.ts` exports a global singleton; import `prisma` directly

## Env Setup

Copy `.env.example` → `.env` and fill in:
- `AUTH_SECRET` (generate: `openssl rand -base64 32`)
- `STRIPE_SECRET_KEY` (from Stripe dashboard)
- `ANTHROPIC_API_KEY` (from Anthropic console)
