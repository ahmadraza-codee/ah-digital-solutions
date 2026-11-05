import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";

const KEYS = ["services", "projects", "articles", "settings"];

function dbError(e) {
  console.error("Admin content API failed:", e);
  const msg =
    e && typeof e.message === "string" && e.message.startsWith("Missing env var")
      ? e.message
      : "Database unavailable. Check that DATABASE_URL is set and schema.sql was applied.";
  return NextResponse.json({ ok: false, error: msg }, { status: 500 });
}

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  try {
    const res = await query("SELECT key, value FROM content_overrides");
    return NextResponse.json({
      ok: true,
      overrides: Object.fromEntries(res.rows.map((r) => [r.key, r.value])),
    });
  } catch (e) {
    return dbError(e);
  }
}

export async function POST(req) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }
    const { key, value } = body;
    if (!KEYS.includes(key)) {
      return NextResponse.json(
        { ok: false, error: "Key must be one of: services, projects, articles, settings." },
        { status: 400 }
      );
    }
    if (key === "settings") {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return NextResponse.json({ ok: false, error: "Settings must be an object." }, { status: 400 });
      }
    } else if (!Array.isArray(value)) {
      return NextResponse.json({ ok: false, error: `${key} must be an array.` }, { status: 400 });
    }

    await query(
      `INSERT INTO content_overrides (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [key, JSON.stringify(value)]
    );

    // Public pages read the merged content; revalidate them so the new
    // values go live without a redeploy.
    for (const p of ["/", "/services", "/portfolio", "/blog", "/admin"]) {
      revalidatePath(p);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return dbError(e);
  }
}
