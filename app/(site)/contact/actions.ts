"use server";

import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { createSubmission } from "@/lib/server/submissions";
import { clientIp, hit } from "@/lib/server/rate-limit";

export type ContactResult = { ok: true } | { ok: false; error: "invalid" | "rate" | "server" };

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  // Bots that fill the hidden field get a normal-looking success and nothing is stored.
  if (parsed.data.fax) return { ok: true };

  if (!hit("contact", await clientIp(), 3, 10 * 60 * 1000)) return { ok: false, error: "rate" };

  try {
    const v = parsed.data;
    createSubmission({
      first_name: v.firstName,
      last_name: v.lastName,
      email: v.email,
      phone: v.phone,
      company: v.company,
      website: v.website,
      topic: v.topic,
      message: v.message,
    });
    return { ok: true };
  } catch (error) {
    console.error("Failed to store contact submission", error);
    return { ok: false, error: "server" };
  }
}
