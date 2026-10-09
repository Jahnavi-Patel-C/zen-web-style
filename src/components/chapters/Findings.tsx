import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ChapterShell, ChapterLead, ChapterMarker, ChapterAnnotation, ChapterRule } from "./ChapterShell";

const AY = 470;
const GREY = "rgba(245,241,232,0.34)";
const GREY_SOFT = "rgba(245,241,232,0.20)";
const ACCENT = "#C08C72";

const ORIGINS = [
  { x: 80, n: "01", label: "Navigation" },
  { x: 236, n: "02", label: "Information Density" },
  { x: 392, n: "03", label: "Typography" },
  { x: 548, n: "04", label: "Grouping" },
  { x: 704, n: "05", label: "Whitespace" },
  { x: 860, n: "06", label: "Information Architecture" },
];

const DIVERGED = [
  { mid: [250, 300], end: [430, 120], c1: [130, 380], c2: [180, 330], c3: [320, 250], c4: [370, 150] },
  { mid: [380, 250], end: [600, 210], c1: [290, 400], c2: [320, 300], c3: [450, 205], c4: [520, 180] },
  { mid: [520, 330], end: [820, 96], c1: [440, 420], c2: [470, 370], c3: [610, 300], c4: [740, 150] },
  { mid: [660, 210], end: [930, 260], c1: [600, 400], c2: [620, 280], c3: [740, 160], c4: [860, 200] },
  { mid: [790, 350], end: [960, 330], c1: [750, 430], c2: [760, 390], c3: [860, 320], c4: [920, 300] },
  { mid: [700, 300], end: [420, 300], c1: [900, 420], c2: [820, 330], c3: [600, 280], c4: [500, 300] },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function pathFor(i: number, m: number) {
  const o = ORIGINS[i]!;
  const d = DIVERGED[i]!;
  // converged geometry: every trace bends into a shared trunk
  const cvMid = [536 + i * 5, 272 + (i - 2.5) * 4];
  const cvEnd = [958, 152 + (i - 2.5) * 3];
  const cv = {
    c1: [o.x + 90, 400 - i * 4],
    c2: [380 + i * 6, 320 + (i - 2.5) * 6],
    c3: [700 + i * 3, 236 + (i - 2.5) * 4],
    c4: [860, 176 + (i - 2.5) * 3],
  };
  const p = (a: number[], b: number[]) => `${lerp(a[0]!, b[0]!, m).toFixed(1)},${lerp(a[1]!, b[1]!, m).toFixed(1)}`;
  return (
    `M ${o.x},${AY}` +
    ` C ${p(d.c1, cv.c1)} ${p(d.c2, cv.c2)} ${p(d.mid, cvMid)}` +
    ` C ${p(d.c3, cv.c3)} ${p(d.c4, cv.c4)} ${p(d.end, cvEnd)}`
  );
}

function Trace({ i, progress, morph }: { i: number; progress: MotionValue<number>; morph: MotionValue<number> }) {
  const start = 0.1 + i * 0.032;
  const draw = useTransform(progress, [start, start + 0.3], [0, 1]);
  const d = useTransform(morph, (m) => pathFor(i, m));
  const opacity = useTransform([progress, morph] as const, ([p, m]: number[]) =>
    p! < start ? 0 : 0.55 + (m ?? 0) * 0.25,
  );
  const width = useTransform(morph, [0, 1], [1, 1.2]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={GREY}
      strokeWidth={width}
      strokeLinecap="round"
      style={{ pathLength: draw, opacity }}
    />
  );
}

function OriginPoint({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const o = ORIGINS[i]!;
  const start = 0.1 + i * 0.032;
  const active = useTransform(progress, [start - 0.03, start + 0.04], [0, 1]);
  const r = useTransform(active, [0, 1], [2, 3.4]);
  const fill = useTransform(active, [0, 1], [GREY_SOFT, ACCENT]);
  const labelOpacity = useTransform(progress, [start - 0.02, start + 0.06, 0.66, 0.74], [0, 1, 1, 0.25]);
  return (
    <g>
      <motion.circle cx={o.x} cy={AY} r={r} style={{ fill }} />
      <motion.g style={{ opacity: labelOpacity }}>
        <text
          x={o.x}
          y={AY + 26}
          fill="rgba(245,241,232,0.5)"
          fontSize="9"
          letterSpacing="2.4"
          className="font-synonym"
        >
          {o.n}
        </text>
        <text
          x={o.x}
          y={AY + 42}
          fill="rgba(245,241,232,0.32)"
          fontSize="9"
          letterSpacing="1.6"
          className="font-synonym"
        >
          {o.label.toUpperCase()}
        </text>
      </motion.g>
    </g>
  );
}

const INTERSECTIONS = [
  { x: 430, y: 196, label: "TYPOGRAPHY", at: 0.40 },
  { x: 604, y: 258, label: "DENSITY", at: 0.45 },
  { x: 300, y: 318, label: "NAVIGATION", at: 0.50 },
  { x: 782, y: 214, label: "GROUPING", at: 0.55 },
];

function Intersection({
  node,
  progress,
}: {
  node: (typeof INTERSECTIONS)[number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [node.at, node.at + 0.05, 0.7, 0.78], [0, 1, 1, 0]);
  const dy = useTransform(progress, [node.at, node.at + 0.05], [8, 0]);
  const pulse = useTransform(progress, [node.at, node.at + 0.04, node.at + 0.1], [0, 1, 0.5]);
  return (
    <motion.g style={{ opacity, y: dy }}>
      <motion.circle cx={node.x} cy={node.y} r={2.2} fill={ACCENT} style={{ opacity: pulse }} />
      <line
        x1={node.x + 6}
        y1={node.y}
        x2={node.x + 22}
        y2={node.y}
        stroke="rgba(245,241,232,0.25)"
        strokeWidth={1}
      />
      <text
        x={node.x + 28}
        y={node.y + 3}
        fill="rgba(245,241,232,0.62)"
        fontSize="9"
        letterSpacing="2.6"
        className="font-synonym"
      >
        {node.label}
      </text>
    </motion.g>
  );
}

const GRAPH_POINTS = [
  { x: 80, y: 400, cat: "Education" },
  { x: 236, y: 352, cat: "Travel" },
  { x: 392, y: 300, cat: "News" },
  { x: 548, y: 268, cat: "Banking" },
  { x: 704, y: 214, cat: "E-commerce" },
  { x: 860, y: 176, cat: "Government" },
];

const GRAPH_D = GRAPH_POINTS.reduce((acc, p, i) => {
  if (i === 0) return `M ${p.x},${p.y}`;
  const prev = GRAPH_POINTS[i - 1]!;
  const mx = (prev.x + p.x) / 2;
  return `${acc} C ${mx},${prev.y} ${mx},${p.y} ${p.x},${p.y}`;
}, "");

function Graph({ progress }: { progress: MotionValue<number> }) {
  const draw = useTransform(progress, [0.8, 0.95], [0, 1]);
  const opacity = useTransform(progress, [0.78, 0.86], [0, 1]);
  return (
    <motion.g style={{ opacity }}>
      <motion.path
        d={GRAPH_D}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.5}
        strokeLinecap="round"
        style={{ pathLength: draw }}
      />
      {GRAPH_POINTS.map((p, i) => {
        const at = 0.8 + i * 0.024;
        return <GraphPoint key={p.cat} p={p} at={at} progress={progress} />;
      })}
    </motion.g>
  );
}

function GraphPoint({
  p,
  at,
  progress,
}: {
  p: (typeof GRAPH_POINTS)[number];
  at: number;
  progress: MotionValue<number>;
}) {
  const o = useTransform(progress, [at, at + 0.03], [0, 1]);
  return (
    <motion.g style={{ opacity: o }}>
      <circle cx={p.x} cy={p.y} r={2.4} fill={ACCENT} />
      <line x1={p.x} y1={p.y + 8} x2={p.x} y2={AY - 10} stroke="rgba(245,241,232,0.12)" strokeWidth={1} />
      <text
        x={p.x}
        y={p.y - 14}
        fill="rgba(245,241,232,0.34)"
        fontSize="8.5"
        letterSpacing="1.8"
        className="font-synonym"
      >
        VALUE PENDING
      </text>
      <text
        x={p.x}
        y={AY - 18}
        fill="rgba(245,241,232,0.5)"
        fontSize="9"
        letterSpacing="1.8"
        className="font-synonym"
      >
        {p.cat.toUpperCase()}
      </text>
    </motion.g>
  );
}

function PatternLines() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const morph = useTransform(scrollYProgress, [0.58, 0.78], [0, 1]);
  const traceFade = useTransform(scrollYProgress, [0.8, 0.94], [1, 0.14]);
  const axisOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const stageOpacity = useTransform(scrollYProgress, [0.86, 0.96], [0, 1]);

  return (
    <div ref={ref} className="relative mt-24 h-[360vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1180px] px-2">
          <svg
            viewBox="0 0 1000 560"
            className="w-full"
            role="img"
            aria-label="Scroll-driven visualisation of coded observations converging into one recurring pattern"
          >
            {/* research axis */}
            <motion.g style={{ opacity: axisOpacity }}>
              <line x1={40} y1={AY} x2={975} y2={AY} stroke="rgba(245,241,232,0.28)" strokeWidth={1} />
              {Array.from({ length: 40 }).map((_, i) => (
                <line
                  key={i}
                  x1={40 + i * 24}
                  y1={AY}
                  x2={40 + i * 24}
                  y2={AY + 5}
                  stroke="rgba(245,241,232,0.12)"
                  strokeWidth={1}
                />
              ))}
              <text
                x={40}
                y={34}
                fill="rgba(245,241,232,0.34)"
                fontSize="9"
                letterSpacing="3"
                className="font-synonym"
              >
                AXIS — CODED OBSERVATIONS
              </text>
            </motion.g>

            <motion.g style={{ opacity: traceFade }}>
              {ORIGINS.map((_, i) => (
                <Trace key={i} i={i} progress={scrollYProgress} morph={morph} />
              ))}
            </motion.g>

            {ORIGINS.map((_, i) => (
              <OriginPoint key={i} i={i} progress={scrollYProgress} />
            ))}

            {INTERSECTIONS.map((n) => (
              <Intersection key={n.label} node={n} progress={scrollYProgress} />
            ))}

            <Graph progress={scrollYProgress} />
          </svg>
        </div>

        <motion.div
          style={{ opacity: stageOpacity }}
          className="mx-auto mt-8 max-w-[1180px] px-2 font-synonym"
        >
          <div className="flex items-center gap-5">
            <div className="h-px w-16 bg-[rgba(245,241,232,0.25)]" />
            <p className="font-boska text-xl text-[#F5F1E8]">Several observations. One recurring pattern.</p>
          </div>
          <p className="mt-3 pl-[5.25rem] text-[12px] tracking-[0.18em] uppercase text-[rgba(245,241,232,0.45)]">
            Pattern, rather than clutter, is the question.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const PATTERNS = [
  {
    n: "01",
    title: "Information Density",
    body: "Information is frequently accumulated within a single viewport rather than distributed across large empty fields.",
  },
  {
    n: "02",
    title: "Navigation",
    body: "Multiple destinations can remain visible simultaneously, creating an interface that behaves more like an index than a linear path.",
  },
  {
    n: "03",
    title: "Typography",
    body: "Multiple type scales and scripts can coexist within the same interface while still maintaining functional hierarchy.",
  },
  {
    n: "04",
    title: "Grouping",
    body: "Hierarchy is often reinforced through borders, proximity, repetition and grouping rather than relying primarily on empty space.",
  },
  {
    n: "05",
    title: "Whitespace",
    body: "Whitespace functions differently across the sampled interfaces and should not automatically be interpreted as the primary measure of clarity.",
  },
  {
    n: "06",
    title: "Information Architecture",
    body: "Repeated categories and persistent navigation structures can allow dense interfaces to function as information maps for experienced users.",
  },
];

function PatternRegister() {
  return (
    <div className="mx-auto mt-28 max-w-[1180px]">
      <div className="flex items-center gap-5">
        <div className="text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.45)]">
          Coded Patterns — Sampled Interfaces
        </div>
        <div className="h-px flex-1 bg-[rgba(245,241,232,0.14)]" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-px bg-[rgba(245,241,232,0.10)] md:grid-cols-2">
        {PATTERNS.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="editorial-glass border p-8"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-boska text-lg text-[#A98E7A]">{p.n}</span>
              <span className="font-synonym text-[11px] tracking-[0.3em] uppercase text-[rgba(245,241,232,0.75)]">
                {p.title}
              </span>
            </div>
            <p className="mt-4 max-w-[420px] font-synonym text-[14px] leading-[1.85] text-[rgba(245,241,232,0.6)]">
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 font-synonym text-[11px] tracking-[0.22em] uppercase text-[rgba(245,241,232,0.35)]">
        Sample categories — Education · Travel · News · Banking · E-commerce · Government
      </div>
    </div>
  );
}

export function Findings() {
  return (
    <ChapterShell
      id="findings"
      number="05"
      label="Analysis"
      heading="Pattern Coding"
      pageRef="§ 05 · Pages 073 – 088"
      wide={
        <>
          <PatternLines />
          <PatternRegister />
          <div className="mx-auto mt-24 max-w-[1180px]">
            <ChapterRule />
            <div className="max-w-[720px]">
              <ChapterAnnotation>
                Numerical values across the six sampled categories remain to be finalised; the graph
                above marks their positions rather than reporting figures.
              </ChapterAnnotation>
            </div>
          </div>
        </>
      }
    >
      <ChapterLead>
        Across the sampled interfaces, visual density repeatedly appeared not as an absence of
        hierarchy, but as one of the mechanisms through which hierarchy was constructed.
      </ChapterLead>

      <ChapterMarker label="Coding Process" />
      <p className="mt-10 font-synonym text-[17px] leading-[1.9] text-[rgba(245,241,232,0.82)]">
        The interfaces were coded for recurring structural and typographic behaviours, allowing
        observations from individual sites to be compared across the Japanese and Indian sample.
      </p>
    </ChapterShell>
  );
}
