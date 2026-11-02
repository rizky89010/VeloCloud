import { getDb, plain } from "./db";
import { hashPassword, verifyPassword } from "./password";

export type Admin = { id: number; email: string; created_at: string };

export function findAdminByCredentials(email: string, password: string) {
  const row = getDb().prepare("SELECT id, email, password_hash FROM admins WHERE email = ?").get(email) as
    | { id: number; email: string; password_hash: string }
    | undefined;
  // Hash anyway when the email is unknown so response time doesn't reveal which accounts exist.
  const ok = verifyPassword(password, row?.password_hash ?? hashPassword("timing-padding"));
  return row && ok ? { id: row.id, email: row.email } : null;
}

export function findAdminById(id: number) {
  const row = getDb().prepare("SELECT id, email, created_at FROM admins WHERE id = ?").get(id) as Admin | undefined;
  return row && plain(row);
}

export function listAdmins() {
  return (getDb().prepare("SELECT id, email, created_at FROM admins ORDER BY created_at").all() as Admin[]).map(plain);
}

export function createAdmin(email: string, password: string) {
  getDb().prepare("INSERT INTO admins (email, password_hash) VALUES (?, ?)").run(email, hashPassword(password));
}

export function setAdminPassword(id: number, password: string) {
  getDb().prepare("UPDATE admins SET password_hash = ? WHERE id = ?").run(hashPassword(password), id);
}

export function deleteAdmin(id: number) {
  getDb().prepare("DELETE FROM admins WHERE id = ?").run(id);
}

export function adminCount() {
  return (getDb().prepare("SELECT COUNT(*) AS count FROM admins").get() as { count: number }).count;
}
