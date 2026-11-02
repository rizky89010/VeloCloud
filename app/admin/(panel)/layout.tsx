import { Suspense } from "react";
import { requireAdmin } from "@/lib/server/session";
import { Sidebar } from "@/components/admin/Sidebar";

// The session cookie is request data, so the panel streams in behind Suspense (Cache Components).
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
      <Panel>{children}</Panel>
    </Suspense>
  );
}

async function Panel({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className="mx-auto grid min-h-screen max-w-[1400px] gap-6 p-4 sm:p-6 lg:grid-cols-[260px_1fr]">
      <Sidebar email={admin.email} />
      <main className="min-w-0 space-y-6">{children}</main>
    </div>
  );
}
