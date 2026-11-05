import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, passwordsMatch } from "@/lib/admin-auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req) {
  try {
    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "Missing env var: ADMIN_PASSWORD" },
        { status: 500 }
      );
    }
    if (!process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { ok: false, error: "Missing env var: ADMIN_SESSION_SECRET" },
        { status: 500 }
      );
    }

    const rl = rateLimit(`login:${clientIp(req)}`, 10, 60 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { password } = await req.json().catch(() => ({}));
    if (!passwordsMatch(password)) {
      return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
    }

    const session = await createSessionCookie();
    cookies().set(session.name, session.value, session.options);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/admin/login failed:", e);
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Login failed. Please try again.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
