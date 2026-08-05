import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  animate,
} from "motion/react";
import { ChapterShell, ChapterAnnotation, ChapterRule } from "./ChapterShell";

const BORDER = "rgba(245,241,232,0.12)";
const LINE = "rgba(245,241,232,0.18)";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------- drafting background ---------------- */

function DraftingBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,241,232,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,241,232,0.5) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
      <div
        className="absolute inset-y-0 left-[8%] w-px opacity-[0.10]"
        style={{ background: "rgba(245,241,232,0.6)" }}
      />
      <div
        className="absolute inset-y-0 right-[10%] w-px opacity-[0.10]"
        style={{ background: "rgba(245,241,232,0.6)" }}
      />
      <div className="absolute inset-y-0 left-0 flex w-6 flex-col justify-between py-24 opacity-[0.10]">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="h-px"
            style={{
              width: i % 4 === 0 ? 22 : 11,
              background: "rgba(245,241,232,0.8)",
            }}
          />
        ))}
      </div>
      <div className="absolute right-[3%] top-[12%] text-[9px] tracking-[0.4em] uppercase text-[rgba(245,241,232,0.14)]">
        Sheet 03 / Method
      </div>
      <div className="absolute left-[3%] bottom-[8%] text-[9px] tracking-[0.4em] uppercase text-[rgba(245,241,232,0.14)]">
        Scale 1 : 1 · Draft
      </div>
    </div>
  );
}

/* ---------------- step card ---------------- */

interface StepProps {
  number: string;
  title: string;
  meta: string;
  children: ReactNode;
}

function Step({ number, title, meta, children }: StepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <div ref={ref} className="relative pl-12 sm:pl-20">
      {/* node on the line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="absolute left-[-5px] top-[34px] h-[10px] w-[10px] rounded-full border"
        style={{ borderColor: LINE, background: "#17191D" }}
      />
      {/* horizontal connector */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="absolute left-0 top-[38px] h-px origin-left"
        style={{ width: "3rem", background: LINE }}
      />

      <motion.article
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.18 }}
        className="rounded-[14px] p-7 sm:p-9"
        style={{
          background: "#1B1D22",
          border: `1px solid ${BORDER}`,
          boxShadow: "0 18px 48px -28px rgba(0,0,0,0.9)",
        }}
      >
        <header className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-5">
            <span className="font-boska text-3xl leading-none text-[#A98E7A]">{number}</span>
            <h3 className="font-boska text-2xl tracking-[-0.005em] text-[#F5F1E8] sm:text-3xl">
              {title}
            </h3>
          </div>
          <span className="text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.45)]">
            {meta}
          </span>
        </header>
        <div className="mt-7 h-px w-full" style={{ background: BORDER }} />
        <div className="mt-7">{inView ? children : null}</div>
      </motion.article>
    </div>
  );
}

