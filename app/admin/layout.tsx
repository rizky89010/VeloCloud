import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | VELOCLOUD Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex-1 bg-background">
      {/* Faint grid + colour wash, matching the public site's Deep Signal palette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <div aria-hidden className="pointer-events-none fixed -top-40 left-1/3 h-96 w-[40rem] rounded-full bg-gradient-to-r from-electric-500/15 via-indigo-500/10 to-violet-500/15 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}
