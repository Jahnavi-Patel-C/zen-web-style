import { BrowserWireframe } from "./BrowserWireframe";

// Subtle editorial background layers: wireframes, grid, oversized kanji, faint labels.
// Opacities are constrained to 3–8% per the brief.
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={
        {
          // Local design tokens for the wireframe strokes/fills.
          ["--hero-line" as string]: "rgba(245,241,232,0.06)",
          ["--hero-line-strong" as string]: "rgba(245,241,232,0.14)",
        } as React.CSSProperties
      }
    >
      {/* Baseline column grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F5F1E8 1px, transparent 1px)",
          backgroundSize: "8.333% 100%",
        }}
      />

      {/* Large upper-right wireframe cluster */}
      <div className="absolute right-[10%] top-[6%] w-[46%] max-w-[720px] opacity-[0.08]">
        <BrowserWireframe variant="article" />
      </div>
      <div className="absolute right-[6%] top-[38%] w-[34%] max-w-[520px] opacity-[0.06] rotate-[0.5deg]">
        <BrowserWireframe variant="dashboard" />
      </div>
      <div className="absolute right-[22%] bottom-[8%] w-[28%] max-w-[420px] opacity-[0.05]">
        <BrowserWireframe variant="gallery" />
      </div>
      <div className="absolute left-[42%] bottom-[16%] w-[22%] max-w-[340px] opacity-[0.04]">
        <BrowserWireframe variant="landing" />
      </div>
      <div className="absolute left-[4%] bottom-[4%] w-[18%] max-w-[280px] opacity-[0.04]">
        <BrowserWireframe variant="article" />
      </div>

      {/* Oversized ghost kanji — 和 (harmony) */}
      <div
        className="absolute left-[46%] top-[38%] -translate-x-1/2 select-none opacity-[0.05] font-boska"
        style={{ fontSize: "clamp(240px, 32vw, 520px)", lineHeight: 1 }}
      >
        和
      </div>

      {/* Faint typography study lines — right margin */}
      <div className="absolute right-[3%] top-[28%] flex flex-col gap-2 opacity-[0.06]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-px bg-[color:var(--hero-line-strong)]"
            style={{ width: `${60 + ((i * 17) % 40)}px` }}
          />
        ))}
      </div>

      {/* Faint editorial label — ma / the interval */}
      <div className="absolute right-[8%] top-[30%] text-[10px] tracking-[0.35em] uppercase opacity-[0.07] font-melodrama italic">
        Ma · The Interval
      </div>
    </div>
  );
}
