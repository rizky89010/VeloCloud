"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { contactSchema, TOPICS, type ContactField, type ContactInput, type ContactValues } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";
import { HoverArrow } from "@/components/ui/primitives";
import { ChevronDownGlyph, SpinnerGlyph } from "@/components/vectors/ui";
import { pulseScene } from "@/components/scenes/engine";
import { submitContact, type ContactResult } from "@/app/(site)/contact/actions";
import { ConnectedState } from "./ConnectedState";

const control =
  "min-h-11 w-full rounded-xl border bg-slate-50/60 px-3.5 py-2.5 text-base text-ink outline-none placeholder:text-slate-400 transition-[border-color,box-shadow,background-color] duration-300 ease-snappy focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] sm:text-sm";

function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-ink">
        {label}
        <span className="text-coral-500">*</span>
      </label>
      {hint && <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const { t, locale } = useLanguage();
  const f = t.form;
  const w = t.wizard;
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState<Exclude<ContactResult, { ok: true }>["error"] | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: { topic: undefined } });

  const err = (field: ContactField) => (errors[field] ? f.errors[field] : undefined);
  const withPulse = (field: keyof ContactInput) => {
    const registered = register(field);
    return {
      ...registered,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        pulseScene(0.12);
        return registered.onChange(event);
      },
    };
  };
  const border = (field: ContactField) => (errors[field] ? "border-red-300" : "border-border");

  async function onSubmit(values: ContactValues) {
    setFailure(null);
    const result = await submitContact(values);
    if (!result.ok) {
      setFailure(result.error);
      return;
    }
    pulseScene(1);
    setSent(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-[0_30px_80px_-20px_rgba(49,46,129,0.35)] backdrop-blur-xl sm:p-8"
    >
      {sent ? (
        <ConnectedState
          ringing={w.ringing}
          connected={w.connected}
          body={w.connectedBody}
          again={w.again}
          onReset={() => {
            reset();
            setSent(false);
          }}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:grid-cols-2">
          <Field label={f.firstName} htmlFor="firstName" error={err("firstName")}>
            <input id="firstName" autoComplete="given-name" className={cn(control, border("firstName"))} {...withPulse("firstName")} />
          </Field>
          <Field label={f.lastName} htmlFor="lastName" error={err("lastName")}>
            <input id="lastName" autoComplete="family-name" className={cn(control, border("lastName"))} {...withPulse("lastName")} />
          </Field>
          <Field label={f.email} htmlFor="email" hint={f.emailHint} error={err("email")} className="sm:col-span-2">
            <input id="email" type="email" autoComplete="email" className={cn(control, border("email"))} {...withPulse("email")} />
          </Field>
          <Field label={f.phone} htmlFor="phone" error={err("phone")} className="sm:col-span-2">
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+62 812 3456 7890"
              className={cn(control, border("phone"))}
              {...withPulse("phone")}
            />
          </Field>
          <Field label={f.company} htmlFor="company" error={err("company")} className="sm:col-span-2">
            <input id="company" autoComplete="organization" className={cn(control, border("company"))} {...withPulse("company")} />
          </Field>
          <Field label={f.website} htmlFor="website" hint={f.websiteHint} error={err("website")} className="sm:col-span-2">
            <input
              id="website"
              inputMode="url"
              autoComplete="url"
              placeholder="https://example.com"
              className={cn(control, border("website"))}
              {...withPulse("website")}
            />
          </Field>
          <Field label={f.topic} htmlFor="topic" error={err("topic")} className="sm:col-span-2">
            <div className="relative">
              <select id="topic" defaultValue="" className={cn(control, "appearance-none pr-10", border("topic"))} {...withPulse("topic")}>
                <option value="" disabled>
                  {f.topicPlaceholder}
                </option>
                {TOPICS.map((topic) => (
                  <option key={topic.key} value={topic.key}>
                    {topic[locale]}
                  </option>
                ))}
              </select>
              <ChevronDownGlyph className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-slate-400" />
            </div>
          </Field>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-[13px] font-semibold text-ink">
              {f.message}
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder={f.messagePlaceholder}
              className={cn(control, "mt-1.5 resize-y border-border")}
              {...withPulse("message")}
            />
          </div>

          {/* Honeypot, hidden from people and assistive tech */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="fax">Fax</label>
            <input id="fax" tabIndex={-1} autoComplete="off" {...register("fax")} />
          </div>

          <AnimatePresence>
            {failure && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700 sm:col-span-2"
              >
                {f.failed[failure]}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-2 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-ink font-semibold text-white shadow-lg shadow-indigo-950/20 transition-[background-color,scale] duration-300 ease-snappy hover:bg-navy-800 active:scale-[0.98] active:duration-150 disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
          >
            {isSubmitting ? <SpinnerGlyph className="size-4" /> : null}
            {isSubmitting ? f.sending : f.submit}
            {!isSubmitting && <HoverArrow />}
          </button>
        </form>
      )}
    </motion.div>
  );
}
