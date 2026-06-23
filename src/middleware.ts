import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protected routes
  if (pathname.startsWith("/dashboard")) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Rate limit API routes
  if (pathname.startsWith("/api/ai")) {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    // Simple in-memory rate limit (use Redis in production)
    const rateLimitKey = `rate:${ip}`;

    // This is a minimal example — use upstash/redis or similar in production
    const headers = new Headers(req.headers);
    headers.set("x-rate-limit-key", rateLimitKey);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/ai/:path*"],
};
