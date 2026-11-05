import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "ah_admin";

function sessionSecret() {
  if (!process.env.ADMIN_SESSION_SECRET) {
    throw new Error("Missing env var: ADMIN_SESSION_SECRET");
  }
  return new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
}

// Timing-safe password comparison against ADMIN_PASSWORD (env var).
export function passwordsMatch(input) {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("Missing env var: ADMIN_PASSWORD");
  }
  const a = Buffer.from(typeof input === "string" ? input : "");
  const b = Buffer.from(process.env.ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createSessionCookie() {
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(sessionSecret());
  return {
    name: ADMIN_COOKIE,
    value: token,
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === "production",
    },
  };
}

// True only when the ah_admin cookie holds a valid, unexpired JWT.
export async function verifyAdmin() {
  try {
    const token = cookies().get(ADMIN_COOKIE)?.value;
    if (!token) return false;
    await jwtVerify(token, sessionSecret());
    return true;
  } catch {
    return false;
  }
}
