import type { CSSProperties } from "react";

type Kind = "search" | "toolbar" | "sidebar" | "card" | "breadcrumb" | "form";

interface InterfaceFragmentProps {
  kind: Kind;
  className?: string;
  style?: CSSProperties;
}

// Small, isolated pieces of an interface — as if excerpted from a page.
// Monochrome hairlines; parent controls opacity.
export function InterfaceFragment({ kind, className, style }: InterfaceFragmentProps) {
  return (
    <div
      className={
        "rounded-sm border border-[color:var(--hero-line)] p-2 " + (className ?? "")
      }
      style={style}
      aria-hidden
    >
      {kind === "search" && (
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full border border-[color:var(--hero-line-strong)]" />
          <div className="h-1.5 flex-1 rounded-full bg-[color:var(--hero-line)]" />
          <span className="font-melodrama italic text-[9px] tracking-widest text-[color:var(--hero-primary)] opacity-70">
            ⌘K
          </span>
        </div>
      )}
      {kind === "toolbar" && (
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-sm border border-[color:var(--hero-line-strong)]"
            />
          ))}
          <div className="ml-2 h-2 flex-1 rounded-sm bg-[color:var(--hero-line)]" />
        </div>
      )}
      {kind === "sidebar" && (
        <div className="flex flex-col gap-1.5">
          {["Overview", "Chapters", "Figures", "Notes", "Sources"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[color:var(--hero-line-strong)]" />
              <span className="font-synonym text-[9px] tracking-[0.25em] uppercase text-[color:var(--hero-primary)] opacity-70">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
      {kind === "card" && (
        <div className="space-y-1.5">
          <div className="h-1.5 w-2/3 rounded-sm bg-[color:var(--hero-line-strong)]" />
          <div className="h-1 w-full rounded-sm bg-[color:var(--hero-line)]" />
          <div className="h-1 w-5/6 rounded-sm bg-[color:var(--hero-line)]" />
          <div className="mt-1 h-6 rounded-sm border border-[color:var(--hero-line)]" />
        </div>
      )}
      {kind === "breadcrumb" && (
        <div className="flex items-center gap-2 font-melodrama italic text-[10px] text-[color:var(--hero-primary)] opacity-70">
          <span>Research</span>
          <span>/</span>
          <span>Japan</span>
          <span>/</span>
          <span>Web Design</span>
        </div>
      )}
      {kind === "form" && (
        <div className="space-y-1.5">
          <div className="h-1 w-1/3 rounded-sm bg-[color:var(--hero-line-strong)]" />
          <div className="h-4 rounded-sm border border-[color:var(--hero-line)]" />
          <div className="h-1 w-1/4 rounded-sm bg-[color:var(--hero-line-strong)]" />
          <div className="h-4 rounded-sm border border-[color:var(--hero-line)]" />
        </div>
      )}
    </div>
  );
}