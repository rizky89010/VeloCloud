"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { industries, testimonials } from "@/lib/content/home";
import { insights } from "@/lib/content/insights";
import { FrameLines, SectionHeading, ShimmerButton, HoverArrow } from "@/components/ui/primitives";
import { NewsCard } from "@/components/templates/InsightsPage";

export function Industries() {
  const { t, locale } = useLanguage();

  return (
    <section className="relative border-t border-border bg-background py-20 sm:py-28">
      <FrameLines />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.ui.industriesEyebrow} title={t.ui.industriesTitle} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ copy }, i) => (
            <motion.div
              key={copy.en.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-border bg-white p-7 transition-shadow duration-300 ease-snappy hover:shadow-xl hover:shadow-primary/10"
            >
              <h3 className="text-xl leading-snug font-semibold tracking-tight text-ink">{copy[locale].title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{copy[locale].desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
      <div aria-hidden className="absolute -top-40 right-0 h-96 w-[40rem] rounded-full bg-gradient-to-r from-electric-500/25 via-indigo-500/20 to-violet-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold text-electric-400">{t.ui.testimonialsEyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            {t.ui.testimonialsTitle}
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
            >
              <span aria-hidden className="text-gradient block h-8 font-serif text-6xl leading-none">&ldquo;</span>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-200 sm:text-lg">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-5">
                <span className="block font-semibold text-white">{item.name}</span>
                <span className="block text-sm text-slate-400">
                  {item.role}, {item.company}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LatestNews() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-background py-20 sm:py-28">
      <FrameLines />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={t.ui.newsEyebrow} title={t.ui.newsTitle} />
          <ShimmerButton href="/insights" variant="outline" className="self-start sm:self-auto">
            {t.ui.readMore}
            <HoverArrow />
          </ShimmerButton>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((item, i) => (
            <NewsCard key={item.date} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
