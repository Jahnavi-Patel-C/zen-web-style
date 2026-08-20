import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/* Section 06 — Discussion. Warm paper surface, scroll-driven reasoning network. */

const PAPER = "#E7E0D5";
const INK = "#252321";
const INK_2 = "#68625A";
const COPPER = "#A66F55";
const LINE = "#AFA79C";

const NODES = [
  { id: "density", label: "DENSITY", x: 50, y: 12, from: { x: 0, y: 26 } },
  { id: "navigation", label: "NAVIGATION", x: 13, y: 50, from: { x: -26, y: 0 } },
  { id: "grouping", label: "GROUPING", x: 87, y: 50, from: { x: 26, y: 0 } },
  { id: "typography", label: "TYPOGRAPHY", x: 50, y: 88, from: { x: 0, y: -26 } },
] as const;

const CENTER = { x: 50, y: 50 };

function Node({
  node,
  i,
  p,
}: {
  node: (typeof NODES)[number];
  i: number;
  p: MotionValue<number>;
}) {
  const at = 0.06 + i * 0.05;
  const opacity = useTransform(p, [at, at + 0.08], [0, 1]);
  const dx = useTransform(p, [at, at + 0.1], [node.from.x, 0]);
  const dy = useTransform(p, [at, at + 0.1], [node.from.y, 0]);
  // converge toward the centre in stage 3
  const cx = useTransform(p, [0.62, 0.84], [node.x, node.x + (CENTER.x - node.x) * 0.52]);
  const cy = useTransform(p, [0.62, 0.84], [node.y, node.y + (CENTER.y - node.y) * 0.42]);
  const left = useTransform(cx, (v) => `${v}%`);
  const top = useTransform(cy, (v) => `${v}%`);
  const dim = useTransform(p, [0.72, 0.9], [1, 0.55]);

  return (
    <motion.div
      style={{ left, top, opacity, x: dx, y: dy }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div style={{ opacity: dim }} className="flex flex-col items-center gap-2">
        <span
          className="block h-[7px] w-[7px] rotate-45 border"
          style={{ borderColor: COPPER, background: PAPER }}
        />
        <span
          className="whitespace-nowrap font-synonym text-[10px] tracking-[0.3em]"
          style={{ color: INK_2 }}
        >
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

function Edge({ node, i, p }: { node: (typeof NODES)[number]; i: number; p: MotionValue<number> }) {
  const at = 0.3 + i * 0.05;
  const draw = useTransform(p, [at, at + 0.12], [0, 1]);
  const opacity = useTransform(p, [at, at + 0.06], [0, 1]);
  // shorten as nodes converge
  const t = useTransform(p, [0.62, 0.84], [0, 1]);
  const x1 = useTransform(t, (v) => node.x + (CENTER.x - node.x) * 0.52 * v);
  const y1 = useTransform(t, (v) => node.y + (CENTER.y - node.y) * 0.42 * v);
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={CENTER.x}
      y2={CENTER.y}
      stroke={LINE}
      strokeWidth={0.18}
      style={{ pathLength: draw, opacity }}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function ReasoningNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const hubOpacity = useTransform(scrollYProgress, [0.34, 0.44], [0, 1]);
  const hubScale = useTransform(scrollYProgress, [0.68, 0.86], [1, 1.06]);
  const stmtOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
  const stmtY = useTransform(scrollYProgress, [0.78, 0.9], [10, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <motion.div
            style={{ opacity: gridOpacity }}
            className="relative mx-auto h-[62vh] max-h-[560px] min-h-[380px] w-full max-w-[900px]"
          >
            {/* faint measure grid */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={(i + 1) * 10}
                  y1={0}
                  x2={(i + 1) * 10}
                  y2={100}
                  stroke={LINE}
                  strokeOpacity={0.28}
                  strokeWidth={0.1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1={0}
                  y1={(i + 1) * 16.6}
                  x2={100}
                  y2={(i + 1) * 16.6}
                  stroke={LINE}
                  strokeOpacity={0.22}
                  strokeWidth={0.1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* connecting edges */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Four coded observations connecting toward a single interpretation"
            >
              {NODES.map((n, i) => (
                <Edge key={n.id} node={n} i={i} p={scrollYProgress} />
              ))}
            </svg>

            {/* hub */}
            <motion.div
              style={{ opacity: hubOpacity, scale: hubScale }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border"
                style={{ borderColor: COPPER, background: PAPER }}
              >
                <span
                  className="font-synonym text-[9px] tracking-[0.24em]"
                  style={{ color: COPPER }}
                >
                  06
                </span>
              </div>
            </motion.div>

            {NODES.map((n, i) => (
              <Node key={n.id} node={n} i={i} p={scrollYProgress} />
            ))}
          </motion.div>

          <motion.div
            style={{ opacity: stmtOpacity, y: stmtY }}
            className="mx-auto mt-10 max-w-[760px] text-center"
          >
            <div
              className="mx-auto h-px w-16"
              style={{ background: LINE }}
            />
            <p
              className="mt-6 font-boska text-2xl leading-[1.5] sm:text-[28px]"
              style={{ color: INK }}
            >
              Visual density can function as a mechanism through which hierarchy is constructed.
            </p>
            <p
              className="mt-4 font-synonym text-[11px] tracking-[0.24em] uppercase"
              style={{ color: INK_2 }}
            >
              Central interpretation — derived from four coded observations
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const POINTS = [
  {
    n: "01",
    title: "Density ≠ Disorder",
    body: "Visual density need not indicate weak hierarchy or poor usability. Within the sample, dense interfaces continued to organise information through grouping, adjacency, typographic contrast, navigation structure and repeated visual patterns.",
    note: "Density operates as one of the mechanisms through which hierarchy is constructed, rather than as its absence.",
  },
  {
    n: "02",
    title: "Whitespace ≠ Hierarchy",
    body: "Whitespace is better understood as a structural tool than as an aesthetic quality. The samples do not divide neatly into spacious and dense traditions; spacing, grouping and information density perform different structural roles across categories.",
    note: "Whitespace is one of several mechanisms available for constructing hierarchy, not a measure of clarity in itself.",
  },
  {
    n: "03",
    title: "Navigation as Information Architecture",
    body: "In denser interfaces, navigation behaves less like a menu and more like a map of the information system. Persistent and multi-level navigation, category repetition and grouping allow readers to orient themselves without a linear path.",
    note: "This reading extends the literature on persistent navigation and dense information environments reviewed in § 02.",
  },
  {
    n: "04",
    title: "Design Conventions are Contextual",
    body: "Interface conventions appear to emerge from the interaction of cultural expectations, information environments, technological history, audience behaviour, institutional practice and established design conventions.",
    note: "The comparison indicates patterns within the sample; it does not suggest that all Japanese or Indian interfaces share one fixed visual language.",
  },
];

function DiscussionPoints() {
  return (
    <div className="mx-auto mt-4 max-w-[1180px] px-6">
      <div className="flex items-center gap-5">
        <span
          className="font-synonym text-[10px] tracking-[0.35em] uppercase"
          style={{ color: INK_2 }}
        >
          Interpretation — Four Readings
        </span>
        <span className="h-px flex-1" style={{ background: LINE }} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14">
        {POINTS.map((p, i) => (
          <motion.article
            key={p.n}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="border-t pt-6"
            style={{ borderColor: LINE }}
          >
            <div className="flex items-baseline gap-4">
              <span className="font-boska text-xl" style={{ color: COPPER }}>
                {p.n}
              </span>
              <h3 className="font-boska text-2xl tracking-[-0.005em]" style={{ color: INK }}>
                {p.title}
              </h3>
            </div>
            <p
              className="mt-5 max-w-[480px] font-synonym text-[15px] leading-[1.85]"
              style={{ color: "#3B3733" }}
            >
              {p.body}
            </p>
            <p
              className="mt-5 max-w-[460px] border-l pl-4 font-synonym text-[13px] leading-[1.7]"
              style={{ borderColor: COPPER, color: INK_2 }}
            >
              {p.note}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

const LIMITATIONS = [
  "Limited sample size.",
  "Selected websites rather than the entire Indian or Japanese web ecosystem.",
  "Analysis conducted at interface and homepage level.",
  "Qualitative coding rather than quantitative measurement.",
  "Findings shaped by researcher interpretation.",
  "Differences between industry categories within the sample.",
];

function Limitations() {
  return (
    <div className="mx-auto mt-28 max-w-[1180px] px-6">
      <div className="flex items-center gap-5">
        <span
          className="font-synonym text-[10px] tracking-[0.35em] uppercase"
          style={{ color: INK_2 }}
        >
          Limitations
        </span>
        <span className="h-px flex-1" style={{ background: LINE }} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-px sm:grid-cols-2">
        {LIMITATIONS.map((l, i) => (
          <div
            key={l}
            className="flex items-baseline gap-4 border-b py-4"
            style={{ borderColor: LINE }}
          >
            <span className="font-synonym text-[10px] tracking-[0.25em]" style={{ color: COPPER }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-synonym text-[14px] leading-[1.7]" style={{ color: "#3B3733" }}>
              {l}
            </span>
          </div>
        ))}
      </div>

      <p
        className="mt-8 max-w-[640px] font-synonym text-[13px] leading-[1.8]"
        style={{ color: INK_2 }}
      >
        The study identifies patterns within the selected sample rather than making universal claims
        about every Indian or Japanese website.
      </p>
    </div>
  );
}

export function Discussion() {
  return (
    <section
      id="discussion"
      className="relative overflow-hidden px-0 py-32"
      style={{ background: PAPER, color: INK }}
    >
      {/* restrained paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(37,35,33,0.10) 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative">
        {/* 01 — Section introduction */}
        <div className="mx-auto max-w-[1180px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-12 gap-6 font-synonym"
          >
            <div className="col-span-12 lg:col-span-2">
              <div className="font-boska text-6xl leading-none sm:text-7xl" style={{ color: COPPER }}>
                06
              </div>
              <div
                className="mt-3 text-[10px] tracking-[0.35em] uppercase"
                style={{ color: INK_2 }}
              >
                Chapter
              </div>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <div className="text-[10px] tracking-[0.35em] uppercase" style={{ color: INK_2 }}>
                — Interpretation
              </div>
              <h2
                className="mt-6 font-boska text-5xl leading-[1.02] tracking-[-0.01em] sm:text-6xl md:text-7xl"
                style={{ color: INK }}
              >
                Discussion
              </h2>
              <div className="mt-10 flex items-center gap-6">
                <span className="h-px w-24" style={{ background: LINE }} />
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: INK_2 }}>
                  § 06 · Pages 089 – 104
                </span>
              </div>
              <p
                className="mt-12 max-w-[720px] font-boska text-2xl leading-[1.55] sm:text-[26px]"
                style={{ color: INK }}
              >
                Where the previous chapter recorded what recurred across the sample, this chapter
                asks what those recurrences might mean.
              </p>
              <p
                className="mt-8 max-w-[720px] font-synonym text-[16px] leading-[1.9]"
                style={{ color: "#3B3733" }}
              >
                The coded observations are read together rather than in isolation: density,
                navigation, grouping and typography are treated as related mechanisms rather than
                separate stylistic traits. The interpretations that follow remain tied to the
                sampled interfaces.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 02–04 — Evidence fragments, connection, central interpretation */}
        <ReasoningNetwork />

        {/* 05 — Four discussion points */}
        <DiscussionPoints />

        {/* 06 — Limitations */}
        <Limitations />

        {/* 07 — Closing transition */}
        <div className="mx-auto mt-28 max-w-[1180px] px-6">
          <div className="h-px w-full" style={{ background: LINE }} />
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[560px] font-boska text-xl leading-[1.6]" style={{ color: INK }}>
              The comparison ends here; what remains is the reading it makes possible.
            </p>
            <span
              className="font-synonym text-[10px] tracking-[0.35em] uppercase"
              style={{ color: INK_2 }}
            >
              Comparison → Interpretation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
