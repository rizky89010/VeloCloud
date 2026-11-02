"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";
import { cn } from "@/lib/cn";
import { StatusDot } from "@/components/vectors/mini";
import { cardClass } from "./styles";

const links = [
  { href: "/admin", label: "Submissions" },
  { href: "/admin/accounts", label: "Admin accounts" },
];

export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn(cardClass, "flex flex-col p-5 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]")}>
      <div className="flex items-center gap-3 border-b border-border pb-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-600 text-xs font-extrabold text-white">
          VC
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">Admin Portal</p>
          <p className="flex items-center gap-1.5 text-xs text-emerald-700">
            <StatusDot color="bg-emerald-500" className="size-1.5" />
            System online
          </p>
        </div>
      </div>

      <nav className="mt-5 flex gap-2 lg:flex-col">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 flex-1 items-center rounded-xl px-4 text-sm font-semibold transition-colors duration-300 ease-snappy lg:flex-none",
                active ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/25" : "text-ink hover:bg-slate-50",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-border pt-5 lg:mt-auto">
        <p className="truncate text-xs text-muted-foreground" title={email}>
          Signed in as <span className="font-medium text-ink">{email}</span>
        </p>
        <form action={logout} className="mt-3">
          <button
            type="submit"
            className="min-h-11 w-full cursor-pointer rounded-xl border border-border px-4 text-left text-sm font-semibold text-ink transition-colors duration-300 hover:bg-slate-50"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
