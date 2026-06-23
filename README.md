# 🚀 Micro SaaS Starter

> Launch your AI-powered SaaS in minutes, not months.

Auth, payments (Stripe), and Claude AI integration — all wired together in a modern Next.js stack. Start with this, ship your product.

## ✨ What's Included

- **🔐 Auth** — Email/Password + GitHub/Google OAuth via NextAuth v5
- **💳 Payments** — Stripe subscriptions with Free/Pro/Enterprise plans
- **🤖 AI** — Claude API client with usage tracking, cost estimation, and per-plan quotas
- **📊 Dashboard** — User dashboard with AI usage analytics
- **🎨 UI** — Clean Tailwind CSS design, responsive, light/dark ready
- **🗄️ DB** — Prisma ORM + SQLite (swap to PostgreSQL in one line)

## 🏁 Quick Start

```bash
# 1. Clone
git clone https://github.com/xiaoluo0213/micro-saas-starter.git
cd micro-saas-starter

# 2. Install
npm install

# 3. Configure
cp .env.example .env
# Fill in AUTH_SECRET, STRIPE_SECRET_KEY, ANTHROPIC_API_KEY

# 4. Set up database
npx prisma db push

# 5. Launch
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Auth | NextAuth v5 |
| Database | Prisma + SQLite |
| Payments | Stripe |
| AI | Anthropic Claude SDK |
| Styling | Tailwind CSS |
| Icons | Lucide React |

## 🚢 Production Features

- **Docker** — Multi-stage build + docker-compose with PostgreSQL
- **CI/CD** — GitHub Actions: lint → type-check → build
- **Middleware** — Route protection for dashboard & API rate limits
- **Env Validation** — Zod schema validates .env at startup
- **Webhooks** — Stripe webhook handler for subscription lifecycle
- **Seed** — `npm run db:seed` creates a demo user

## 🔧 Environment Variables

See `.env.example` for all required variables:

```
DATABASE_URL=          # file:./dev.db (SQLite) or PostgreSQL URL
AUTH_SECRET=           # openssl rand -base64 32
STRIPE_SECRET_KEY=     # From Stripe dashboard
ANTHROPIC_API_KEY=     # From Anthropic console
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                # Landing page
│   ├── login/page.tsx          # Sign in
│   ├── register/page.tsx       # Registration
│   ├── dashboard/page.tsx      # User dashboard (protected)
│   └── api/
│       ├── auth/               # Auth endpoints
│       ├── ai/chat/            # Claude AI proxy
│       └── payment/            # Stripe checkout
├── lib/
│   ├── auth.ts                 # NextAuth config
│   ├── prisma.ts               # Prisma client
│   ├── stripe.ts               # Stripe + plans
│   ├── claude.ts               # Claude wrapper
│   └── utils.ts                # Helpers
└── components/                 # UI components
```

## 🎯 Customize for Your SaaS

1. **Define your plans** in `src/lib/stripe.ts` → `PLANS`
2. **Add your AI prompts** in your app code using `callClaude()`
3. **Build your features** on top of the dashboard
4. **Set up Stripe webhooks** for production
5. **Swap SQLite → PostgreSQL** in `prisma/schema.prisma` + `.env`

## 📝 License

MIT — use this for anything. Build something people want.
