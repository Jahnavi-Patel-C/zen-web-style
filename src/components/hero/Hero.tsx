import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import roomAsset from "@/assets/japanese-room-mount-fuji.png.asset.json";
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
  const prefersReducedMotion = useReducedMotion();

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
          ["--hero-veil" as string]: "rgba(15,16,18,0.46)",
        } as CSSProperties
      }
    >
      <motion.img
        src={roomAsset.url}
        alt="Mount Fuji framed by a Japanese room and flowering cherry branches"
        className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.045 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[color:var(--hero-veil)]"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-6 py-10 sm:px-10 lg:px-16 lg:pr-[12rem]">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-synonym"
        >
          <div className="font-melodrama text-[15px] tracking-wide">Japanese Web Design</div>
        </motion.header>

        <div className="my-auto max-w-[760px] pt-16">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-boska font-medium leading-[0.9]"
            style={{ fontSize: "clamp(64px, 10vw, 150px)" }}
          >
            <span className="block">Japanese</span>
            <span className="block italic font-normal">Web Design</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-8 max-w-md font-melodrama italic text-[color:var(--hero-secondary)]"
            style={{ fontSize: "clamp(18px, 1.6vw, 24px)" }}
          >
            A comparative study through research, data and observation.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
  );
}