import { Pool } from "pg";

// Single lazy pg Pool, configured from DATABASE_URL (Supabase Postgres).
// Throws a clear error naming the missing env var instead of crashing the build.
let pool = null;

export function getPool() {
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

export async function query(text, params) {
  const client = await getPool().connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}
