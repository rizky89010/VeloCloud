"use client";

import { RingingWaves } from "@/components/vectors/mini";
import { CheckGlyph } from "@/components/vectors/ui";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const bars = [0.35, 0.7, 1, 0.55, 0.85, 0.45, 0.95, 0.6, 0.4];

/** Success state: the "call" rings briefly, then connects. */
export function ConnectedState({
  ringing,
  connected,
  body,
  again,
  onReset,
}: {
  ringing: string;
  connected: string;
  body: string;
  again: string;
  onReset: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setConnected(true), reducedMotion ? 0 : 1600);
    return () => clearTimeout(id);
  }, [reducedMotion]);

  return (
    <div role="status" aria-live="polite" className="flex min-h-[340px] flex-col items-center justify-center py-6 text-center">
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div key="ringing" exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center">
            <RingingWaves />
            <p className="mt-8 text-sm font-medium text-muted-foreground">{ringing}</p>
          </motion.div>
        ) : (
          <motion.div
            key="connected"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center"
          >
            <motion.span
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="grid size-16 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
            >
              <CheckGlyph className="size-8 [stroke-width:2.5]" />
            </motion.span>
            <div className="mt-6 flex h-6 items-center gap-1" aria-hidden>
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-emerald-500"
                  style={{ height: `${h * 100}%` }}
                  animate={reducedMotion ? undefined : { scaleY: [1, 0.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.08 }}
                />
              ))}
            </div>
            <h2 className="mt-5 text-2xl font-bold text-ink">{connected}</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">{body}</p>
            <button
              type="button"
              onClick={onReset}
              className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-full border border-border px-5 text-sm font-semibold text-ink transition-colors duration-300 ease-snappy hover:bg-slate-50"
            >
              {again}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
