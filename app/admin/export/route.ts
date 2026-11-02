import type { NextRequest } from "next/server";
import { getAdmin } from "@/lib/server/session";
import { allSubmissions } from "@/lib/server/submissions";
import { topicLabel } from "@/lib/contact-schema";

/** Quote a CSV cell and neutralise spreadsheet formulas (=, +, -, @) from user-supplied text. */
function cell(value: string | number) {
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!(await getAdmin())) return new Response("Unauthorized", { status: 401 });

  const params = request.nextUrl.searchParams;
  const rows = allSubmissions({
    topic: params.get("topic") ?? undefined,
    status: params.get("status") ?? undefined,
    month: params.get("month") ?? undefined,
    year: params.get("year") ?? undefined,
  });

  const header = ["ID", "First name", "Last name", "Email", "Phone", "Company", "Website", "Topic", "Message", "Status", "Notes", "Submitted (UTC)"];
  const lines = rows.map((r) =>
    [r.id, r.first_name, r.last_name, r.email, r.phone, r.company, r.website, topicLabel(r.topic), r.message, r.status, r.notes, r.created_at]
      .map(cell)
      .join(","),
  );
  // BOM so Excel opens UTF-8 correctly.
  const csv = "﻿" + [header.map(cell).join(","), ...lines].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="velocloud-submissions-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
