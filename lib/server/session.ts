import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { findAdminById } from "./admins";

// Signed session cookie: "<adminId>.<expiresAt>.<hmac>". The server re-checks the admin exists on every read.

const COOKIE = "vc_admin";
const MAX_AGE_SECONDS = 8 * 60 * 60;

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET must be set (32+ chars) in .env.local");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export async function createSession(adminId: number) {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${adminId}.${expires}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

/** The signed-in admin, or null. */
export async function getAdmin() {
  // Session checks compare against the current time, so they must run per request, never at prerender.
  await connection();
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const [id, expires, mac] = raw.split(".");
  if (!id || !expires || !mac) return null;
  const expected = Buffer.from(sign(`${id}.${expires}`), "hex");
  const given = Buffer.from(mac, "hex");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  if (Number(expires) < Date.now()) return null;
  return findAdminById(Number(id)) ?? null;
}

/** Use at the top of every admin page and action. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
