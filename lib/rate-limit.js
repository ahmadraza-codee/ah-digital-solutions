// Tiny in-memory per-IP rate limiter for the public API routes.
// Good enough for a low-traffic agency site on a single Vercel instance;
// it is not a distributed limiter and resets on redeploy/cold start.
const buckets = new Map();

export function rateLimit(key, max, windowMs) {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now > b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
  }
  b.count += 1;
  buckets.set(key, b);
  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 2000) {
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k);
    }
  }
  return { allowed: b.count <= max, remaining: Math.max(0, max - b.count) };
}

export function clientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
