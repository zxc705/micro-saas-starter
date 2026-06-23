import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { callClaude } from "@/lib/claude";
import { prisma } from "@/lib/prisma";
import { PLANS } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  // Check plan quota
  const sub = await prisma.subscription.findFirst({ where: { userId } });
  const plan = PLANS[(sub?.plan as keyof typeof PLANS) ?? "free"];

  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);

  const monthlyCalls = await prisma.aiUsage.count({
    where: { userId, createdAt: { gte: thisMonth } },
  });

  if (monthlyCalls >= plan.aiCallsPerMonth) {
    return NextResponse.json(
      { error: `Monthly AI quota exceeded (${plan.aiCallsPerMonth} calls). Upgrade your plan.` },
      { status: 429 },
    );
  }

  try {
    const { system, message } = await req.json();
    const result = await callClaude(system ?? "You are a helpful assistant.", message, { userId });
    return NextResponse.json(result);
  } catch (err) {
    console.error("AI chat error:", err);
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 },
    );
  }
}
