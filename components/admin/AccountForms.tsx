"use client";

import { useActionState, useEffect, useRef } from "react";
import { addAdmin, changePassword, type FormState } from "@/app/admin/actions";
import { inputClass } from "./styles";

function Feedback({ state }: { state: FormState }) {
  if (state?.error) return <p className="mt-3 text-sm text-red-600">{state.error}</p>;
  if (state?.success) return <p className="mt-3 text-sm text-emerald-700">{state.success}</p>;
  return null;
}

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 min-h-11 cursor-pointer rounded-xl bg-gradient-to-r from-primary to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-primary/25 disabled:opacity-70"
    >
      {children}
    </button>
  );
}

/** Clears the form after a successful submit. */
function useResetOnSuccess(state: FormState) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.success) ref.current?.reset();
  }, [state]);
  return ref;
}

export function AddAdminForm() {
  const [state, action, pending] = useActionState(addAdmin, undefined);
  const ref = useResetOnSuccess(state);
  return (
    <form ref={ref} action={action} className="mt-5 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-ink">Email</span>
        <input name="email" type="email" required autoComplete="off" className={`mt-1.5 ${inputClass}`} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Temporary password</span>
        <input name="password" type="password" required minLength={10} autoComplete="new-password" className={`mt-1.5 ${inputClass}`} />
      </label>
      <Feedback state={state} />
      <Submit pending={pending}>Add admin</Submit>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  const ref = useResetOnSuccess(state);
  return (
    <form ref={ref} action={action} className="mt-5 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-ink">New password</span>
        <input name="password" type="password" required minLength={10} autoComplete="new-password" className={`mt-1.5 ${inputClass}`} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Confirm new password</span>
        <input name="confirm" type="password" required minLength={10} autoComplete="new-password" className={`mt-1.5 ${inputClass}`} />
      </label>
      <Feedback state={state} />
      <Submit pending={pending}>Update password</Submit>
    </form>
  );
}
