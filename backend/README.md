# AH Digital Solutions — Express Backend (Render)

Separate Node.js / Express API for the AH Digital Solutions website. It mirrors
the Next.js API routes in `nextjs/app/api/` and talks to the **same Supabase
Postgres database** (`quotes` + `content_overrides` tables, see
`nextjs/schema.sql`). The Next.js frontend stays on Vercel; the quote form
posts here when `NEXT_PUBLIC_API_URL` is set in Vercel, and falls back to the
Next.js `/api/quote` route otherwise.

## Endpoints

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | — | `{ok:true}` — Render health check |
| POST | `/api/quote` | — | Submit a quote inquiry. Same validation as the Next.js route (name, email, service, budget, timeline, message; optional `website_url`, `reference_sites`; honeypot `website`). Rate limit 5/hr per IP. Returns `201 {ok:true, id}`. Resend email alert is fail-soft. |
| POST | `/api/admin/login` | — | Password vs `ADMIN_PASSWORD` (timing-safe). Issues JWT HS256, 7d, httpOnly cookie `ah_admin`. Rate limit 10/hr. |
| GET | `/api/admin/me` | — | `{loggedIn: true/false}` |
| POST | `/api/admin/logout` | — | Clears the `ah_admin` cookie |
| GET | `/api/admin/inquiries` | Admin | All quotes, newest first |
| PATCH | `/api/admin/inquiries/:id` | Admin | Set status: `new` / `contacted` / `closed` |
| DELETE | `/api/admin/inquiries/:id` | Admin | Delete one inquiry |
| GET | `/api/admin/content` | Admin | All `content_overrides` rows |
| PUT | `/api/admin/content` | Admin | Save one override (`key` + `value`). `POST` accepted as an alias. Keys: `services`, `projects`, `articles`, `settings` |
| GET | `/api/content` | — | Public overrides (empty `{}` when DB is empty/unreachable). Defaults live in `nextjs/lib/content.js`. |

## Local test (no real database needed for the health check)

```bash
cd backend
npm install
node server.js
# in another terminal:
curl http://localhost:3001/health
# -> {"ok":true}
curl -X POST http://localhost:3001/api/quote -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","service":"SEO Services","budget":"Not sure yet","timeline":"Flexible","message":"Hello, test inquiry."}'
# -> {"ok":false,"error":"Server is not configured yet (missing env var: DATABASE_URL)."}
#    (expected without DATABASE_URL — the request is validated first, then
#     fails cleanly on the missing DB config; it does NOT crash the server)
```

With a real `DATABASE_URL` in a local `.env` (copy `.env.example`), the same
quote request returns `201 {"ok":true,"id":"..."}`.

## Deploy on Render (manual steps — do these in the Render Dashboard)

The repo is `ahmadraza-codee/ah-digital-solutions`, branch `main`. The
backend lives in the `backend/` subfolder.

**Option A — Blueprint (recommended, uses `render.yaml` in this folder):**
1. Render Dashboard → New → Blueprint → connect the GitHub repo
   `ahmadraza-codee/ah-digital-solutions`. Render reads `backend/render.yaml`.
2. When it asks for the env vars marked `sync: false`, enter them (see below).
3. Deploy. Wait for "Live". Open `https://<your-service>.onrender.com/health`
   — expect `{"ok":true}`.

**Option B — manual Web Service:**
1. Render Dashboard → New → Web Service → connect the same repo.
2. Root Directory: `backend`. Runtime: Node. Region: Singapore. Plan: Free.
3. Build Command: `npm install`. Start Command: `node server.js`.
4. Health Check Path: `/health`.
5. Add the env vars below, then Create Web Service.

**Environment variables (Render Dashboard → Service → Environment):**
Copy the values from the Vercel project env vars — do NOT invent new ones.

| Variable | Value source |
| --- | --- |
| `DATABASE_URL` | Copy exactly from Vercel `DATABASE_URL` (Supabase pooled connection string) |
| `ADMIN_PASSWORD` | Copy exactly from Vercel `ADMIN_PASSWORD` (same admin password) |
| `ADMIN_SESSION_SECRET` | Copy exactly from Vercel `ADMIN_SESSION_SECRET` (same JWT secret — cookies issued by either backend stay valid) |
| `RESEND_API_KEY` | Copy from Vercel `RESEND_API_KEY` once Resend signup is done (optional — quotes still save without it) |
| `RESEND_FROM` | `AH Digital Solutions <onboarding@resend.dev>` (or your verified sender) |
| `FRONTEND_URL` | `https://ah-digital-solutions.vercel.app` |
| `NODE_ENV` | `production` |

**After the Render URL exists:**
1. In Vercel (project `ah-digital-solutions` → Settings → Environment
   Variables), add `NEXT_PUBLIC_API_URL` = `https://<your-service>.onrender.com`
   (no trailing slash) for **all 3 environments** (Production, Preview,
   Development), then redeploy. The quote form will then POST to Express.
   Until then it keeps using the Next.js `/api/quote` fallback — nothing breaks.
2. Test live: submit a test quote at
   `https://ah-digital-solutions.vercel.app/get-a-free-quote/` and check it
   appears in `/admin` (Inquiries) and in the Supabase `quotes` table.
3. Only after that live test passes should the Next.js `/api/*` fallback
   routes be considered for removal. They are intentionally kept for now.

**Free-tier note:** Render Free web services sleep after ~15 minutes idle.
The first request after sleep takes ~30–60s to wake — the quote form will
look slow once, then be fast. That is expected, not an error. (Same behaviour
as the Team Task Manager backend on Render.)

## Security notes

- No secrets in this repo. `.env` is never committed (see `.env.example`).
- Admin auth is a single password + httpOnly JWT cookie, same as the Next.js
  implementation. Change the password by updating `ADMIN_PASSWORD` on both
  Render and Vercel.
- CORS allows only the live Vercel site and `http://localhost:3000`, with
  credentials. All quote/admin inputs are validated and all SQL is
  parameterized.
