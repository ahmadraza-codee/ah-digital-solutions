-- AH Digital Solutions — database schema (Supabase Postgres).
-- Run once in the Supabase SQL editor (or psql) against the project database.
-- No secrets here: the connection string lives in DATABASE_URL (Vercel env vars).

-- Quote / project inquiries submitted through /get-a-quote/ and /contact/.
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quotes_created_at_idx ON quotes (created_at DESC);

-- Admin-managed content overrides. Public pages read lib/content.js defaults
-- and merge any rows found here (services / projects / articles / settings).
-- value is the full replacement array/object for that key.
CREATE TABLE IF NOT EXISTS content_overrides (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
