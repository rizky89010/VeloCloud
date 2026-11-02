"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { company } from "@/lib/company";
import { mainNav, solutionNav } from "@/lib/navigation";
import { useCtaOverride } from "@/lib/cta-store";
import { Logo, PulseDot, ShimmerButton, HoverArrow } from "@/components/ui/primitives";
import { Scene } from "@/components/scenes/Scene";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-white">{children}</h3>;
}

export function Footer() {
  const { t, locale } = useLanguage();
  const f = t.footer;
  const legal = [f.privacy, f.terms, f.cookies];
  const solutions = solutionNav(locale);
  const companyLinks = mainNav(t);
  const ctaTitle = useCtaOverride() ?? t.ui.contactCtaTitle;

  return (
    <footer className="text-slate-400">
      {/* F2 · CTA and footer as one dark section, fading in from the white page above */}
      <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,var(--color-background)_0,#0b1530_7rem,#040a18_13rem)] pt-40 pb-24 text-center sm:pt-40 sm:pb-28">
        <Scene kind="footer" className="top-24" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl px-4 sm:px-6"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-balance text-white sm:text-5xl">{ctaTitle}</h2>
          <p className="mt-4 text-base font-semibold text-gradient sm:text-lg">{f.ctaQuestions}</p>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-slate-300">{t.ui.contactCtaBody}</p>
          <div className="mt-9 flex justify-center">
            <ShimmerButton href="/contact" size="lg">
              {t.nav.cta}
              <HoverArrow />
            </ShimmerButton>
          </div>
        </motion.div>
      </section>

      <div className="bg-navy-950">
      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1fr] lg:gap-12">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed">{f.tagline}</p>
          </div>

          <nav aria-label={f.solutions}>
            <ColumnTitle>{f.solutions}</ColumnTitle>
            <ul className="mt-4 space-y-1">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-9 items-center text-sm transition-colors duration-200 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-1 border-t border-white/10 pt-4">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-9 items-center text-sm transition-colors duration-200 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle>{f.contactTitle}</ColumnTitle>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{f.addressLabel}</p>
                <address className="mt-1 leading-relaxed not-italic">
                  <span className="font-semibold text-slate-200">{company.name}</span>
                  <br />
                  {company.addressLines.join(" ")}
                </address>
              </li>
              <li>
                <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{f.emailLabel}</p>
                <a href={`mailto:${company.email}`} className="mt-1 inline-block transition-colors duration-200 hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{f.websiteLabel}</p>
                <a href={company.websiteUrl} className="mt-1 inline-block transition-colors duration-200 hover:text-white">
                  {company.website}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ColumnTitle>{f.hoursTitle}</ColumnTitle>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <span>
                  <span className="font-semibold text-slate-200">{f.hours}</span>
                  <br />
                  {f.hoursNote}
                </span>
              </li>
              <li className="flex items-center gap-3 text-emerald-300">
                <PulseDot className="mx-1" />
                {t.topbar.status}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VELOCLOUD. {f.rights}</p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {legal.map((label, i) => (
              <li key={label} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-slate-700">|</span>}
                <a href="#" className="transition-colors duration-200 hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </footer>
  );
}
