import type { CSSProperties } from "react";

interface TabbedBrowserProps {
  tabs: string[];
  activeIndex?: number;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

// Mac-style browser window with multiple tabs. Monochrome; parent controls opacity.
// Used as an editorial "open research tabs" motif in the hero background.
export function TabbedBrowser({
  tabs,
  activeIndex = 0,
  className,
  style,
  children,
}: TabbedBrowserProps) {
  return (
    <div
      className={
        "rounded-md border border-[color:var(--hero-line)] bg-transparent overflow-hidden " +
        (className ?? "")
      }
      style={style}
      aria-hidden
    >
      {/* Traffic lights + tab strip */}
      <div className="flex items-center gap-2 border-b border-[color:var(--hero-line)] px-3 pt-2">
        <div className="flex items-center gap-1.5 pb-2">
          <span className="h-2 w-2 rounded-full border border-[color:var(--hero-line-strong)]" />
          <span className="h-2 w-2 rounded-full border border-[color:var(--hero-line-strong)]" />
          <span className="h-2 w-2 rounded-full border border-[color:var(--hero-line-strong)]" />
        </div>
        <div className="flex flex-1 items-end gap-1 overflow-hidden pl-3">
          {tabs.map((label, i) => {
            const active = i === activeIndex;
            return (
              <div
                key={i}
                className={
                  "flex min-w-0 items-center gap-2 rounded-t-md border-b-0 px-2.5 py-1.5 " +
                  (active
                    ? "border border-[color:var(--hero-line-strong)]"
                    : "border border-transparent")
                }
                style={{ maxWidth: 140 }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--hero-line-strong)]" />
                <span
                  className="truncate font-melodrama italic text-[10px] tracking-wide text-[color:var(--hero-primary)]"
                  style={{ opacity: active ? 1 : 0.55 }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 border-b border-[color:var(--hero-line)] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--hero-line-strong)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--hero-line-strong)]" />
        <div className="ml-2 h-2 flex-1 rounded-full border border-[color:var(--hero-line)]" />
      </div>

      {/* Body */}
      <div className="p-3">
        {children ?? <DefaultBody />}
      </div>
    </div>
  );
}

function DefaultBody() {
  return (
    <div className="space-y-2">
      <div className="h-2 w-1/2 rounded-sm bg-[color:var(--hero-line-strong)]" />
      <div className="h-1 w-1/3 rounded-sm bg-[color:var(--hero-line)]" />
      <div className="pt-2 space-y-1.5">
        <div className="h-1 w-full rounded-sm bg-[color:var(--hero-line)]" />
        <div className="h-1 w-11/12 rounded-sm bg-[color:var(--hero-line)]" />
        <div className="h-1 w-10/12 rounded-sm bg-[color:var(--hero-line)]" />
        <div className="h-1 w-9/12 rounded-sm bg-[color:var(--hero-line)]" />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="h-10 rounded-sm border border-[color:var(--hero-line)]" />
        <div className="h-10 rounded-sm border border-[color:var(--hero-line)]" />
        <div className="h-10 rounded-sm border border-[color:var(--hero-line)]" />
      </div>
    </div>
  );
}