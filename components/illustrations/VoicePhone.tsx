"use client";

import { AcceptPulse, DeclineMark } from "@/components/vectors/mini";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { PhoneFrame } from "./PhoneFrame";
import { useActive, useSequence } from "./useActive";

// Example numbers from reserved/fictional ranges, for illustration only.
const sampleNumbers = ["+1 800 555 0142", "+62 21 5000 0000", "+44 20 7946 0000"];
const bars = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.45, 0.8, 0.6, 0.95, 0.5, 0.75, 0.4];

export function VoicePhone() {
  const { t } = useLanguage();
  const v = t.services.voice;
  const { ref, active, reducedMotion } = useActive<HTMLDivElement>();
  const index = useSequence(sampleNumbers.length, active, reducedMotion, 2400);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute inset-x-6 top-10 bottom-0 rounded-full bg-coral-500/20 blur-3xl" />
      <PhoneFrame>
        <div className="flex h-full flex-col items-center bg-gradient-to-b from-slate-800 to-slate-950 px-4 pt-12 pb-6 text-white">
          <p className="text-[11px] font-medium text-slate-300">{v.incoming}</p>

          <div className="relative mt-5 grid size-16 place-items-center">
            {active &&
              [0, 1].map((ring) => (
                <motion.span
                  key={ring}
                  className="absolute inset-0 rounded-full border border-coral-400/70"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: ring }}
                />
              ))}
            <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-coral-400 to-coral-500 text-lg font-bold">
              VC
            </span>
          </div>

          <div className="mt-4 h-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm font-semibold tabular-nums">{sampleNumbers[index]}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-coral-400">{v.numbers[index]}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex h-8 w-full items-center gap-[3px] px-2">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-full bg-coral-400"
                style={{ height: `${h * 100}%` }}
                animate={active ? { scaleY: [1, 0.35, 1] } : { scaleY: 1 }}
                transition={{ duration: 1.1, repeat: active ? Infinity : 0, delay: i * 0.07, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="mt-auto flex w-full justify-around">
            <DeclineMark />
            <AcceptPulse />
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
