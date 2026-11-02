"use client";

import { Orb, StatusDot } from "@/components/vectors/mini";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { useActive, useSequence } from "./useActive";

const channelDots = ["bg-electric-500", "bg-emerald-500", "bg-violet-500"];

function Typing() {
  return (
    <span className="flex gap-1 py-1">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="size-1.5 rounded-full bg-slate-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
        />
      ))}
    </span>
  );
}

export function OmnichannelChat() {
  const { t } = useLanguage();
  const b = t.services.bpo;
  const { ref, active, reducedMotion } = useActive<HTMLDivElement>();
  // 0 customer, 1 AI typing, 2 AI reply, 3 handoff, 4 agent reply, 5 hold
  const step = useSequence(6, active, reducedMotion, 1500);

  const bubble = "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed sm:text-[13px]";

  return (
    <div ref={ref} className="grid h-full gap-4 sm:grid-cols-[auto_1fr]">
      <ul className="flex gap-2 sm:flex-col">
        {b.channels.map((channel, i) => {
          return (
            <li
              key={channel}
              className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-semibold text-ink shadow-sm sm:flex-none"
            >
              <StatusDot color={channelDots[i]} />
              <span className="truncate">{channel}</span>
            </li>
          );
        })}
        <li className="hidden items-center justify-center rounded-xl bg-ink px-3 py-2.5 text-xs font-bold text-white sm:flex">
          24/7
        </li>
      </ul>

      <div className="flex min-h-[250px] flex-col gap-2.5 rounded-2xl border border-border bg-white p-4 shadow-sm">
        <AnimatePresence initial={false}>
          <motion.div key="c" layout className={cn(bubble, "self-end rounded-br-md bg-primary text-white")}>
            {b.chat.customer}
          </motion.div>

          {step >= 1 && (
            <motion.div
              key="ai"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex items-end gap-2"
            >
              <Orb variant="ai" />
              <div className={cn(bubble, "rounded-bl-md bg-slate-100 text-slate-700")}>
                {step === 1 ? <Typing /> : b.chat.ai}
              </div>
            </motion.div>
          )}

          {step >= 3 && (
            <motion.p
              key="handoff"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="self-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700"
            >
              {b.chat.handoff}
            </motion.p>
          )}

          {step >= 4 && (
            <motion.div
              key="agent"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex items-end gap-2"
            >
              <Orb variant="agent" />
              <div className={cn(bubble, "rounded-bl-md bg-slate-100 text-slate-700")}>{b.chat.agent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
