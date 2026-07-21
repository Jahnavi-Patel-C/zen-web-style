import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { HeroBackground } from "./HeroBackground";
import { ScrollIndicator } from "./ScrollIndicator";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[color:var(--hero-bg)] text-[color:var(--hero-primary)]"
      style={
        {
          ["--hero-bg" as string]: "#15171B",
          ["--hero-primary" as string]: "#F5F1E8",
          ["--hero-secondary" as string]: "rgba(245,241,232,0.65)",
          ["--hero-muted" as string]: "rgba(245,241,232,0.4)",
          ["--hero-accent" as string]: "#A98E7A",
        } as CSSProperties
      }
    >
      <HeroBackground />

      {/* Foreground column — reserves right gutter for chapter nav + metadata */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-6 pt-10 pb-10 sm:px-10 lg:px-16 lg:pr-[16rem]">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex items-center gap-6 font-synonym"
        >
          <div className="font-melodrama text-[15px] tracking-wide">Japanese Web Design</div>
          <div className="hidden text-[10px] tracking-[0.35em] uppercase text-[color:var(--hero-muted)] sm:block">
            · MMXXVI
          </div>
        </motion.header>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-20 font-synonym text-[11px] tracking-[0.35em] uppercase text-[color:var(--hero-secondary)]"
        >
          Undergraduate Research Publication
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-14 flex items-center gap-4 font-synonym text-[color:var(--hero-secondary)]"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase">§ 01</span>
          <span className="h-px w-10 bg-[color:var(--hero-muted)]" />
          <span className="font-melodrama italic text-sm">a comparative inquiry</span>
        </motion.div>

        <div className="mt-6 max-w-[65%]">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="font-boska font-medium leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(64px, 11vw, 176px)" }}
          >
            <span className="block">Japanese</span>
            <span className="block italic font-normal">Web Design</span>
          </motion.h1>
        </div>

        <div className="mt-10 max-w-xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="font-melodrama italic"
            style={{ fontSize: "clamp(20px, 1.6vw, 26px)" }}
          >
            Through Research, Data & Observation
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-3 font-melodrama italic text-[color:var(--hero-secondary)] text-sm"
          >
            An Undergraduate Comparative Study
          </motion.p>
        </div>

        <div className="grow" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={7}
          className="flex flex-wrap items-end justify-between gap-8"
        >
          <ScrollIndicator />
          <div className="grid grid-cols-2 gap-x-10 gap-y-1 font-synonym">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--hero-muted)]">
              Publication
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--hero-muted)]">
              Format
            </div>
            <div className="font-melodrama text-sm">No. 01 &nbsp;/&nbsp; MMXXVI</div>
            <div className="font-melodrama text-sm">Long-form Essay</div>
          </div>
        </motion.div>
      </div>

      {/* Right-side editorial metadata column — left of the fixed chapter nav */}
      <motion.aside
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-[7rem] top-1/2 z-10 hidden w-[16rem] -translate-y-1/2 font-synonym text-right lg:block"
      >
        <div className="grid grid-cols-2 gap-x-6 opacity-60">
          <div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-[color:var(--hero-muted)]">Volume</div>
            <div className="mt-1 font-melodrama">I · MMXXVI</div>
          </div>
          <div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-[color:var(--hero-muted)]">Field</div>
            <div className="mt-1 font-melodrama">Design Studies</div>
          </div>
        </div>

        <div className="mt-10 opacity-60">
          <div className="flex items-baseline justify-end gap-2">
            <span className="font-boska text-lg">日本</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--hero-secondary)]">
              Nihon · Nippon
            </span>
          </div>
          <div className="mt-1 font-melodrama italic text-xs text-[color:var(--hero-muted)]">
            subject of study
          </div>
        </div>

        <div className="mt-10 opacity-100">
          <div className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--hero-secondary)]">
            Methods
          </div>
          <ul className="mt-2 space-y-1 font-melodrama">
            <li>Literature Review</li>
            <li>Observation</li>
            <li>Analysis</li>
          </ul>
        </div>

        <div className="mt-10 opacity-60">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--hero-secondary)]">
            Comparative Set
          </div>
          <div className="mt-1 font-melodrama">Japan · India</div>
        </div>
      </motion.aside>
    </section>
  );
}