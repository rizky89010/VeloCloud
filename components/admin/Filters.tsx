"use client";

import { useRouter } from "next/navigation";
import { ChevronDownGlyph } from "@/components/vectors/ui";
import { inputClass } from "./styles";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

type Current = { topic?: string; status?: string; month?: string; year?: string };

export function Filters({ topics, years, current }: { topics: { value: string; label: string }[]; years: string[]; current: Current }) {
  const router = useRouter();

  // Every change resets to page 1 and updates the URL, so filtered views can be shared and exported.
  const update = (key: keyof Current, value: string) => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...current, [key]: value })) if (v) next.set(k, v);
    router.push(`/admin${next.size ? `?${next}` : ""}`);
  };

  const selects: { key: keyof Current; label: string; all: string; options: { value: string; label: string }[] }[] = [
    { key: "topic", label: "Topic", all: "All topics", options: topics },
    { key: "status", label: "Status", all: "All statuses", options: STATUS_OPTIONS },
    { key: "month", label: "Month", all: "All months", options: MONTHS.map((m, i) => ({ value: String(i + 1).padStart(2, "0"), label: m })) },
    { key: "year", label: "Year", all: "All years", options: years.map((y) => ({ value: y, label: y })) },
  ];
  const active = Object.values(current).some(Boolean);

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end">
      {selects.map((select) => (
        <label key={select.key} className="block">
          <span className="text-sm font-medium text-ink">{select.label}</span>
          <span className="relative mt-1.5 block">
            <select
              value={current[select.key] ?? ""}
              onChange={(event) => update(select.key, event.target.value)}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="">{select.all}</option>
              {select.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownGlyph className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-400" />
          </span>
        </label>
      ))}
      <button
        type="button"
        onClick={() => router.push("/admin")}
        disabled={!active}
        className="min-h-11 cursor-pointer rounded-xl border border-border px-5 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 disabled:cursor-default disabled:opacity-40"
      >
        Reset
      </button>
    </div>
  );
}