function Reveal({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const bodyClass = "font-synonym text-[15px] leading-[1.85] text-[rgba(245,241,232,0.78)]";
const labelClass = "text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.45)]";

/* ---------------- step bodies ---------------- */

function Checkmark({ delay }: { delay: number }) {
  return (
    <motion.svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <motion.path
        d="M4 12.5 L9.5 18 L20 6"
        stroke="#A98E7A"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
      />
    </motion.svg>
  );
}

function StepSelection() {
  const criteria = ["Government", "Education", "Banking", "Retail", "Travel", "News"];
  return (
    <div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {[
          ["36", "Websites selected"],
          ["06", "Industries"],
          ["02", "Countries — Japan · India"],
        ].map(([n, l], i) => (
          <Reveal key={n} delay={0.1 * i}>
            <div className="font-boska text-4xl text-[#F5F1E8]">{n}</div>
            <div className={`mt-2 ${labelClass}`}>{l}</div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.35}>
        <p className={`mt-8 ${bodyClass}`}>Selection criteria included:</p>
      </Reveal>
      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {criteria.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.45 + i * 0.08 }}
            className="flex items-center gap-3 border-b pb-3 font-synonym text-[14px] text-[rgba(245,241,232,0.8)]"
            style={{ borderColor: BORDER }}
          >
            <Checkmark delay={0.6 + i * 0.08} />
            {c}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function StepFramework() {
  const criteria = [
    "Navigation",
    "Hierarchy",
    "Typography",
    "Information Density",
    "Grid",
    "Whitespace",
    "Visual Grouping",
    "Interaction Design",
    "Content Structure",
    "Visual Rhythm",
    "Reading Flow",
    "Accessibility",
  ];
  return (
    <div>
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-boska text-4xl text-[#F5F1E8]">12</span>
          <span className={labelClass}>Evaluation criteria</span>
        </div>
      </Reveal>
      <div className="relative mt-8">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke={BORDER}
            strokeDasharray="3 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: EASE }}
          />
          <motion.line
            x1="0"
            y1="100%"
            x2="100%"
            y2="100%"
            stroke={BORDER}
            strokeDasharray="3 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          />
        </svg>
        <div className="grid grid-cols-2 gap-px py-5 sm:grid-cols-3">
          {criteria.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.25 + i * 0.07 }}
              className="px-3 py-3"
            >
              <div className="text-[9px] tracking-[0.3em] text-[rgba(245,241,232,0.35)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-1 font-synonym text-[14px] text-[rgba(245,241,232,0.82)]">{c}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Counter({ to, delay }: { to: number; delay: number }) {
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const unsub = mv.on("change", (v) => setVal(Math.round(v)));
    const controls = animate(mv, to, { duration: 1.6, delay, ease: EASE });
    return () => {
      controls.stop();
      unsub();
    };
  }, [mv, to, delay]);
  return <span className="font-boska text-4xl text-[#F5F1E8]">{val}</span>;
}

function StepEvidence() {
  const items = ["Screenshots archived", "Notes recorded", "Metadata organised", "Research log created"];
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="relative">
        {items.map((it, i) => (
          <motion.div
            key={it}
            initial={{ opacity: 0, x: -18, y: -6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.15 + i * 0.18 }}
            className="mb-3 rounded-[10px] px-4 py-3 font-synonym text-[14px] text-[rgba(245,241,232,0.8)]"
            style={{ background: "rgba(245,241,232,0.03)", border: `1px solid ${BORDER}` }}
          >
            {it}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col justify-center gap-4 border-l pl-8" style={{ borderColor: BORDER }}>
        <div>
          <Counter to={36} delay={0.4} />
          <div className={`mt-2 ${labelClass}`}>Websites</div>
        </div>
        <div className="h-6 w-px bg-[rgba(245,241,232,0.18)]" />
        <div>
          <Counter to={432} delay={0.9} />
          <div className={`mt-2 ${labelClass}`}>Observations recorded</div>
        </div>
      </div>
    </div>
  );
}

function StepCoding() {
  const tags = [
    "Visual similarities grouped",
    "Repeated interface behaviours",
    "Navigation systems tagged",
    "Typography classified",
  ];
  return (
    <div className="relative">
      <div className="flex flex-wrap gap-3">
        {tags.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.15 }}
            className="rounded-full px-4 py-2 font-synonym text-[13px] text-[rgba(245,241,232,0.8)]"
            style={{ background: "rgba(245,241,232,0.03)", border: `1px solid ${BORDER}` }}
          >
            {t}
          </motion.span>
        ))}
      </div>
      <svg aria-hidden className="mt-6 h-20 w-full" preserveAspectRatio="none" viewBox="0 0 400 80">
        {[
          "M20 10 C 80 40, 140 20, 200 60",
          "M200 60 C 250 30, 300 50, 380 15",
          "M60 70 C 130 60, 180 30, 260 40",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="rgba(245,241,232,0.18)"
            strokeWidth={1}
            strokeDasharray="3 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.6 + i * 0.25 }}
          />
        ))}
      </svg>
    </div>
  );
}

function StepComparative() {
  return (
    <div>
      <div className="relative flex items-center justify-center gap-6 py-6">
        {["Japan", "India"].map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, x: i === 0 ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 55, damping: 20, delay: 0.15 }}
            className="w-40 rounded-[10px] px-5 py-6 text-center"
            style={{ background: "rgba(245,241,232,0.03)", border: `1px solid ${BORDER}` }}
          >
            <div className="font-boska text-xl text-[#F5F1E8]">{c}</div>
            <div className={`mt-2 ${labelClass}`}>18 files</div>
          </motion.div>
        ))}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
          className="absolute left-1/2 h-px w-16 -translate-x-1/2"
          style={{ background: LINE }}
        />
      </div>
      <ul className="mt-4 space-y-3">
        {["Japan compared with India.", "Findings organised.", "Patterns validated."].map((t, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 1 + i * 0.12 }}
            className={bodyClass}
          >
            {t}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function StepFindings() {
  return (
    <div>
      <motion.div
        initial={{ rotateX: -14, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="rounded-[10px] px-6 py-6"
        style={{
          transformPerspective: 900,
          transformOrigin: "top",
          background: "rgba(245,241,232,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <ul className="space-y-3">
          {[
            "Research complete.",
            "Patterns extracted.",
            "Evidence prepared.",
            "Ready for observations chapter.",
          ].map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.12 }}
              className={bodyClass}
            >
              {t}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
        className="mt-8 h-px w-full origin-left"
        style={{ background: BORDER }}
      />
    </div>
  );
}

/* ---------------- stamp ---------------- */

function Stamp() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });
  return (
    <div ref={ref} className="mt-24 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 1.35, rotate: -4 }}
        animate={
          inView
            ? {
                opacity: [0, 0.85, 0.85, 0.18],
                scale: [1.35, 1, 1, 1],
                rotate: -4,
              }
            : {}
        }
        transition={{ duration: 1.9, times: [0, 0.14, 0.62, 1], ease: EASE }}
        className="rounded-[6px] px-10 py-5"
        style={{ border: "3px solid #A98E7A", color: "#A98E7A" }}
      >
        <div className="font-boska text-3xl tracking-[0.18em] uppercase sm:text-4xl">
          Method Verified
        </div>
        <div className="mt-2 text-center text-[9px] tracking-[0.4em] uppercase">
          Case Complete · 2024
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- chapter ---------------- */

function InvestigationTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className="relative mx-auto max-w-[1180px]">
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{ background: "rgba(245,241,232,0.06)" }}
      />
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
        style={{ background: LINE, scaleY }}
      />

      <div className="space-y-24">
        <Step number="01" title="Website Selection" meta="Sample Frame">
          <StepSelection />
        </Step>
        <Step number="02" title="Observation Framework" meta="Instrument">
          <StepFramework />
        </Step>
        <Step number="03" title="Evidence Collection" meta="Field Work">
          <StepEvidence />
        </Step>
        <Step number="04" title="Pattern Coding" meta="Analysis">
          <StepCoding />
        </Step>
        <Step number="05" title="Comparative Analysis" meta="Cross-Case">
          <StepComparative />
        </Step>
        <Step number="06" title="Research Findings" meta="Closure">
          <StepFindings />
        </Step>
      </div>
    </div>
  );
}

export function Methodology() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end 90%", "end 30%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative bg-[#17191D]">
      <DraftingBackdrop />
      <div className="relative">
        <ChapterShell
          id="methodology"
          number="03"
          label="Methodology"
          heading="How the Investigation Was Conducted"
          pageRef="§ 03 · Pages 038 – 052"
          wide={
            <div className="mt-16">
              <InvestigationTrack />
              <Stamp />
              <div className="mx-auto mt-24 max-w-[1180px]">
                <ChapterRule />
                <div className="max-w-[720px]">
                  <ChapterAnnotation>
                    Continues in Chapter 04 — Comparative Analysis, where the coded evidence is
                    examined side by side across the two sample sets.
                  </ChapterAnnotation>
                </div>
              </div>
            </div>
          }
        >
          <p className={bodyClass}>
            The investigation proceeded in six sequential stages, from sample selection through
            structured observation to comparative coding. Each stage is documented below as it was
            carried out, with the instruments and record counts recorded at the point of use.
          </p>
        </ChapterShell>
      </div>
    </motion.div>
  );
}
