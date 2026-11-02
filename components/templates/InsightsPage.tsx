"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { formatDate, insights } from "@/lib/content/insights";
import { FrameLines } from "@/components/ui/primitives";
import { PageHero } from "./PageHero";

export function NewsCard({ item, index }: { item: (typeof insights)[number]; index: number }) {
  const { t, locale } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <div aria-hidden className="h-2 bg-gradient-to-r from-electric-500 via-indigo-500 to-violet-500" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase">
          {t.ui.newsTag} · <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
        </p>
        <h3 className="mt-3 text-lg leading-snug font-bold text-ink">{item.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.summary[locale]}</p>
      </div>
    </motion.article>
  );
}

export function InsightsPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t.nav.insights}
        title={t.ui.newsTitle}
        subtitle={t.ui.newsSubtitle}
        scene="stream"
        tint={0.15}
      />
      <section className="relative bg-background py-16 sm:py-24">
        <FrameLines />
        <div className="relative mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {insights.map((item, i) => (
            <NewsCard key={item.date} item={item} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
