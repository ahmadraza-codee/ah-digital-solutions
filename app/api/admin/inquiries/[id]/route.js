import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/db";

const STATUSES = ["new", "contacted", "closed"];

export async function PATCH(req, { params }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { status } = await req.json().catch(() => ({}));
    if (!STATUSES.includes(status)) {
      return NextResponse.json(
        { ok: false, error: "Status must be one of: new, contacted, closed." },
        { status: 400 }
      );
    }
    const res = await query("UPDATE quotes SET status = $1 WHERE id = $2 RETURNING id", [
      status,
      params.id,
    ]);
    if (res.rowCount === 0) {
      return NextResponse.json({ ok: false, error: "Inquiry not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PATCH /api/admin/inquiries failed:", e);
    if (e && e.code === "22P02") {
      return NextResponse.json({ ok: false, error: "Invalid inquiry id." }, { status: 400 });
    }
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Database unavailable.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  try {
    const res = await query("DELETE FROM quotes WHERE id = $1 RETURNING id", [params.id]);
    if (res.rowCount === 0) {
      return NextResponse.json({ ok: false, error: "Inquiry not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/admin/inquiries failed:", e);
    if (e && e.code === "22P02") {
      return NextResponse.json({ ok: false, error: "Invalid inquiry id." }, { status: 400 });
    }
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Database unavailable.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
