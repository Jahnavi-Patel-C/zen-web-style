import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Additional reusable editorial fragments layered behind the typography.
// All positioned to sit outside the left-side title column (max-w-[65%])
// and clear of the right metadata rail. Opacities held between 5–8%.
export function EditorialLayers() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const yA = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -1.4]);
  const yB = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -0.8]);

  const fade = {
    hidden: { opacity: 0 },
    show: (i: number = 0) => ({
      opacity: 1,
      transition: { duration: 1.4, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <>
      {/* Baseline ruler — top-right, above the tab cluster */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={0}
        style={{ y: yA }}
        className="absolute right-[6%] top-[3%] w-[38%] max-w-[560px] opacity-[0.07]"
        aria-hidden
      >
        <BaselineRuler />
      </motion.div>

      {/* Column measure marks — vertical, mid-right gutter */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1}
        style={{ y: yB }}
        className="absolute right-[2%] top-[22%] opacity-[0.08]"
        aria-hidden
      >
        <ColumnMeasure />
      </motion.div>

      {/* Typography specimen — mid-right, between tab layers */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={2}
        style={{ y: yA }}
        className="absolute right-[42%] top-[28%] w-[16%] max-w-[220px] opacity-[0.06]"
        aria-hidden
      >
        <TypeSpecimen />
      </motion.div>

      {/* Grid overlay fragment — lower-right */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={3}
        style={{ y: yB }}
        className="absolute right-[38%] bottom-[14%] w-[14%] max-w-[200px] opacity-[0.06]"
        aria-hidden
      >
        <MicroGrid />
      </motion.div>

      {/* Search-result interface fragment — far right, low */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={4}
        style={{ y: yA }}
        className="absolute right-[3%] bottom-[3%] w-[22%] max-w-[320px] opacity-[0.06] rotate-[0.4deg]"
        aria-hidden
      >
        <SearchFragment />
      </motion.div>

      {/* Footnote strip — vertical along far-left edge, well below title footer */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={5}
        style={{ y: yB }}
        className="absolute left-[1.5%] top-[18%] opacity-[0.07]"
        aria-hidden
      >
        <VerticalTicks />
      </motion.div>
    </>
  );
}

function BaselineRuler() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end justify-between">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="w-px bg-[color:var(--hero-line-strong)]"
            style={{ height: i % 4 === 0 ? 10 : 5 }}
          />
        ))}
      </div>
      <div className="h-px w-full bg-[color:var(--hero-line-strong)]" />
      <div className="flex justify-between font-melodrama italic text-[8px] tracking-[0.3em] uppercase text-[color:var(--hero-primary)]">
        <span>0</span>
        <span>ma · 間</span>
        <span>xii</span>
      </div>
    </div>
  );
}

function ColumnMeasure() {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col items-end gap-4 font-melodrama italic text-[8px] tracking-[0.3em] uppercase text-[color:var(--hero-primary)]">
        <span>i</span>
        <span>ii</span>
        <span>iii</span>
        <span>iv</span>
        <span>v</span>
      </div>
      <div className="relative">
        <div className="h-40 w-px bg-[color:var(--hero-line-strong)]" />
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="absolute -left-[3px] h-px w-[7px] bg-[color:var(--hero-line-strong)]"
            style={{ top: `${(i * 100) / 4}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function TypeSpecimen() {
  return (
    <div className="rounded-sm border border-[color:var(--hero-line)] p-3">
      <div className="font-boska text-[42px] leading-none text-[color:var(--hero-primary)]">Aa</div>
      <div className="mt-2 h-px w-full bg-[color:var(--hero-line-strong)]" />
      <div className="mt-2 flex justify-between font-melodrama italic text-[8px] tracking-[0.3em] uppercase text-[color:var(--hero-primary)]">
        <span>Boska</span>
        <span>Reg · Ita</span>
      </div>
      <div className="mt-2 space-y-1">
        <div className="h-px w-full bg-[color:var(--hero-line)]" />
        <div className="h-px w-10/12 bg-[color:var(--hero-line)]" />
        <div className="h-px w-8/12 bg-[color:var(--hero-line)]" />
      </div>
    </div>
  );
}

function MicroGrid() {
  return (
    <div className="rounded-sm border border-[color:var(--hero-line-strong)] p-2">
      <div className="grid grid-cols-6 gap-[3px]">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square border border-[color:var(--hero-line)]"
            style={{ opacity: (i * 37) % 5 === 0 ? 0.9 : 0.4 }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-melodrama italic text-[8px] tracking-[0.3em] uppercase text-[color:var(--hero-primary)]">
        <span>fig. 04</span>
        <span>grid · kihon</span>
      </div>
    </div>
  );
}

function SearchFragment() {
  return (
    <div className="rounded-sm border border-[color:var(--hero-line)] p-3">
      <div className="flex items-center gap-2 border-b border-[color:var(--hero-line)] pb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--hero-line-strong)]" />
        <div className="h-1.5 flex-1 rounded-sm bg-[color:var(--hero-line)]" />
        <span className="font-melodrama italic text-[8px] tracking-[0.3em] uppercase text-[color:var(--hero-primary)]">
          247 res.
        </span>
      </div>
      <div className="mt-3 space-y-2.5">
        {[
          "japanese web density — a survey",
          "vertical rhythm in katakana display",
          "muji, kinokuniya & the grid",
        ].map((label, i) => (
          <div key={i} className="space-y-1">
            <div className="font-melodrama italic text-[9px] tracking-wide text-[color:var(--hero-primary)]">
              {label}
            </div>
            <div className="h-px w-full bg-[color:var(--hero-line)]" />
            <div className="h-px w-9/12 bg-[color:var(--hero-line)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function VerticalTicks() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-melodrama italic text-[8px] tracking-[0.3em] uppercase text-[color:var(--hero-primary)] [writing-mode:vertical-rl]">
        vol · i — fig. i–viii
      </span>
      <div className="h-40 w-px bg-[color:var(--hero-line-strong)]" />
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="h-px w-2 bg-[color:var(--hero-line-strong)]" />
      ))}
    </div>
  );
}