"use client";

import { StatusDot } from "@/components/vectors/mini";
import { CheckGlyph } from "@/components/vectors/ui";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useActive } from "./useActive";

const hourly = [93, 95, 91, 97, 94, 96, 92, 98, 95, 93, 97, 96];
const CONNECT_AT = 18;

export function SlaDashboard() {
  const { t } = useLanguage();
  const k = t.services.komdigi;
  const { ref, active, reducedMotion } = useActive<HTMLDivElement>();
  const [seconds, setSeconds] = useState(0);

  // Simulated wait timer: counts up, the agent picks up at 18s, then the cycle restarts.
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSeconds((s) => (s >= CONNECT_AT + 4 ? 0 : s + 1)), 250);
    return () => clearInterval(id);
  }, [active]);

  const shown = reducedMotion ? CONNECT_AT : Math.min(seconds, CONNECT_AT);
  const connected = shown >= CONNECT_AT;

  return (
    <div ref={ref} className="grid h-full gap-4 sm:grid-cols-[1.1fr_1fr]">
      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <StatusDot />
            {k.queue}
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">≤ 30s</span>
        </div>

        <p className="mt-4 text-[11px] font-medium text-muted-foreground">{k.wait}</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight text-ink tabular-nums">
          00:{String(shown).padStart(2, "0")}
        </p>

        <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric-500 to-indigo-500 transition-[width] duration-200 ease-linear"
            style={{ width: `${(shown / 30) * 100}%` }}
          />
          <div className="absolute inset-y-0 left-full w-px -translate-x-px bg-slate-300" />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-slate-500 tabular-nums">
          <span>0s</span>
          <span>30s</span>
        </div>

        <div
          className={cn(
            "mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors duration-300",
            connected ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-500",
          )}
        >
          {connected ? <CheckGlyph className="size-4" /> : <span className="size-4 rounded-full border-[1.5px] border-current opacity-40" />}
          {k.connected}
        </div>
      </div>

      <div className="flex flex-col rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-semibold text-muted-foreground">{k.today}</p>
          <p className="text-xs font-semibold text-muted-foreground">
            {k.sla} <span className="text-ink">≥ 90%</span>
          </p>
        </div>
        <div className="relative mt-3 flex flex-1 items-end gap-1.5 pt-2" style={{ minHeight: 120 }}>
          {/* 90% target line, plotted on an 80–100% scale */}
          <div className="absolute inset-x-0 border-t border-dashed border-coral-500/70" style={{ bottom: "50%" }}>
            <span className="absolute -top-4 right-0 text-[10px] font-semibold text-coral-500">90%</span>
          </div>
          {hourly.map((value, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500 to-electric-400"
              initial={{ height: "0%" }}
              whileInView={{ height: `${((value - 80) / 20) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: "easeOut" }}
            />
          ))}
        </div>
        <p className="mt-3 text-[10px] text-slate-500">PM Kominfo No. 16/2013</p>
      </div>
    </div>
  );
}
