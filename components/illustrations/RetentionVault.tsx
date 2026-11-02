"use client";

import { DocLines, StatusDot } from "@/components/vectors/mini";
import { CheckGlyph } from "@/components/vectors/ui";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useActive, useSequence } from "./useActive";

export function RetentionVault() {
  const { t } = useLanguage();
  const a = t.services.audit;
  const { ref, active, reducedMotion } = useActive<HTMLDivElement>();
  // Steps 0-2 file each item into the vault, step 3 holds the full state.
  const step = useSequence(4, active, reducedMotion, 1300);

  return (
    <div ref={ref} className="flex h-full flex-col gap-3">
      <ul className="space-y-2">
        {a.items.map((item, i) => {
          const stored = step > i || step === 3;
          return (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2.5 text-sm shadow-sm"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                <DocLines index={i} />
              </span>
              <span className="flex-1 font-medium text-ink">{item}</span>
              <AnimatePresence mode="wait">
                {stored ? (
                  <motion.span
                    key="stored"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-600"
                  >
                    <CheckGlyph className="size-3.5" /> {a.stored}
                  </motion.span>
                ) : (
                  <motion.span key="pending" exit={{ opacity: 0 }} className="size-1.5 rounded-full bg-slate-300" />
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto rounded-xl border border-border bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink">
          <StatusDot color="bg-indigo-600" />
          {a.retention}
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {a.months.map((month, i) => (
            <div key={month}>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className={cn("h-full rounded-full bg-gradient-to-r from-indigo-500 to-electric-400")}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.35, ease: "easeOut" }}
                />
              </div>
              <p className="mt-1 text-[10px] font-medium text-slate-500">{month}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
