"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { whyUs } from "@/lib/content/home";
import { FrameLines, SectionHeading } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/CountUp";

export function Metrics() {
  const { t, locale } = useLanguage();
  const why = whyUs[locale];

  const stats = [
    { to: 1900, suffix: "+", label: t.metrics.customers },
    { to: 300, suffix: "+", label: t.metrics.routes },
    { to: 1000, suffix: "+", label: t.metrics.operators },
    { to: 7.4, decimals: 1, suffix: ` ${t.metrics.billion}`, label: t.metrics.minutes },
  ];

  return (
    <section id="insights" className="relative bg-white py-20 sm:py-28">
      <FrameLines />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} subtitle={why.body} />

        <dl className="mt-14 grid grid-cols-2 border-t border-border lg:grid-cols-4">
          {stats.map(({ to, decimals, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-b border-border px-4 py-8 odd:border-r sm:px-6 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
              <dd className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                <CountUp to={to} decimals={decimals} />
                <span className="text-gradient">{suffix}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
