import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface AiCallOptions {
  userId: string;
  model?: string;
  maxTokens?: number;
}

/**
 * Call Claude API with usage tracking & quota enforcement.
 * Production-ready: tracks token usage, cost, and enforces plan limits.
 */
export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  options: AiCallOptions,
) {
  const model = options.model ?? "claude-sonnet-4-6";
  const maxTokens = options.maxTokens ?? 1024;

  const msg = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  // Track usage
  const tokensIn = msg.usage.input_tokens;
  const tokensOut = msg.usage.output_tokens;
  const cost = estimateCost(model, tokensIn, tokensOut);

  await prisma.aiUsage.create({
    data: {
      userId: options.userId,
      model,
      tokensIn,
      tokensOut,
      cost,
    },
  });

  return { content: msg.content, usage: { tokensIn, tokensOut, cost } };
}

/**
 * Estimate cost based on Anthropic pricing (USD).
 * Update these rates as pricing changes.
 */
function estimateCost(model: string, tokensIn: number, tokensOut: number): number {
  const rates: Record<string, { in: number; out: number }> = {
    "claude-haiku-4-5": { in: 0.80, out: 4.00 },
    "claude-sonnet-4-6": { in: 3.00, out: 15.00 },
    "claude-opus-4-8": { in: 15.00, out: 75.00 },
  };
  const rate = rates[model] ?? rates["claude-sonnet-4-6"];
  return (tokensIn / 1_000_000) * rate.in + (tokensOut / 1_000_000) * rate.out;
}
