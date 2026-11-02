import { cn } from "@/lib/cn";

export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[220px] rounded-[2.2rem] border border-slate-300 bg-slate-900 p-2 shadow-2xl shadow-slate-900/20",
        className,
      )}
    >
      <div className="relative h-[300px] overflow-hidden rounded-[1.8rem] bg-slate-50">
        <div className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-900" />
        {children}
      </div>
    </div>
  );
}
