import { getDb, plain } from "./db";

export const STATUSES = ["new", "contacted", "closed"] as const;
export type Status = (typeof STATUSES)[number];

export type Submission = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  topic: string;
  message: string;
  status: Status;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type NewSubmission = Pick<
  Submission,
  "first_name" | "last_name" | "email" | "phone" | "company" | "website" | "topic" | "message"
>;

export type SubmissionFilters = { topic?: string; status?: string; month?: string; year?: string };

export function createSubmission(data: NewSubmission) {
  const result = getDb()
    .prepare(
      `INSERT INTO submissions (first_name, last_name, email, phone, company, website, topic, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(data.first_name, data.last_name, data.email, data.phone, data.company, data.website, data.topic, data.message);
  return Number(result.lastInsertRowid);
}

function whereClause(filters: SubmissionFilters) {
  const clauses: string[] = [];
  const params: string[] = [];
  if (filters.topic) {
    clauses.push("topic = ?");
    params.push(filters.topic);
  }
  if (filters.status && (STATUSES as readonly string[]).includes(filters.status)) {
    clauses.push("status = ?");
    params.push(filters.status);
  }
  if (filters.year && /^\d{4}$/.test(filters.year)) {
    clauses.push("strftime('%Y', created_at) = ?");
    params.push(filters.year);
  }
  if (filters.month && /^(0[1-9]|1[0-2])$/.test(filters.month)) {
    clauses.push("strftime('%m', created_at) = ?");
    params.push(filters.month);
  }
  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", params };
}

export function listSubmissions(filters: SubmissionFilters, page: number, pageSize: number) {
  const db = getDb();
  const { sql, params } = whereClause(filters);
  const { total } = db.prepare(`SELECT COUNT(*) AS total FROM submissions ${sql}`).get(...params) as { total: number };
  const rows = db
    .prepare(`SELECT * FROM submissions ${sql} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
    .all(...params, pageSize, (page - 1) * pageSize) as Submission[];
  return { rows: rows.map(plain), total };
}

export function allSubmissions(filters: SubmissionFilters) {
  const { sql, params } = whereClause(filters);
  return (getDb().prepare(`SELECT * FROM submissions ${sql} ORDER BY created_at DESC`).all(...params) as Submission[]).map(plain);
}

export function submissionStats() {
  const rows = getDb().prepare("SELECT status, COUNT(*) AS count FROM submissions GROUP BY status").all() as {
    status: Status;
    count: number;
  }[];
  const by = Object.fromEntries(rows.map((r) => [r.status, r.count])) as Partial<Record<Status, number>>;
  return {
    total: rows.reduce((sum, r) => sum + r.count, 0),
    new: by.new ?? 0,
    contacted: by.contacted ?? 0,
    closed: by.closed ?? 0,
  };
}

export function submissionYears() {
  const rows = getDb()
    .prepare("SELECT DISTINCT strftime('%Y', created_at) AS year FROM submissions ORDER BY year DESC")
    .all() as { year: string }[];
  return rows.map((r) => r.year);
}

export function updateSubmission(id: number, status: Status, notes: string) {
  getDb()
    .prepare("UPDATE submissions SET status = ?, notes = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?")
    .run(status, notes, id);
}

export function deleteSubmission(id: number) {
  getDb().prepare("DELETE FROM submissions WHERE id = ?").run(id);
}
