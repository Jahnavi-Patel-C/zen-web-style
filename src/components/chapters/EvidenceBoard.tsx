import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/**
 * Archival research cards that begin as one compact stack and are slowly
 * laid out across a research desk as the reader scrolls.
 */

type Fragment = "lines" | "grid" | "nav" | "column" | "glyph" | "form" | "stamp" | "sitemap";

interface Observation {
  n: string;
  title: string;
  note: string;
  annotation: string;
  fragment: Fragment;
  /** final position, % of board */
  x: number;
  y: number;
  rotate: number;
}

const observations: Observation[] = [
  { n: "i", title: "Typography", note: "Multiple type sizes coexist within a single screen without visible conflict.", annotation: "Fig. a — type scale", fragment: "lines", x: 15, y: 22, rotate: -2.4 },
  { n: "ii", title: "Navigation", note: "Menus are broad and shallow; many destinations are exposed at once.", annotation: "Fig. b — top menu", fragment: "nav", x: 38, y: 15, rotate: 1.6 },
  { n: "iii", title: "Hierarchy", note: "Emphasis is carried by boxes and rules more often than by scale alone.", annotation: "Fig. c — rules", fragment: "column", x: 62, y: 20, rotate: -1.2 },
  { n: "iv", title: "Density", note: "Information is packed tightly, yet remains navigable to habitual readers.", annotation: "Fig. d — grid", fragment: "grid", x: 85, y: 27, rotate: 2.2 },
  { n: "v", title: "Whitespace", note: "Negative space is treated as a separator rather than as an aesthetic.", annotation: "Fig. e — measure", fragment: "sitemap", x: 16, y: 66, rotate: 1.9 },
  { n: "vi", title: "Writing Systems", note: "Kanji, kana and Latin sit on the same line at different optical weights.", annotation: "Fig. f — specimen", fragment: "glyph", x: 39, y: 74, rotate: -1.7 },
  { n: "vii", title: "Trust Signals", note: "Seals, dates and notices are placed early rather than in the footer.", annotation: "Fig. g — notice", fragment: "stamp", x: 63, y: 70, rotate: 2.6 },
  { n: "viii", title: "Information Architecture", note: "Categories repeat across the page instead of collapsing into one path.", annotation: "Fig. h — index", fragment: "form", x: 86, y: 76, rotate: -2.1 },
];

