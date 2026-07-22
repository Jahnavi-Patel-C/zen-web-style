import type { CSSProperties } from "react";

type Variant = "specimen" | "scale" | "kanji" | "measure";

interface TypographyStudyProps {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
}

// Editorial typography study blocks — glyphs, scales, measure rules.
// Monochrome. Parent controls opacity.
export function TypographyStudy({
  variant = "specimen",
  className,
  style,
}: TypographyStudyProps) {
  if (variant === "specimen") {
    return (
      <div className={"font-boska text-[color:var(--hero-primary)] " + (className ?? "")} style={style} aria-hidden>
        <div className="flex items-baseline gap-3">
          <span style={{ fontSize: "clamp(72px, 9vw, 140px)", lineHeight: 0.9 }}>Aa</span>
          <span className="font-melodrama italic" style={{ fontSize: "clamp(48px, 6vw, 96px)", lineHeight: 0.9 }}>
            Aa
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2 font-synonym text-[9px] tracking-[0.3em] uppercase">
          <span>Boska</span>
          <span className="h-px w-6 bg-[color:var(--hero-line-strong)]" />
          <span>Melodrama</span>
        </div>
      </div>
    );
  }

  if (variant === "scale") {
    const sizes = [10, 14, 20, 28, 40, 56];
    return (
      <div className={"flex flex-col gap-1 font-boska text-[color:var(--hero-primary)] " + (className ?? "")} style={style} aria-hidden>
        {sizes.map((s) => (
          <div key={s} className="flex items-baseline gap-3">
            <span style={{ fontSize: `${s}px`, lineHeight: 1 }}>Aa</span>
            <span className="font-synonym text-[9px] tracking-[0.25em] uppercase opacity-70">
              {s}px
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "kanji") {
    const glyphs = ["和", "間", "空", "無"];
    const romaji = ["wa", "ma", "kū", "mu"];
    return (
      <div className={"grid grid-cols-2 gap-4 font-boska text-[color:var(--hero-primary)] " + (className ?? "")} style={style} aria-hidden>
        {glyphs.map((g, i) => (
          <div key={g} className="flex flex-col items-start">
            <span style={{ fontSize: "clamp(56px, 6vw, 96px)", lineHeight: 1 }}>{g}</span>
            <span className="mt-1 font-melodrama italic text-[10px] text-[color:var(--hero-secondary)]">
              {romaji[i]}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // measure — ruler with tick marks
  return (
    <div className={"relative w-full h-3 " + (className ?? "")} style={style} aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px bg-[color:var(--hero-line-strong)]" />
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 h-full w-px bg-[color:var(--hero-line-strong)]"
          style={{ left: `${(i / 23) * 100}%`, opacity: i % 4 === 0 ? 1 : 0.5 }}
        />
      ))}
    </div>
  );
}