import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BrowserWireframe } from "./BrowserWireframe";
import { TabbedBrowser } from "./TabbedBrowser";

// Subtle editorial background layers: wireframes, grid, oversized kanji, faint labels.
// Opacities are constrained to 3–8% per the brief.
export function HeroBackground() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  // Tiny parallax — capped at 2px per the brief.
  const yBack = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -2]);
  const yMid = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -1.2]);
  const yFront = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -0.6]);

  const fadeIn = {
    hidden: { opacity: 0 },
    show: (i: number = 0) => ({
      opacity: 1,
      transition: { duration: 1.4, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

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
      <motion.div
        style={{ y: yBack }}
        className="absolute inset-0 opacity-[0.04]"
        // Wrap gradient into a nested div so motion.div doesn't fight the style prop.
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, #F5F1E8 1px, transparent 1px)",
            backgroundSize: "8.333% 100%",
          }}
        />
      </motion.div>

      {/* Open research tabs cluster — right side, layered like a desk of papers */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        custom={0}
        style={{ y: yBack }}
        className="absolute right-[4%] top-[6%] w-[42%] max-w-[640px] opacity-[0.07] rotate-[-0.6deg]"
      >
        <TabbedBrowser
          tabs={["和 · Harmony", "Ma — The Interval", "Kanso", "Yūgen"]}
          activeIndex={0}
        />
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        custom={1}
        style={{ y: yMid }}
        className="absolute right-[10%] top-[34%] w-[34%] max-w-[520px] opacity-[0.06] rotate-[0.8deg]"
      >
        <TabbedBrowser
          tabs={["Grid Systems", "Vertical Rhythm", "Density"]}
          activeIndex={1}
        />
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        custom={2}
        style={{ y: yFront }}
        className="absolute right-[6%] bottom-[8%] w-[30%] max-w-[460px] opacity-[0.05] rotate-[-1deg]"
      >
        <TabbedBrowser
          tabs={["Nikkei.com", "Muji Journal", "Kinokuniya", "NHK"]}
          activeIndex={2}
        />
      </motion.div>

      {/* Supporting wireframe fragments — kept faint, mostly right-aligned */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        custom={3}
        style={{ y: yMid }}
        className="absolute right-[26%] top-[58%] w-[20%] max-w-[300px] opacity-[0.04]"
      >
        <BrowserWireframe variant="gallery" />
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        custom={4}
        style={{ y: yBack }}
        className="absolute left-[4%] bottom-[6%] w-[16%] max-w-[240px] opacity-[0.04]"
      >
        <BrowserWireframe variant="article" />
      </motion.div>

      {/* Oversized ghost kanji — 和 (harmony) */}
      <motion.div
        style={{ y: yBack }}
        className="absolute left-[46%] top-[38%] -translate-x-1/2 select-none opacity-[0.05] font-boska"
      >
        <div style={{ fontSize: "clamp(240px, 32vw, 520px)", lineHeight: 1 }}>和</div>
      </motion.div>

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
    </div>
  );
}
