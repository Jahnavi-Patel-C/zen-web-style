import type { CSSProperties } from "react";

type Variant = "article" | "gallery" | "dashboard" | "landing";

interface BrowserWireframeProps {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
}

// A simplified webpage wireframe: chrome dots, nav bar, content rows, cards, grids.
// Kept monochrome — parent controls opacity/positioning.
export function BrowserWireframe({ variant = "article", className, style }: BrowserWireframeProps) {
  return (
    <div
      className={
        "rounded-md border border-[color:var(--hero-line)] bg-transparent overflow-hidden " +
        (className ?? "")
      }
      style={style}
      aria-hidden
    >
      {/* Chrome */}
      <div className="flex items-center gap-1.5 border-b border-[color:var(--hero-line)] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--hero-line-strong)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--hero-line-strong)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--hero-line-strong)]" />
        <div className="ml-3 h-2 flex-1 rounded-full bg-[color:var(--hero-line)]" />
      </div>

      {/* Nav bar */}
      <div className="flex items-center justify-between border-b border-[color:var(--hero-line)] px-4 py-2.5">
        <div className="h-1.5 w-10 rounded-sm bg-[color:var(--hero-line-strong)]" />
        <div className="flex items-center gap-3">
          <div className="h-1 w-6 rounded-sm bg-[color:var(--hero-line)]" />
          <div className="h-1 w-6 rounded-sm bg-[color:var(--hero-line)]" />
          <div className="h-1 w-6 rounded-sm bg-[color:var(--hero-line)]" />
          <div className="h-1 w-8 rounded-sm bg-[color:var(--hero-line-strong)]" />
        </div>
      </div>

      <Body variant={variant} />
    </div>
  );
}

function Body({ variant }: { variant: Variant }) {
  if (variant === "gallery") {
    return (
      <div className="p-4 space-y-3">
        <div className="h-2 w-1/3 rounded-sm bg-[color:var(--hero-line-strong)]" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-sm border border-[color:var(--hero-line)]" />
          ))}
        </div>
      </div>
    );
  }
  if (variant === "dashboard") {
    return (
      <div className="p-4 grid grid-cols-3 gap-3">
        <div className="col-span-1 space-y-2">
          <div className="h-1.5 w-full rounded-sm bg-[color:var(--hero-line)]" />
          <div className="h-1.5 w-4/5 rounded-sm bg-[color:var(--hero-line)]" />
          <div className="h-1.5 w-3/5 rounded-sm bg-[color:var(--hero-line)]" />
          <div className="h-1.5 w-4/5 rounded-sm bg-[color:var(--hero-line)]" />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <div className="h-16 rounded-sm border border-[color:var(--hero-line)]" />
          <div className="h-16 rounded-sm border border-[color:var(--hero-line)]" />
          <div className="h-16 rounded-sm border border-[color:var(--hero-line)] col-span-2" />
        </div>
      </div>
    );
  }
  if (variant === "landing") {
    return (
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-3 w-2/3 rounded-sm bg-[color:var(--hero-line-strong)]" />
          <div className="h-1.5 w-1/2 rounded-sm bg-[color:var(--hero-line)]" />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="h-14 rounded-sm border border-[color:var(--hero-line)]" />
          <div className="h-14 rounded-sm border border-[color:var(--hero-line)]" />
          <div className="h-14 rounded-sm border border-[color:var(--hero-line)]" />
        </div>
      </div>
    );
  }
  // article
  return (
    <div className="p-4 space-y-2.5">
      <div className="h-2.5 w-2/3 rounded-sm bg-[color:var(--hero-line-strong)]" />
      <div className="h-1.5 w-1/3 rounded-sm bg-[color:var(--hero-line)]" />
      <div className="pt-2 space-y-1.5">
        <div className="h-1 w-full rounded-sm bg-[color:var(--hero-line)]" />
        <div className="h-1 w-11/12 rounded-sm bg-[color:var(--hero-line)]" />
        <div className="h-1 w-full rounded-sm bg-[color:var(--hero-line)]" />
        <div className="h-1 w-10/12 rounded-sm bg-[color:var(--hero-line)]" />
        <div className="h-1 w-9/12 rounded-sm bg-[color:var(--hero-line)]" />
      </div>
    </div>
  );
}
