import type { CSSProperties } from "react";

interface LayoutGridProps {
  columns?: number;
  rows?: number;
  showBaseline?: boolean;
  className?: string;
  style?: CSSProperties;
}

// A pure column/baseline grid — no fills, just hairlines. Parent controls opacity.
export function LayoutGrid({
  columns = 12,
  rows = 8,
  showBaseline = true,
  className,
  style,
}: LayoutGridProps) {
  return (
    <div
      className={"relative w-full h-full " + (className ?? "")}
      style={style}
      aria-hidden
    >
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="border-l border-[color:var(--hero-line-strong)] last:border-r"
          />
        ))}
      </div>
      {showBaseline && (
        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}
        >
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              className="border-t border-[color:var(--hero-line)] last:border-b"
            />
          ))}
        </div>
      )}
    </div>
  );
}