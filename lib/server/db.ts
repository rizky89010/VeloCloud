import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { hashPassword } from "./password";

// Server-only: imported by server actions, route handlers and server components.

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "velocloud.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT NOT NULL,
  topic TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS submissions_created_at ON submissions (created_at);

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS rate_events (
  bucket TEXT NOT NULL,
  key TEXT NOT NULL,
  at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_events_lookup ON rate_events (bucket, key, at);
`;

const globalForDb = globalThis as unknown as { velocloudDb?: DatabaseSync };

function open() {
  mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  db.exec(SCHEMA);
  seedAdmin(db);
  return db;
}

/** Creates the first admin from env vars, only while there are no admins at all. */
function seedAdmin(db: DatabaseSync) {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM admins").get() as { count: number };
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (count > 0 || !email || !password) return;
  db.prepare("INSERT INTO admins (email, password_hash) VALUES (?, ?)").run(email, hashPassword(password));
}

/** One shared connection per server process (survives dev hot reloads). */
export function getDb() {
  globalForDb.velocloudDb ??= open();
  return globalForDb.velocloudDb;
}

/** node:sqlite returns null-prototype rows; React can only pass plain objects to client components. */
export function plain<T>(row: T): T {
  return { ...row };
}
