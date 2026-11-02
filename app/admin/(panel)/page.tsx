import type { Metadata } from "next";
import { connection } from "next/server";
import { TOPICS, topicLabel } from "@/lib/contact-schema";
import { listSubmissions, submissionStats, submissionYears, type SubmissionFilters } from "@/lib/server/submissions";
import { cn } from "@/lib/cn";
import { Filters } from "@/components/admin/Filters";
import { SubmissionActions } from "@/components/admin/SubmissionActions";
import { cardClass, statusStyles } from "@/components/admin/styles";

export const metadata: Metadata = { title: "Submissions" };

const PAGE_SIZE = 10;

function pick(value: string | string[] | undefined) {
  return typeof value === "string" && value ? value : undefined;
}

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();
  const params = await searchParams;
  const filters: SubmissionFilters = {
    topic: pick(params.topic),
    status: pick(params.status),
    month: pick(params.month),
    year: pick(params.year),
  };
  const page = Math.max(1, Number(pick(params.page)) || 1);
  const stats = submissionStats();
  const { rows, total } = listSubmissions(filters, page, PAGE_SIZE);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = total ? (page - 1) * PAGE_SIZE + 1 : 0;
  const to = Math.min(page * PAGE_SIZE, total);

  const query = (extra: Record<string, string>) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...filters, ...extra })) if (v) q.set(k, v);
    return q.toString();
  };

  const cards = [
    { label: "Total submissions", value: stats.total, hint: "All incoming customer inquiries", tone: "from-electric-500/10" },
    { label: "New inquiries", value: stats.new, hint: "Waiting for initial review", tone: "from-blue-500/10", text: "text-blue-700" },
    { label: "Contacted", value: stats.contacted, hint: "Follow-up in progress", tone: "from-amber-500/10", text: "text-amber-600" },
    { label: "Closed", value: stats.closed, hint: "Successfully completed", tone: "from-emerald-500/10", text: "text-emerald-700" },
  ];

  return (
    <>
      <header className={cn(cardClass, "relative overflow-hidden p-6 sm:p-8")}>
        <div aria-hidden className="absolute -top-20 -right-10 h-60 w-96 rounded-full bg-gradient-to-l from-violet-500/15 to-transparent blur-2xl" />
        <p className="relative text-xs font-semibold tracking-[0.25em] text-primary">ADMINISTRATION PORTAL</p>
        <h1 className="relative mt-3 text-3xl font-bold tracking-tight text-ink">Contact submissions</h1>
        <p className="relative mt-2 max-w-2xl text-sm text-muted-foreground">
          Review inquiries from the VeloCloud contact form, keep contact details organised, and manage every follow-up from one place.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className={cn(cardClass, "bg-gradient-to-br to-white p-5", card.tone)}>
            <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
            <p className={cn("mt-3 text-4xl font-bold tracking-tight tabular-nums", card.text ?? "text-ink")}>{card.value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{card.hint}</p>
          </div>
        ))}
      </section>

      <section className={cn(cardClass, "p-5 sm:p-6")}>
        <h2 className="text-base font-semibold text-ink">Filter submissions</h2>
        <p className="mt-1 text-sm text-muted-foreground">Narrow the results by topic, follow-up status, month, or year.</p>
        <Filters topics={TOPICS.map((t) => ({ value: t.key, label: t.en }))} years={submissionYears()} current={filters} />
      </section>

      <section className={cn(cardClass, "overflow-hidden")}>
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
          <div>
            <h2 className="text-base font-semibold text-ink">Customer inquiries</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing {from}-{to} of {total} submissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/admin/export?${query({})}`}
              className="inline-flex min-h-10 items-center rounded-xl border border-primary/20 bg-primary/5 px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Export report
            </a>
            <span className="rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground">
              Page {page} of {pages}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-y border-border bg-slate-50/70 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              <tr>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Topic</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Submitted</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-muted-foreground">
                    No submissions match these filters yet.
                  </td>
                </tr>
              )}
              {rows.map((row) => {
                const status = statusStyles[row.status];
                return (
                  <tr key={row.id} className="align-top transition-colors hover:bg-slate-50/60">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">
                        {row.first_name} {row.last_name}
                      </p>
                      <a href={row.website} target="_blank" rel="noopener noreferrer nofollow" className="text-xs text-muted-foreground hover:text-primary">
                        {row.website.replace(/^https?:\/\//, "")}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <a href={`mailto:${row.email}`} className="text-ink hover:text-primary">
                        {row.email}
                      </a>
                      <p className="text-xs text-muted-foreground">{row.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-ink">{row.company}</td>
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-ink">{topicLabel(row.topic)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1", status.className)}>
                        <span className="size-1.5 rounded-full bg-current" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-ink">
                      {new Date(row.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <SubmissionActions submission={row} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <nav aria-label="Pagination" className="flex items-center justify-between border-t border-border p-4 text-sm">
            {page > 1 ? (
              <a href={`/admin?${query({ page: String(page - 1) })}`} className="rounded-xl border border-border px-4 py-2 font-medium hover:bg-slate-50">
                Previous
              </a>
            ) : (
              <span />
            )}
            {page < pages && (
              <a href={`/admin?${query({ page: String(page + 1) })}`} className="rounded-xl border border-border px-4 py-2 font-medium hover:bg-slate-50">
                Next
              </a>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
