import { headers } from "next/headers";
import { getDb } from "./db";

/** Best-effort client IP for rate limiting (behind a proxy/tunnel the forwarded header is used). */
export async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}

/** Records an event and reports whether `key` is still under `limit` events in the last `windowMs`. */
export function hit(bucket: string, key: string, limit: number, windowMs: number) {
  const db = getDb();
  const now = Date.now();
  db.prepare("DELETE FROM rate_events WHERE at < ?").run(now - 24 * 60 * 60 * 1000);
  const { count } = db
    .prepare("SELECT COUNT(*) AS count FROM rate_events WHERE bucket = ? AND key = ? AND at > ?")
    .get(bucket, key, now - windowMs) as { count: number };
  if (count >= limit) return false;
  db.prepare("INSERT INTO rate_events (bucket, key, at) VALUES (?, ?, ?)").run(bucket, key, now);
  return true;
}

/** Counts events without recording a new one. */
export function recent(bucket: string, key: string, windowMs: number) {
  const { count } = getDb()
    .prepare("SELECT COUNT(*) AS count FROM rate_events WHERE bucket = ? AND key = ? AND at > ?")
    .get(bucket, key, Date.now() - windowMs) as { count: number };
  return count;
}

export function clear(bucket: string, key: string) {
  getDb().prepare("DELETE FROM rate_events WHERE bucket = ? AND key = ?").run(bucket, key);
}
