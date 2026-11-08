// AH Digital Solutions — Express API backend (Render).
// Mirrors the Next.js API routes in nextjs/app/api/ behaviour exactly:
//   POST /api/quote, POST /api/admin/login, GET /api/admin/me,
//   POST /api/admin/logout, GET /api/admin/inquiries,
//   PATCH/DELETE /api/admin/inquiries/:id,
//   GET /api/admin/content, POST+PUT /api/admin/content,
//   GET /api/content (public overrides), GET /health
//
// Database: same Supabase Postgres as the Next.js app (DATABASE_URL).
// Schema: nextjs/schema.sql (quotes + content_overrides).
// No secrets in this file — everything comes from env vars (see .env.example).
// The Next.js /api/* routes are kept as fallback until this backend is
// verified live on Render.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const { timingSafeEqual } = require("node:crypto");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === "production";
const ADMIN_COOKIE = "ah_admin";
const OWNER_EMAIL = "ahmadraza3430178@gmail.com";
const FRONTEND_URL = "https://ah-digital-solutions.vercel.app";

// Render sits behind a proxy — trust it so req.ip is the real client IP.
app.set("trust proxy", 1);
app.use(express.json({ limit: "100kb" }));
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
  })
);

// ---------------------------------------------------------------- DB ----
let pool = null;
function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Missing env var: DATABASE_URL");
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Supabase requires SSL; the pooler uses a certificate the driver
      // cannot verify against a public CA in this setup.
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return pool;
}

async function query(text, params) {
  const client = await getPool().connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// ------------------------------------------------------- rate limits ----
const quoteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req, res) =>
    res.status(429).json({
      ok: false,
      error: "Too many submissions from this address. Please try again later.",
    }),
});

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req, res) =>
    res.status(429).json({
      ok: false,
      error: "Too many login attempts. Please try again later.",
    }),
});

// ------------------------------------------------------------ auth ------
function sessionSecret() {
  if (!process.env.ADMIN_SESSION_SECRET) {
    throw new Error("Missing env var: ADMIN_SESSION_SECRET");
  }
  return process.env.ADMIN_SESSION_SECRET;
}

// Timing-safe password comparison against ADMIN_PASSWORD (env var).
function passwordsMatch(input) {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("Missing env var: ADMIN_PASSWORD");
  }
  const a = Buffer.from(typeof input === "string" ? input : "");
  const b = Buffer.from(process.env.ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function parseCookies(req) {
  const out = {};
  const header = req.headers.cookie;
  if (!header) return out;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function verifyAdmin(req) {
  try {
    const token = parseCookies(req)[ADMIN_COOKIE];
    if (!token) return false;
    jwt.verify(token, sessionSecret(), { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  if (!verifyAdmin(req)) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  next();
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: isProd,
  };
}

// ---------------------------------------------------------- health ------
app.get("/health", (_req, res) => res.json({ ok: true }));

// ----------------------------------------------------------- quote ------
// Validation lists mirror nextjs/app/api/quote/route.js exactly.
// SERVICE_NAMES must stay in sync with lib/content.js services[].name.
const BUDGETS = ["Under $250", "$250 – $500", "$500 – $1,000", "$1,000+", "Not sure yet"];
const TIMELINES = ["As soon as possible", "Within 2–4 weeks", "Within 1–2 months", "Flexible"];
const SERVICE_NAMES = [
  "Business Website Development",
  "Shopify eCommerce Development",
  "SEO Services",
  "Full-Stack Development",
  "AI Web Development",
  "Flutter App Development",
  "Not sure yet — please advise",
];

app.post("/api/quote", quoteLimiter, async (req, res) => {
  try {
    const body = req.body;
    if (!body || typeof body !== "object") {
      return res.status(400).json({ ok: false, error: "Invalid request." });
    }
    const { name, email, service, budget, timeline, message, website, website_url, reference_sites } = body;

    // Honeypot field: real users never fill it; bots usually do.
    if (website) {
      return res.status(400).json({ ok: false, error: "Invalid request." });
    }

    const errors = [];

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
      return res.status(400).json({ ok: false, error: errors.join(" ") });
    }

    if (!process.env.DATABASE_URL) {
      return res
        .status(500)
        .json({ ok: false, error: "Server is not configured yet (missing env var: DATABASE_URL)." });
    }

    const inserted = await query(
      "INSERT INTO quotes (name, email, service, budget, timeline, message, website_url, reference_sites) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [name.trim(), email.trim(), service, budget, timeline, message.trim(), cleanWebsiteUrl || null, cleanReferenceSites || null]
    );

    // Email alert is fail-soft: a Resend failure must never lose the inquiry,
    // which is already saved in the database.
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM || "AH Digital Solutions <onboarding@resend.dev>",
          to: OWNER_EMAIL,
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

    return res.status(201).json({ ok: true, id: inserted.rows[0].id });
  } catch (e) {
    console.error("POST /api/quote failed:", e);
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Something went wrong. Please try again or email us directly.";
    return res.status(500).json({ ok: false, error: msg });
  }
});

// ------------------------------------------------------------ admin -----
app.post("/api/admin/login", loginLimiter, async (req, res) => {
  try {
    if (!process.env.ADMIN_PASSWORD) {
      return res.status(500).json({ ok: false, error: "Missing env var: ADMIN_PASSWORD" });
    }
    if (!process.env.ADMIN_SESSION_SECRET) {
      return res.status(500).json({ ok: false, error: "Missing env var: ADMIN_SESSION_SECRET" });
    }
    const { password } = req.body || {};
    if (!passwordsMatch(password)) {
      return res.status(401).json({ ok: false, error: "Incorrect password." });
    }
    const token = jwt.sign({ admin: true }, sessionSecret(), {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    res.cookie(ADMIN_COOKIE, token, cookieOptions());
    return res.json({ ok: true });
  } catch (e) {
    console.error("POST /api/admin/login failed:", e);
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Login failed. Please try again.";
    return res.status(500).json({ ok: false, error: msg });
  }
});

app.post("/api/admin/logout", (_req, res) => {
  res.clearCookie(ADMIN_COOKIE, { path: "/" });
  return res.json({ ok: true });
});

app.get("/api/admin/me", (req, res) => res.json({ loggedIn: verifyAdmin(req) }));

app.get("/api/admin/inquiries", requireAdmin, async (_req, res) => {
  try {
    const result = await query(
      "SELECT id, name, email, service, budget, timeline, message, website_url, reference_sites, status, created_at FROM quotes ORDER BY created_at DESC"
    );
    return res.json({ ok: true, inquiries: result.rows });
  } catch (e) {
    console.error("Admin inquiries API failed:", e);
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Database unavailable. Check that DATABASE_URL is set and schema.sql was applied.";
    return res.status(500).json({ ok: false, error: msg });
  }
});

const STATUSES = ["new", "contacted", "closed"];

app.patch("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ ok: false, error: "Status must be one of: new, contacted, closed." });
    }
    const result = await query("UPDATE quotes SET status = $1 WHERE id = $2 RETURNING id", [status, req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ ok: false, error: "Inquiry not found." });
    }
    return res.json({ ok: true });
  } catch (e) {
    console.error("PATCH /api/admin/inquiries failed:", e);
    if (e && e.code === "22P02") {
      return res.status(400).json({ ok: false, error: "Invalid inquiry id." });
    }
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Database unavailable.";
    return res.status(500).json({ ok: false, error: msg });
  }
});

app.delete("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
  try {
    const result = await query("DELETE FROM quotes WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ ok: false, error: "Inquiry not found." });
    }
    return res.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/admin/inquiries failed:", e);
    if (e && e.code === "22P02") {
      return res.status(400).json({ ok: false, error: "Invalid inquiry id." });
    }
    const msg =
      e && typeof e.message === "string" && e.message.startsWith("Missing env var")
        ? e.message
        : "Database unavailable.";
    return res.status(500).json({ ok: false, error: msg });
  }
});

