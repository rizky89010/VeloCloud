"use client";

import { CardChip } from "@/components/vectors/mini";
import { motion } from "motion/react";
import { useActive } from "./useActive";

export function SecurityCard() {
  const { ref, active } = useActive<HTMLDivElement>();

  return (
    <div ref={ref} className="relative grid h-full place-items-center py-4">
      <div aria-hidden className="absolute inset-8 rounded-full bg-indigo-400/25 blur-3xl" />
      <motion.div
        animate={active ? { rotate: [-4, -1, -4], y: [0, -6, 0] } : { rotate: -4 }}
        transition={{ duration: 6, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        className="relative aspect-[1.586] w-full max-w-[260px] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2b8cff_0%,#6366f1_40%,#8b5cf6_75%,#ec4899_100%)] p-5 text-white shadow-2xl shadow-indigo-500/30 ring-1 ring-white/30"
      >
        {/* Light sweep across the card while visible */}
        {active && (
          <motion.span
            aria-hidden
            className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ["0%", "400%"] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
          />
        )}
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <CardChip />
            <span className="text-[10px] font-bold tracking-[0.2em] opacity-80">SECURE</span>
          </div>
          <div className="mt-auto">
            <p className="text-lg font-extrabold tracking-tight">ISO 27001</p>
            <p className="text-sm font-semibold opacity-90">GDPR Compliant</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
