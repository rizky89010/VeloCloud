import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { Scene } from "@/components/scenes/Scene";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <Scene kind="login" />
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-white shadow-[0_30px_80px_-20px_rgba(49,46,129,0.3)] md:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-electric-500 via-indigo-600 to-violet-600 p-10 text-white md:flex md:flex-col">
          <div aria-hidden className="absolute -top-20 -right-20 size-72 rounded-full border border-white/20" />
          <div aria-hidden className="absolute -top-8 -right-8 size-72 rounded-full border border-white/10" />
          <span className="grid size-11 place-items-center rounded-xl bg-white/15 text-sm font-extrabold ring-1 ring-white/30">VC</span>
          <p className="mt-8 text-xs font-semibold tracking-[0.25em] text-white/80">ADMINISTRATION PORTAL</p>
          <h1 className="mt-4 text-3xl leading-tight font-bold">Manage customer inquiries with confidence.</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Review incoming requests from the VeloCloud contact form, track follow-ups, and keep every lead organised.
          </p>
          <div className="mt-auto rounded-2xl border border-white/20 bg-white/10 p-4 text-sm backdrop-blur-xl">
            <p className="font-semibold">Secure admin access</p>
            <p className="mt-1 text-xs text-white/75">This page is restricted to authorised VeloCloud administrators.</p>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