export function EvidenceBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const linesOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const settledOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative mt-24 h-[320vh] md:-mx-16 lg:-ml-[13vw] lg:w-[62vw]"
      aria-label="Collected research observations"
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative h-[78vh] w-full">
          {/* connective annotation lines */}
          <motion.svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ opacity: linesOpacity }}
            aria-hidden
          >
            <g stroke="rgba(245,241,232,0.14)" strokeWidth="1" strokeDasharray="2 5">
              <line x1="15%" y1="22%" x2="38%" y2="15%" />
              <line x1="38%" y1="15%" x2="62%" y2="20%" />
              <line x1="62%" y1="20%" x2="85%" y2="27%" />
              <line x1="16%" y1="66%" x2="39%" y2="74%" />
              <line x1="39%" y1="74%" x2="63%" y2="70%" />
              <line x1="63%" y1="70%" x2="86%" y2="76%" />
              <line x1="15%" y1="22%" x2="16%" y2="66%" />
              <line x1="85%" y1="27%" x2="86%" y2="76%" />
            </g>
          </motion.svg>

          {/* board header */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-baseline justify-between">
            <motion.div
              style={{ opacity: captionOpacity }}
              className="text-[10px] uppercase tracking-[0.35em] text-[rgba(245,241,232,0.4)]"
            >
              Collected material — 08 items
            </motion.div>
            <motion.div
              style={{ opacity: settledOpacity }}
              className="text-[10px] uppercase tracking-[0.35em] text-[rgba(245,241,232,0.4)]"
            >
              Investigation board
            </motion.div>
          </div>

          {observations.map((o, i) => (
            <Card key={o.n} o={o} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({
  o,
  index,
  progress,
}: {
  o: Observation;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.08 + index * 0.055;
  const end = Math.min(start + 0.42, 1);

  const left = useTransform(progress, [start, end], ["49%", `${o.x}%`]);
  const top = useTransform(progress, [start, end], ["50%", `${o.y}%`]);
  const rotate = useTransform(progress, [start, end], [(index % 2 ? 1 : -1) * 0.8, o.rotate]);
  const opacity = useTransform(
    progress,
    [0, 0.06, start, end],
    [index > 2 ? 0.35 : 1, index > 2 ? 0.45 : 1, index > 2 ? 0.6 : 1, 1],
  );

  return (
    <motion.article
      style={{
        left,
        top,
        rotate,
        opacity,
        zIndex: observations.length - index,
        x: "-50%",
        y: "-50%",
      }}
      className="absolute w-[248px] border border-[rgba(245,241,232,0.14)] bg-[#181A1F] px-4 py-4 sm:w-[268px]"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-boska text-[13px] tracking-[0.08em] text-[#A98E7A]">{o.n}</span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[rgba(245,241,232,0.35)]">
          {o.annotation}
        </span>
      </div>

      <h4 className="mt-3 font-boska text-[19px] leading-tight tracking-[-0.01em] text-[#F5F1E8]">
        {o.title}
      </h4>

      <div className="mt-3 h-px w-full bg-[rgba(245,241,232,0.1)]" />

      <div className="mt-3 opacity-45">
        <Fragment kind={o.fragment} />
      </div>

      <p className="mt-3 font-synonym text-[12.5px] leading-[1.65] text-[rgba(245,241,232,0.62)]">
        {o.note}
      </p>
    </motion.article>
  );
}

const line = "bg-[rgba(245,241,232,0.35)]";
const edge = "border border-[rgba(245,241,232,0.22)]";

function Fragment({ kind }: { kind: Fragment }) {
  if (kind === "nav") {
    return (
      <div className={`${edge} p-2`} aria-hidden>
        <div className="flex items-center gap-1.5">
          <div className={`h-1 w-6 ${line}`} />
          <div className={`h-1 w-4 ${line}`} />
          <div className={`h-1 w-5 ${line}`} />
          <div className={`h-1 w-3 ${line}`} />
          <div className={`h-1 w-4 ${line}`} />
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <div className={`h-1 w-4 ${line}`} />
          <div className={`h-1 w-6 ${line}`} />
          <div className={`h-1 w-3 ${line}`} />
        </div>
      </div>
    );
  }
  if (kind === "grid") {
    return (
      <div className="grid grid-cols-6 gap-1" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className={`aspect-square ${edge}`} />
        ))}
      </div>
    );
  }
  if (kind === "column") {
    return (
      <div className="grid grid-cols-3 gap-2" aria-hidden>
        <div className={`${edge} h-12`} />
        <div className="col-span-2 space-y-1.5">
          <div className={`h-1.5 w-full ${line}`} />
          <div className={`h-1 w-10/12 ${line}`} />
          <div className={`h-1 w-11/12 ${line}`} />
          <div className={`h-1 w-8/12 ${line}`} />
        </div>
      </div>
    );
  }
  if (kind === "glyph") {
    return (
      <div className="flex items-baseline gap-3" aria-hidden>
        <span className="font-boska text-2xl leading-none text-[rgba(245,241,232,0.6)]">和</span>
        <span className="font-boska text-base leading-none text-[rgba(245,241,232,0.5)]">かな</span>
        <span className="font-synonym text-[11px] tracking-[0.2em] text-[rgba(245,241,232,0.45)]">
          Aa
        </span>
      </div>
    );
  }
  if (kind === "stamp") {
    return (
      <div className="flex items-center gap-2" aria-hidden>
        <div className={`h-8 w-8 rounded-full ${edge}`} />
        <div className="flex-1 space-y-1.5">
          <div className={`h-1 w-full ${line}`} />
          <div className={`h-1 w-7/12 ${line}`} />
        </div>
      </div>
    );
  }
  if (kind === "form") {
    return (
      <div className="space-y-1.5" aria-hidden>
        <div className={`${edge} h-3 w-full`} />
        <div className={`${edge} h-3 w-10/12`} />
        <div className={`${edge} h-3 w-8/12`} />
      </div>
    );
  }
  if (kind === "sitemap") {
    return (
      <div className="flex items-center gap-2" aria-hidden>
        <div className={`h-6 w-6 ${edge}`} />
        <div className={`h-px w-4 ${line}`} />
        <div className="space-y-1.5">
          <div className={`h-2 w-14 ${edge}`} />
          <div className={`h-2 w-10 ${edge}`} />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-1.5" aria-hidden>
      <div className={`h-2 w-7/12 ${line}`} />
      <div className={`h-1 w-full ${line}`} />
      <div className={`h-1 w-11/12 ${line}`} />
      <div className={`h-1 w-9/12 ${line}`} />
    </div>
  );
}