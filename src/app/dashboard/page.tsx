import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PLANS } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { BarChart3, CreditCard, Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id: string }).id;

  const [subscription, aiUsages] = await Promise.all([
    prisma.subscription.findFirst({ where: { userId } }),
    prisma.aiUsage.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const plan = PLANS[(subscription?.plan as keyof typeof PLANS) ?? "free"];
  const totalTokens = aiUsages.reduce((s, u) => s + u.tokensIn + u.tokensOut, 0);
  const totalCost = aiUsages.reduce((s, u) => s + u.cost, 0);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">
        Welcome, {session.user.name ?? "Maker"}!
      </h1>

      {/* Stats */}
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {[
          { icon: CreditCard, label: "Plan", value: plan.name, sub: `$${plan.price}/mo` },
          { icon: Sparkles, label: "AI Tokens Used", value: totalTokens.toLocaleString(), sub: `$${totalCost.toFixed(4)} cost` },
          { icon: BarChart3, label: "AI Calls", value: `${aiUsages.length}`, sub: `${plan.aiCallsPerMonth}/mo limit` },
        ].map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="rounded-xl border border-gray-200 p-5">
            <Icon className="h-8 w-8 text-brand-600" />
            <p className="mt-2 text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent AI Usage */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Recent AI Calls</h2>
        {aiUsages.length === 0 ? (
          <p className="mt-4 text-gray-500">No AI calls yet. Start building!</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-2">Model</th>
                  <th>Tokens In</th>
                  <th>Tokens Out</th>
                  <th>Cost</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {aiUsages.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2">{u.model}</td>
                    <td>{u.tokensIn.toLocaleString()}</td>
                    <td>{u.tokensOut.toLocaleString()}</td>
                    <td>${u.cost.toFixed(6)}</td>
                    <td>{u.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
