import { NextResponse } from "next/server";
import { Resend } from "resend";
import { query } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { services, site } from "@/lib/content";

const BUDGETS = ["Under $250", "$250 – $500", "$500 – $1,000", "$1,000+", "Not sure yet"];
const TIMELINES = ["As soon as possible", "Within 2–4 weeks", "Within 1–2 months", "Flexible"];
const SERVICE_NAMES = [...services.map((s) => s.name), "Not sure yet — please advise"];

export async function POST(req) {
  try {
    const rl = rateLimit(`quote:${clientIp(req)}`, 5, 60 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions from this address. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }
    const { name, email, service, budget, timeline, message, website, website_url, reference_sites } = body;

    // Honeypot field: real users never fill it; bots usually do.
    if (website) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const errors = [];

    // Optional fields (added with the quote-form update). website_url is kept
    // separate from the honeypot field named "website".
    let cleanWebsiteUrl = "";
    if (website_url !== undefined && website_url !== null && String(website_url).trim() !== "") {
      const raw = String(website_url).trim();
      if (raw.length > 500) errors.push("Website URL must be under 500 characters.");
      else {
        try {
          const parsed = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
          if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("bad protocol");
          cleanWebsiteUrl = parsed.toString();
        } catch {
          errors.push("Website URL does not look like a valid web address.");
        }
      }
    }
    let cleanReferenceSites = "";
    if (reference_sites !== undefined && reference_sites !== null && String(reference_sites).trim() !== "") {
      cleanReferenceSites = String(reference_sites).trim();
      if (cleanReferenceSites.length > 1000) errors.push("Reference websites must be under 1000 characters.");
    }

    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      errors.push("Name must be 2–100 characters.");
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.push("A valid email address is required.");
    }
    if (!SERVICE_NAMES.includes(service)) errors.push("Please choose a service.");
    if (!BUDGETS.includes(budget)) errors.push("Please choose a budget range.");
    if (!TIMELINES.includes(timeline)) errors.push("Please choose a timeline.");
    if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 2000) {
      errors.push("Project details must be 10–2000 characters.");
    }
    if (errors.length) {
      return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { ok: false, error: "Server is not configured yet (missing env var: DATABASE_URL)." },
        { status: 500 }
      );
    }

    await query(
      "INSERT INTO quotes (name, email, service, budget, timeline, message, website_url, reference_sites) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [name.trim(), email.trim(), service, budget, timeline, message.trim(), cleanWebsiteUrl || null, cleanReferenceSites || null]
    );

    // Email alert is fail-soft: a Resend failure must never lose the inquiry,
    // which is already saved in the database.
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM || "AH Digital Solutions <onboarding@resend.dev>",
          to: site.email,
          subject: `New quote inquiry — ${service}`,
          text: [
            "New quote inquiry from ah-digital-solutions.vercel.app",
            "",
            `Name: ${name.trim()}`,
            `Email: ${email.trim()}`,
            `Service: ${service}`,
            `Budget: ${budget}`,
            `Timeline: ${timeline}`,
            `Website URL: ${cleanWebsiteUrl || "-"}`,
            `Reference websites: ${cleanReferenceSites || "-"}`,
            "",
            "Project details:",
            message.trim(),
          ].join("\n"),
        });
      } catch (e) {
        console.error("Resend email alert failed (inquiry still saved):", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/quote failed:", e);
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Something went wrong. Please try again or email us directly.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
