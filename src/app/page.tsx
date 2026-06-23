import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Launch Your{" "}
          <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered SaaS
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Micro SaaS Starter gives you auth, payments, and Claude AI integration
          out of the box. Build your next product in hours, not weeks.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Auth Ready",
              desc: "Email/password + GitHub + Google OAuth. NextAuth v5 with Prisma adapter.",
            },
            {
              icon: Shield,
              title: "Payments Built-In",
              desc: "Stripe integration with Free/Pro/Enterprise plans. Ready for real customers.",
            },
            {
              icon: Sparkles,
              title: "Claude AI Included",
              desc: "Pre-built AI client with usage tracking, cost estimation, and quota management.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 p-6 hover:border-brand-500 transition-colors"
            >
              <Icon className="h-10 w-10 text-brand-600" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        Built with ❤️ using Next.js, Prisma, NextAuth, Stripe &amp; Claude
      </footer>
    </main>
  );
}
