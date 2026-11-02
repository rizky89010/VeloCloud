export const inputClass =
  "min-h-11 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-slate-400 transition-[border-color,box-shadow] duration-300 ease-snappy focus:border-primary focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)]";

export const cardClass = "rounded-3xl border border-border bg-white shadow-sm";

export const statusStyles: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-blue-50 text-blue-700 ring-blue-200" },
  contacted: { label: "Contacted", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  closed: { label: "Closed", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
};