// ----------------------------------------------------------- content ----
const CONTENT_KEYS = ["services", "projects", "articles", "settings"];

function dbError(e, res) {
  console.error("Admin content API failed:", e);
  const msg =
    e && typeof e.message === "string" && e.message.startsWith("Missing env var")
      ? e.message
      : "Database unavailable. Check that DATABASE_URL is set and schema.sql was applied.";
  return res.status(500).json({ ok: false, error: msg });
}

app.get("/api/admin/content", requireAdmin, async (_req, res) => {
  try {
    const result = await query("SELECT key, value FROM content_overrides");
    return res.json({ ok: true, overrides: Object.fromEntries(result.rows.map((r) => [r.key, r.value])) });
  } catch (e) {
    return dbError(e, res);
  }
});

// PUT is the canonical save method; POST is accepted as an alias so the
// existing Next.js admin page (which POSTs) keeps working if it is ever
// pointed at this backend.
async function saveContent(req, res) {
  try {
    const body = req.body;
    if (!body || typeof body !== "object") {
      return res.status(400).json({ ok: false, error: "Invalid request." });
    }
    const { key, value } = body;
    if (!CONTENT_KEYS.includes(key)) {
      return res.status(400).json({ ok: false, error: "Key must be one of: services, projects, articles, settings." });
    }
    if (key === "settings") {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return res.status(400).json({ ok: false, error: "Settings must be an object." });
      }
    } else if (!Array.isArray(value)) {
      return res.status(400).json({ ok: false, error: `${key} must be an array.` });
    }
    await query(
      `INSERT INTO content_overrides (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [key, JSON.stringify(value)]
    );
    return res.json({ ok: true });
  } catch (e) {
    return dbError(e, res);
  }
}
app.put("/api/admin/content", requireAdmin, saveContent);
app.post("/api/admin/content", requireAdmin, saveContent);

// Public content overrides. Defaults live in the Next.js app
// (nextjs/lib/content.js); this endpoint only returns what an admin saved.
// Returns empty overrides when the DB is empty or unreachable.
app.get("/api/content", async (_req, res) => {
  try {
    const result = await query("SELECT key, value FROM content_overrides");
    return res.json({ ok: true, overrides: Object.fromEntries(result.rows.map((r) => [r.key, r.value])) });
  } catch (e) {
    console.error("GET /api/content failed (returning empty overrides):", e.message);
    return res.json({ ok: true, overrides: {} });
  }
});

// ----------------------------------------------------------- fallback ---
app.use((_req, res) => res.status(404).json({ ok: false, error: "Not found." }));
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, error: "Something went wrong." });
});

app.listen(PORT, () => console.log(`AH Digital Solutions API listening on port ${PORT}`));
