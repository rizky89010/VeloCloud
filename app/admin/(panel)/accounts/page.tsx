import type { Metadata } from "next";
import { connection } from "next/server";
import { listAdmins } from "@/lib/server/admins";
import { requireAdmin } from "@/lib/server/session";
import { removeAdmin } from "@/app/admin/actions";
import { cn } from "@/lib/cn";
import { AddAdminForm, ChangePasswordForm } from "@/components/admin/AccountForms";
import { cardClass } from "@/components/admin/styles";

export const metadata: Metadata = { title: "Admin accounts" };

export default async function AccountsPage() {
  await connection();
  const me = await requireAdmin();
  const admins = listAdmins();

  return (
    <>
      <header className={cn(cardClass, "p-6 sm:p-8")}>
        <p className="text-xs font-semibold tracking-[0.25em] text-primary">ADMINISTRATION PORTAL</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Admin accounts</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Manage who can access the admin portal and keep your own password up to date.</p>
      </header>

      <section className={cn(cardClass, "overflow-hidden")}>
        <h2 className="p-5 text-base font-semibold text-ink sm:p-6">Administrators</h2>
        <ul className="divide-y divide-border border-t border-border">
          {admins.map((admin) => {
            const isMe = admin.id === me.id;
            const canDelete = !isMe && admins.length > 1;
            return (
              <li key={admin.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
                <div>
                  <p className="font-medium text-ink">
                    {admin.email} {isMe && <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">You</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Added {new Date(admin.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                {canDelete && (
                  <form action={removeAdmin}>
                    <input type="hidden" name="id" value={admin.id} />
                    <button type="submit" className="min-h-9 cursor-pointer rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-100">
                      Remove
                    </button>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className={cn(cardClass, "p-5 sm:p-6")}>
          <h2 className="text-base font-semibold text-ink">Add an administrator</h2>
          <p className="mt-1 text-sm text-muted-foreground">They can sign in right away with this email and password.</p>
          <AddAdminForm />
        </section>
        <section className={cn(cardClass, "p-5 sm:p-6")}>
          <h2 className="text-base font-semibold text-ink">Change your password</h2>
          <p className="mt-1 text-sm text-muted-foreground">Use at least 10 characters.</p>
          <ChangePasswordForm />
        </section>
      </div>
    </>
  );
}
