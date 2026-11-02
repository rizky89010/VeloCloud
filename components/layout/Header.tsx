"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownGlyph, MenuGlyph } from "@/components/vectors/ui";
import { useLanguage } from "@/lib/i18n";
import { company } from "@/lib/company";
import type { Locale } from "@/lib/dictionaries";
import { cn } from "@/lib/cn";
import { mainNav, solutionNav } from "@/lib/navigation";
import { Logo, PulseDot, ShimmerButton } from "@/components/ui/primitives";

function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const options: Locale[] = ["id", "en"];

  return (
    <div className="flex items-center" role="group" aria-label="Language">
      {options.map((option, i) => (
        <span key={option} className="flex items-center">
          {i > 0 && <span aria-hidden className="text-slate-300">|</span>}
          <button
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={locale === option}
            className={cn(
              "grid h-11 min-w-11 cursor-pointer place-items-center px-1 text-xs font-bold uppercase transition-colors duration-200 sm:h-9",
              locale === option ? "text-primary" : "text-slate-500 hover:text-ink",
            )}
          >
            {option}
          </button>
        </span>
      ))}
    </div>
  );
}

function TopBar() {
  const { t } = useLanguage();

  return (
    <div className="border-b border-border bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-5">
          <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 whitespace-nowrap hover:text-ink">
            <span className="hidden sm:inline">{t.topbar.email}:</span>
            <span className="font-semibold text-ink">{company.email}</span>
          </a>
          <span className="hidden items-center gap-1.5 truncate md:flex">
            {company.shortAddress}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 whitespace-nowrap sm:flex">
            <PulseDot />
            <span className="font-medium text-emerald-700">{t.topbar.status}</span>
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const solutions = solutionNav(locale);
  const links = mainNav(t);
  const isActive = (href: string) => pathname === href;
  const solutionsActive = solutions.some((s) => isActive(s.href));
  const close = () => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div className="border-b border-border bg-white/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <ul className="hidden items-center gap-1 text-[15px] font-medium text-ink lg:flex">
            <li
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setSolutionsOpen((open) => !open)}
                aria-expanded={solutionsOpen}
                className={cn(
                  "flex h-11 cursor-pointer items-center gap-1 rounded-full px-3 transition-colors duration-200 hover:text-primary",
                  solutionsActive && "text-primary",
                )}
              >
                {t.nav.solutions}
                <ChevronDownGlyph className={cn("size-4 transition-transform duration-300 ease-snappy", solutionsOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-[600px] pt-2"
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-white/95 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
                      {solutions.map(({ label, desc, href }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={close}
                          aria-current={isActive(href) ? "page" : undefined}
                          className={cn(
                            "block rounded-xl p-3 transition-colors duration-200 hover:bg-slate-50",
                            isActive(href) && "bg-slate-50",
                          )}
                        >
                          <span className="block font-semibold text-ink">{label}</span>
                          <span className="block text-xs font-normal text-muted-foreground">{desc}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "flex h-11 items-center rounded-full px-3 transition-colors duration-200 hover:text-primary",
                    isActive(link.href) && "text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ShimmerButton href="/contact">{t.nav.cta}</ShimmerButton>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={t.nav.menu}
              aria-expanded={mobileOpen}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-white text-ink lg:hidden"
            >
              <MenuGlyph open={mobileOpen} />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.18 } }}
              transition={{ duration: 0.25 }}
              className="max-h-[calc(100dvh-7rem)] overflow-y-auto border-t border-border lg:hidden"
            >
              <div className="space-y-1 px-4 py-4 sm:px-6">
                <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {t.nav.solutions}
                </p>
                {solutions.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 font-medium text-ink hover:bg-slate-50",
                      isActive(href) && "bg-slate-50 text-primary",
                    )}
                  >
                    {label}
                  </Link>
                ))}
                <div className="my-2 border-t border-border" />
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-xl px-3 font-medium text-ink hover:bg-slate-50",
                      isActive(link.href) && "text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 sm:hidden" onClick={close}>
                  <ShimmerButton href="/contact" className="w-full">
                    {t.nav.cta}
                  </ShimmerButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
