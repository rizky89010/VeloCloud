import type { Locale } from "@/lib/dictionaries";

// News items as published on velocloudid.com/insights.html. The source has no article pages yet.
export const insights: { date: string; title: string; summary: Record<Locale, string> }[] = [
  {
    date: "2025-11-17",
    title: "Silvia Ussia Promoted to Director of Strategic Partnerships",
    summary: {
      en: "We're pleased to share that Silvia Ussia has been appointed Director of Strategic Partnerships at VELOCLOUD.",
      id: "Dengan senang hati kami umumkan bahwa Silvia Ussia telah diangkat menjadi Director of Strategic Partnerships di VELOCLOUD.",
    },
  },
  {
    date: "2025-01-31",
    title: "VELOCLOUD Becomes an Official Gateway for Haiti's Natcom",
    summary: {
      en: "VELOCLOUD becomes an official gateway for Haiti's Natcom.",
      id: "VELOCLOUD resmi menjadi gateway untuk Natcom, Haiti.",
    },
  },
  {
    date: "2024-10-18",
    title: "VELOCLOUD Recognised for Third Consecutive Year for Commitment to Combating Telecoms Fraud",
    summary: {
      en: "VELOCLOUD recognised for the third consecutive year for its commitment to combating telecoms fraud.",
      id: "VELOCLOUD kembali mendapat pengakuan untuk tahun ketiga berturut-turut atas komitmennya memerangi fraud telekomunikasi.",
    },
  },
];

export function formatDate(date: string, locale: Locale) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
