import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";

function dbError(e) {
  console.error("Admin inquiries API failed:", e);
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
    const res = await query(
      "SELECT id, name, email, service, budget, timeline, message, status, created_at FROM quotes ORDER BY created_at DESC"
    );
    return NextResponse.json({ ok: true, inquiries: res.rows });
  } catch (e) {
    return dbError(e);
  }
}
