"use client";

import { useActionState, useEffect, useRef } from "react";
import { removeSubmission, saveSubmission } from "@/app/admin/actions";
import type { Submission } from "@/lib/server/submissions";
import { topicLabel } from "@/lib/contact-schema";
import { CrossGlyph, SpinnerGlyph } from "@/components/vectors/ui";
import { inputClass } from "./styles";

export function SubmissionActions({ submission }: { submission: Submission }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, action, pending] = useActionState(saveSubmission, undefined);

  useEffect(() => {
    if (state?.success) dialogRef.current?.close();
  }, [state]);

  const name = `${submission.first_name} ${submission.last_name}`;

  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="min-h-9 cursor-pointer rounded-lg border border-border px-3 text-xs font-semibold text-ink transition-colors hover:bg-slate-50"
      >
        Edit
      </button>
      <form
        action={removeSubmission}
        onSubmit={(event) => {
          if (!window.confirm(`Delete the submission from ${name}? This cannot be undone.`)) event.preventDefault();
        }}
      >
        <input type="hidden" name="id" value={submission.id} />
        <button type="submit" className="min-h-9 cursor-pointer rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-600 ring-1 ring-red-200 transition-colors hover:bg-red-100">
          Delete
        </button>
      </form>

      {/* Native <dialog>: focus trapping, Esc to close and backdrop come for free. */}
      <dialog
        ref={dialogRef}
        aria-labelledby={`edit-${submission.id}`}
        className="m-auto w-[min(92vw,34rem)] rounded-3xl border border-border bg-white p-0 text-left shadow-2xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm"
      >
        <form action={action} className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 id={`edit-${submission.id}`} className="text-lg font-bold text-ink">
                {name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {submission.company} · {topicLabel(submission.topic)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="grid size-9 cursor-pointer place-items-center rounded-lg text-muted-foreground hover:bg-slate-100 hover:text-ink"
            >
              <CrossGlyph className="size-4" />
            </button>
          </div>

          <dl className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Email</dt>
              <dd className="font-medium break-all text-ink">{submission.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Phone</dt>
              <dd className="font-medium text-ink">{submission.phone}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Message</dt>
              <dd className="whitespace-pre-wrap text-ink">{submission.message || "—"}</dd>
            </div>
          </dl>

          <input type="hidden" name="id" value={submission.id} />
          <label htmlFor={`status-${submission.id}`} className="mt-5 block text-sm font-medium text-ink">
            Status
          </label>
          <select id={`status-${submission.id}`} name="status" defaultValue={submission.status} className={`mt-1.5 ${inputClass}`}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>

          <label htmlFor={`notes-${submission.id}`} className="mt-4 block text-sm font-medium text-ink">
            Follow-up notes
          </label>
          <textarea
            id={`notes-${submission.id}`}
            name="notes"
            rows={4}
            defaultValue={submission.notes}
            placeholder="e.g. Called on Monday, sending a proposal on Friday."
            className={`mt-1.5 resize-y ${inputClass}`}
          />

          {state?.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="min-h-11 cursor-pointer rounded-xl border border-border px-5 text-sm font-semibold text-ink hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-primary/25 disabled:opacity-70"
            >
              {pending && <SpinnerGlyph className="size-4" />}
              Save changes
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
