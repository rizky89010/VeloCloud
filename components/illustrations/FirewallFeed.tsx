"use client";

import { StatusDot } from "@/components/vectors/mini";
import { CheckGlyph, CrossGlyph } from "@/components/vectors/ui";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useActive, useSequence } from "./useActive";

// Illustrative traffic samples: legitimate A2P passes, bypass traffic is blocked.
const traffic = [
  { from: "BANK-OTP", route: "A2P · Direct", ok: true },
  { from: "+44 7700 900123", route: "Grey route", ok: false },
  { from: "SHOP-PROMO", route: "A2P · Direct", ok: true },
  { from: "+1 202 555 0175", route: "Bypass", ok: false },
  { from: "TAXI-ALERT", route: "A2P · Direct", ok: true },
];

export function FirewallFeed() {
  const { ref, active, reducedMotion } = useActive<HTMLDivElement>();
  const step = useSequence(traffic.length, active, reducedMotion, 1100);
  const visible = [0, 1, 2].map((offset) => traffic[(step + offset) % traffic.length]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <StatusDot color="bg-indigo-600" />
          SMS Firewall
        </span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">Live</span>
      </div>
      <ul className="mt-4 space-y-2">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((item) => (
            <motion.li
              key={item.from}
              layout
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-xs",
                item.ok ? "border-emerald-100 bg-emerald-50/60" : "border-red-100 bg-red-50/60",
              )}
            >
              {item.ok ? (
                <CheckGlyph className="size-4 text-emerald-600" />
              ) : (
                <CrossGlyph className="size-4 text-red-500" />
              )}
              <span className="flex-1 font-semibold text-ink tabular-nums">{item.from}</span>
              <span className={cn("font-medium", item.ok ? "text-emerald-700" : "text-red-600")}>{item.route}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
