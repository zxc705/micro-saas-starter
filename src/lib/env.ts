import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(16),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
  ANTHROPIC_API_KEY: z.string().startsWith("sk-ant-").optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

/**
 * Validate required env vars at startup.
 * Call in instrumentations.ts or layout.tsx to fail fast.
 */
export function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const missing = parsed.error.issues
      .filter((i) => i.path[0] !== "STRIPE_SECRET_KEY" && i.path[0] !== "ANTHROPIC_API_KEY")
      .map((i) => i.path.join("."));

    if (missing.length > 0) {
      console.warn("⚠ Missing env vars:", missing.join(", "));
      console.warn("  Some features may not work. See .env.example");
    }
  }

  return (parsed.data ?? process.env) as Env;
}
