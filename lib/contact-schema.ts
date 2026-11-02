import { z } from "zod";

// Shared by the contact form (client) and its server action, so both validate the same way.

export const TOPICS = [
  { key: "voice", en: "Voice Solutions", id: "Solusi Voice" },
  { key: "a2p", en: "A2P Messaging", id: "A2P Messaging" },
  { key: "enterprise-sms", en: "Enterprise SMS", id: "Enterprise SMS" },
  { key: "sms-firewall", en: "SMS Firewall", id: "SMS Firewall" },
  { key: "dids", en: "DIDs / Numbers", id: "DIDs / Nomor" },
  { key: "managed-services", en: "Managed Services / Call Center BPO", id: "Managed Services / Call Center BPO" },
  { key: "komdigi", en: "Komdigi Compliance", id: "Kepatuhan Komdigi" },
  { key: "other", en: "Other", id: "Lainnya" },
] as const;

export type TopicKey = (typeof TOPICS)[number]["key"];
const topicKeys = TOPICS.map((t) => t.key) as [TopicKey, ...TopicKey[]];

export function topicLabel(key: string, locale: "en" | "id" = "en") {
  return TOPICS.find((t) => t.key === key)?.[locale] ?? key;
}

/** Accepts "example.com" and adds https:// so people don't have to type the scheme. */
function withScheme(value: string) {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "firstName").max(80),
  lastName: z.string().trim().min(1, "lastName").max(80),
  email: z.email("email").max(160),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{8,18}$/, "phone"),
  company: z.string().trim().min(2, "company").max(120),
  website: z
    .string()
    .trim()
    .min(3, "website")
    .transform(withScheme)
    .pipe(z.url({ protocol: /^https?$/, hostname: z.regexes.domain, error: "website" }).max(200)),
  topic: z.enum(topicKeys, "topic"),
  message: z.string().trim().max(2000).optional().default(""),
  // Honeypot: real visitors never see or fill this field.
  fax: z.string().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;
export type ContactField = "firstName" | "lastName" | "email" | "phone" | "company" | "website" | "topic";
