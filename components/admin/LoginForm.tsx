"use client";

import { useActionState, useState } from "react";
import { login } from "@/app/admin/actions";
import { HoverArrow } from "@/components/ui/primitives";
import { SpinnerGlyph } from "@/components/vectors/ui";
import { inputClass } from "./styles";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const [show, setShow] = useState(false);

  return (
    <form action={action} className="flex h-full flex-col justify-center">
      <p className="text-sm font-semibold text-primary">Welcome back</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Sign in to your account</h2>
      <p className="mt-2 text-sm text-muted-foreground">Enter your administrator credentials to continue.</p>

      <label htmlFor="email" className="mt-8 text-sm font-medium text-ink">
        Email address
      </label>
      <input id="email" name="email" type="email" autoComplete="username" required placeholder="admin@company.com" className={`mt-1.5 ${inputClass}`} />

      <label htmlFor="password" className="mt-5 text-sm font-medium text-ink">
        Password
      </label>
      <div className="relative mt-1.5">
        <input
          id="password"
          name="password"
          type={show ? "text" : "password"}
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          className={`${inputClass} pr-16`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-pressed={show}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-ink"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {state?.error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-6 inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 font-semibold text-white shadow-lg shadow-primary/25 transition-[box-shadow,scale] duration-300 ease-snappy hover:shadow-xl active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        {pending && <SpinnerGlyph className="size-4" />}
        Sign in
        {!pending && <HoverArrow />}
      </button>
      <p className="mt-6 text-center text-xs text-muted-foreground">Protected system. Unauthorised access is prohibited.</p>
    </form>
  );
}
