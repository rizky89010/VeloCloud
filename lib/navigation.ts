import type { Dictionary, Locale } from "@/lib/dictionaries";
import { solutions } from "@/lib/content/solutions";

export type NavItem = { label: string; desc: string; href: string };

/** Items for the Solutions menu. Komdigi Compliance has its own top-level link instead. */
export function solutionNav(locale: Locale): NavItem[] {
  return solutions.map((s) => ({
    label: s.title,
    desc: s.copy[locale].menuDesc,
    href: s.href,
  }));
}

/** Top-level links. Contact is reached through the "Contact our team" button instead. */
export function mainNav(t: Dictionary) {
  return [
    { label: t.nav.insights, href: "/insights" },
    { label: t.nav.compliance, href: "/komdigi-compliance" },
  ];
}
