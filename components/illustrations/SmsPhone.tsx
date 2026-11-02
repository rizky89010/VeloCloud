"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { PhoneFrame } from "./PhoneFrame";
import { useActive, useSequence } from "./useActive";

const kindStyle: Record<string, string> = {
  OTP: "bg-emerald-50 text-emerald-700",
  Alert: "bg-blue-50 text-blue-700",
  "2-Way": "bg-indigo-50 text-indigo-700",
};

export function SmsPhone() {
  const { t } = useLanguage();
  const m = t.services.messaging;
  const { ref, active, reducedMotion } = useActive<HTMLDivElement>();
  // One step per message, one for the reply, one to hold before restarting.
  const step = useSequence(m.sms.length + 2, active, reducedMotion, 1500);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute inset-x-6 top-10 bottom-0 rounded-full bg-emerald-400/25 blur-3xl" />
      <PhoneFrame>
        <div className="border-b border-slate-200 bg-white px-4 pt-9 pb-2 text-center">
          <p className="text-xs font-bold text-ink">VELOBANK</p>
          <p className="text-[10px] text-slate-500">SMS</p>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <AnimatePresence initial={false}>
            {m.sms.map(
              (sms, i) =>
                step >= i && (
                  <motion.div
                    key={sms.kind}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.3 }}
                    className="max-w-[88%] rounded-2xl rounded-bl-md bg-white p-2.5 text-[11px] leading-snug text-slate-700 shadow-sm ring-1 ring-slate-200"
                  >
                    <span className={`mb-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${kindStyle[sms.kind]}`}>
                      {sms.kind}
                    </span>
                    <p>{sms.text}</p>
                  </motion.div>
                ),
            )}
            {step >= m.sms.length && (
              <motion.div
                key="reply"
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="self-end rounded-2xl rounded-br-md bg-emerald-500 px-3 py-2 text-[11px] font-semibold text-white"
              >
                {m.reply}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PhoneFrame>
    </div>
  );
}
