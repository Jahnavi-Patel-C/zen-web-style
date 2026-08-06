import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { ChapterShell, ChapterRule, ChapterAnnotation } from "./ChapterShell";

const BORDER = "rgba(245,241,232,0.12)";
const LINE = "rgba(245,241,232,0.11)";
const INK = "#F5F1E8";
const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 90, damping: 20, mass: 0.9 };

/* ---------------- blueprint background ---------------- */

function BlueprintBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,241,232,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,241,232,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute inset-y-0 left-[7%] w-px opacity-[0.04] bg-[rgba(245,241,232,0.8)]" />
      <div className="absolute inset-y-0 right-[7%] w-px opacity-[0.04] bg-[rgba(245,241,232,0.8)]" />
      <div className="absolute inset-x-0 top-24 flex justify-between px-[7%] opacity-[0.045]">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="w-px bg-[rgba(245,241,232,0.9)]"
            style={{ height: i % 4 === 0 ? 14 : 7 }}
          />
        ))}
      </div>
      <div className="absolute right-[3%] top-[10%] text-[9px] tracking-[0.4em] uppercase text-[rgba(245,241,232,0.12)]">
        Sheet 04 / Comparison
      </div>
    </div>
  );
}

/* ---------------- morph primitives ---------------- */

type MV = MotionValue<number>;
type Dim = string | number | MotionValue<number> | MotionValue<string>;

function Bar({
  w,
  h,
  strong,
  style,
}: {
  w: Dim;
  h: Dim;
  strong?: boolean;
  style?: Record<string, unknown>;
}) {
  return (
    <motion.div
      className="rounded-[2px]"
      style={{
        width: w as never,
        height: h as never,
        background: strong ? "rgba(245,241,232,0.42)" : "rgba(245,241,232,0.16)",
        ...style,
      }}
    />
  );
}

/* ---------------- the morphing interface ---------------- */

function MorphInterface({ t }: { t: MV }) {
  // shared derived values (0 = India, 1 = Japan)
  const pad = useTransform(t, [0, 1], [28, 12]);
  const gap = useTransform(t, [0, 1], [22, 8]);
  const navGap = useTransform(t, [0, 1], [26, 11]);
  const heroTitleH = useTransform(t, [0, 1], [26, 13]);
  const heroTitleW = useTransform(t, [0, 1], ["62%", "44%"]);
  const heroSubH = useTransform(t, [0, 1], [9, 6]);
  const heroPadY = useTransform(t, [0, 1], [40, 14]);
  const imgH = useTransform(t, [0, 1], [104, 58]);
  const btnW = useTransform(t, [0, 1], [104, 62]);
  const btnH = useTransform(t, [0, 1], [30, 20]);
  const radius = useTransform(t, [0, 1], [10, 3]);
  const sidebarW = useTransform(t, [0, 1], ["0%", "26%"]);
  const sidebarOpacity = useTransform(t, [0, 0.35, 1], [0, 0, 1]);
  const denseOpacity = useTransform(t, [0, 0.4, 1], [0, 0, 1]);
  const airyOpacity = useTransform(t, [0, 0.55, 1], [1, 0, 0]);
  const cardGap = useTransform(t, [0, 1], [16, 6]);
  const rowGap = useTransform(t, [0, 1], [10, 4]);
  const bodyPad = useTransform(t, [0, 1], [26, 12]);
  const dividerOpacity = useTransform(t, [0, 1], [0.25, 1]);
  const padPx = useMotionTemplate`${pad}px`;
  const bodyPadPx = useMotionTemplate`${bodyPad}px`;

  return (
    <div className="flex h-full flex-col">
      {/* nav */}
      <motion.div
        className="flex items-center justify-between border-b"
        style={{
          borderColor: BORDER,
          paddingLeft: padPx,
          paddingRight: padPx,
          paddingTop: useMotionTemplate`${useTransform(t, [0, 1], [20, 9])}px`,
          paddingBottom: useMotionTemplate`${useTransform(t, [0, 1], [20, 9])}px`,
        }}
      >
        <motion.div
          style={{ width: useTransform(t, [0, 1], [78, 52]), height: useTransform(t, [0, 1], [12, 9]) }}
          className="rounded-[2px] bg-[rgba(245,241,232,0.45)]"
        />
        <motion.div className="flex items-center" style={{ gap: navGap }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Bar key={i} w={useTransform(t, [0, 1], [42, 28])} h={useTransform(t, [0, 1], [7, 5])} />
          ))}
          {/* extra nav items appear in Japanese mode */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div key={`x${i}`} style={{ opacity: denseOpacity }}>
              <Bar w={useTransform(t, [0, 1], [0, 24])} h={5} />
            </motion.div>
          ))}
          <motion.div
            className="rounded-[3px] border"
            style={{
              borderColor: BORDER,
              width: useTransform(t, [0, 1], [92, 120]),
              height: useTransform(t, [0, 1], [26, 18]),
            }}
          />
        </motion.div>
      </motion.div>

      {/* utility strip (Japanese only) */}
      <motion.div
        className="flex items-center gap-3 overflow-hidden border-b px-3"
        style={{
          borderColor: BORDER,
          opacity: denseOpacity,
          height: useTransform(t, [0, 1], [0, 22]),
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Bar key={i} w={i % 3 === 0 ? 34 : 22} h={4} />
        ))}
      </motion.div>

      {/* body */}
      <motion.div
        className="flex min-h-0 flex-1"
        style={{ padding: bodyPadPx, gap: useMotionTemplate`${gap}px` }}
      >
        {/* main column */}
        <motion.div className="flex min-w-0 flex-1 flex-col" style={{ gap: useMotionTemplate`${gap}px` }}>
          {/* hero */}
          <motion.div
            className="flex flex-col justify-center border"
            style={{
              borderColor: BORDER,
              borderRadius: radius,
              paddingTop: useMotionTemplate`${heroPadY}px`,
              paddingBottom: useMotionTemplate`${heroPadY}px`,
              paddingLeft: padPx,
              paddingRight: padPx,
              gap: useMotionTemplate`${rowGap}px`,
              background: "rgba(245,241,232,0.02)",
            }}
          >
            <Bar w={heroTitleW} h={heroTitleH} strong />
            <Bar w={useTransform(t, [0, 1], ["44%", "62%"])} h={heroSubH} />
            <motion.div style={{ opacity: denseOpacity, height: useTransform(t, [0, 1], [0, 6]) }}>
              <Bar w="70%" h={5} />
            </motion.div>
            <motion.div
              className="mt-2 flex items-center"
              style={{ gap: useMotionTemplate`${rowGap}px` }}
            >
              <motion.div
                style={{ width: btnW, height: btnH, borderRadius: radius }}
                className="bg-[rgba(245,241,232,0.34)]"
              />
              <motion.div
                style={{ width: btnW, height: btnH, borderRadius: radius, borderColor: BORDER }}
                className="border"
              />
              <motion.div style={{ opacity: denseOpacity }} className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Bar key={i} w={useTransform(t, [0, 1], [0, 40])} h={16} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* section label row */}
          <motion.div className="flex items-center gap-3">
            <Bar w={useTransform(t, [0, 1], [90, 64])} h={useTransform(t, [0, 1], [8, 6])} strong />
            <motion.div
              className="h-px flex-1"
              style={{ background: LINE, opacity: dividerOpacity }}
            />
            <motion.div style={{ opacity: denseOpacity }}>
              <Bar w={40} h={5} />
            </motion.div>
          </motion.div>

          {/* card grid */}
          <motion.div
            className="grid"
            style={{
              gap: useMotionTemplate`${cardGap}px`,
              gridTemplateColumns: useTransform(t, (v) =>
                v > 0.5 ? "repeat(4, minmax(0,1fr))" : "repeat(3, minmax(0,1fr))",
              ),
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex flex-col border"
                style={{
                  borderColor: BORDER,
                  borderRadius: radius,
                  padding: useMotionTemplate`${useTransform(t, [0, 1], [14, 7])}px`,
                  gap: useMotionTemplate`${rowGap}px`,
                  opacity: i > 5 ? denseOpacity : 1,
                  display: useTransform(t, (v) => (i > 5 && v < 0.05 ? "none" : "flex")),
                  background: "rgba(245,241,232,0.02)",
                }}
              >
                <motion.div
                  className="w-full"
                  style={{
                    height: imgH,
                    borderRadius: radius,
                    background: "rgba(245,241,232,0.07)",
                    border: `1px solid ${BORDER}`,
                  }}
                />
                <Bar w="80%" h={useTransform(t, [0, 1], [9, 6])} strong />
                <Bar w="60%" h={useTransform(t, [0, 1], [7, 4])} />
                <motion.div style={{ opacity: denseOpacity }} className="flex flex-col gap-1">
                  <Bar w="90%" h={4} />
                  <Bar w="72%" h={4} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* table emerges */}
          <motion.div
            className="overflow-hidden border"
            style={{
              borderColor: BORDER,
              borderRadius: radius,
              opacity: denseOpacity,
              height: useTransform(t, [0, 1], [0, 76]),
            }}
          >
            {Array.from({ length: 4 }).map((_, r) => (
              <div
                key={r}
                className="grid grid-cols-5 items-center gap-3 border-b px-3 py-[6px]"
                style={{ borderColor: BORDER }}
              >
                {Array.from({ length: 5 }).map((_, c) => (
                  <Bar key={c} w={c === 0 ? "70%" : "50%"} h={4} strong={r === 0} />
                ))}
              </div>
            ))}
          </motion.div>

          {/* airy spacer for Indian mode */}
          <motion.div style={{ opacity: airyOpacity, height: useTransform(t, [0, 1], [24, 0]) }} />
        </motion.div>

        {/* sidebar */}
        <motion.div
          className="flex shrink-0 flex-col overflow-hidden border-l"
          style={{
            width: sidebarW,
            opacity: sidebarOpacity,
            borderColor: BORDER,
            paddingLeft: useMotionTemplate`${useTransform(t, [0, 1], [0, 10])}px`,
            gap: useMotionTemplate`${rowGap}px`,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1 border-b pb-2" style={{ borderColor: BORDER }}>
              <Bar w="55%" h={6} strong />
              <Bar w="92%" h={4} />
              <Bar w="80%" h={4} />
              <Bar w="66%" h={4} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* footer */}
      <motion.div
        className="border-t"
        style={{
          borderColor: BORDER,
          paddingLeft: padPx,
          paddingRight: padPx,
          paddingTop: useMotionTemplate`${useTransform(t, [0, 1], [18, 8])}px`,
          paddingBottom: useMotionTemplate`${useTransform(t, [0, 1], [18, 8])}px`,
        }}
      >
        <motion.div
          className="grid"
          style={{
            gap: useMotionTemplate`${cardGap}px`,
            gridTemplateColumns: useTransform(t, (v) =>
              v > 0.5 ? "repeat(6, minmax(0,1fr))" : "repeat(3, minmax(0,1fr))",
            ),
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-1"
              style={{
                opacity: i > 2 ? denseOpacity : 1,
                display: useTransform(t, (v) => (i > 2 && v < 0.05 ? "none" : "flex")),
              }}
            >
              <Bar w="52%" h={5} strong />
              <Bar w="80%" h={4} />
              <motion.div style={{ opacity: denseOpacity }} className="flex flex-col gap-1">
                <Bar w="70%" h={4} />
                <Bar w="60%" h={4} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------------- annotation panel ---------------- */

const MODES = {
  india: {
    label: "Mode A · Indian Interface",
    traits: [
      "Generous whitespace",
      "Larger typography",
      "Simplified hierarchy",
      "Lower information density",
    ],
  },
  japan: {
    label: "Mode B · Japanese Interface",
    traits: [
      "Compact hierarchy",
      "Denser navigation",
      "Multiple reading paths",
      "Stronger grouping",
      "Higher information density",
    ],
  },
} as const;

function AnnotationPanel({ japanese }: { japanese: boolean }) {
  const mode = japanese ? MODES.japan : MODES.india;
  return (
    <div
      className="relative rounded-[12px] p-6"
      style={{ border: `1px solid ${LINE}`, background: "rgba(245,241,232,0.02)" }}
    >
      <div className="text-[9px] tracking-[0.4em] uppercase text-[rgba(245,241,232,0.4)]">
        Annotation
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="mt-4 font-boska text-2xl text-[#F5F1E8]">{mode.label}</div>
          <ul className="mt-6 space-y-3">
            {mode.traits.map((tr) => (
              <li
                key={tr}
                className="flex items-baseline gap-3 border-b pb-3 font-synonym text-[14px] text-[rgba(245,241,232,0.8)]"
                style={{ borderColor: BORDER }}
              >
                <span className="text-[#A98E7A]">·</span>
                {tr}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.35)]">
        Hover the workspace to transform
      </div>
    </div>
  );
}

/* ---------------- workspace ---------------- */

function Workspace() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const raw = useMotionValue(0);
  const t = useSpring(raw, SPRING);

  // cursor-tracked glass reflection
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 60, damping: 22 });
  const smy = useSpring(my, { stiffness: 60, damping: 22 });
  const glass = useMotionTemplate`radial-gradient(600px circle at ${smx}% ${smy}%, rgba(245,241,232,0.045), transparent 60%)`;

  const setMode = (on: boolean) => {
    setHover(on);
    raw.set(on ? 1 : 0);
  };

  return (
    <div className="grid grid-cols-12 items-start gap-8">
      {/* browser */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ type: "spring", stiffness: 55, damping: 20 }}
        onMouseEnter={() => setMode(true)}
        onMouseLeave={() => setMode(false)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 100);
          my.set(((e.clientY - r.top) / r.height) * 100);
        }}
        className="relative col-span-12 overflow-hidden lg:col-span-8 xl:col-span-9"
        style={{
          height: 760,
          borderRadius: 16,
          background: "#17191D",
          border: `1px solid ${BORDER}`,
          boxShadow: hover
            ? "0 40px 90px -50px rgba(0,0,0,0.95)"
            : "0 24px 60px -40px rgba(0,0,0,0.9)",
          transition: "box-shadow 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* chrome */}
        <div
          className="relative flex items-center gap-2 border-b px-4 py-3"
          style={{ borderColor: BORDER }}
        >
          {["", "", ""].map((_, i) => (
            <span
              key={i}
              className="h-[9px] w-[9px] rounded-full"
              style={{ background: "rgba(245,241,232,0.18)" }}
            />
          ))}
          <motion.div
            className="ml-4 h-[22px] flex-1 rounded-full px-3"
            style={{ background: "rgba(245,241,232,0.05)", border: `1px solid ${BORDER}` }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={hover ? "jp" : "in"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="block pt-[2px] font-synonym text-[10px] tracking-[0.2em] text-[rgba(245,241,232,0.4)]"
              >
                {hover ? "sample-jp.example.jp / 情報" : "sample-in.example.in / home"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          {/* highlight sweep along chrome */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(245,241,232,0.35), transparent)",
            }}
            initial={false}
            animate={hover ? { x: ["-40%", "40%"], opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </div>

        {/* interface */}
        <div className="h-[calc(100%-49px)] overflow-hidden">
          <MorphInterface t={t} />
        </div>

        {/* glass reflection */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: glass, opacity: hover ? 1 : 0, transition: "opacity 600ms" }}
        />
      </motion.div>

      {/* annotation + connectors */}
      <div className="relative col-span-12 lg:col-span-4 xl:col-span-3">
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-8 top-16 hidden h-40 w-8 lg:block"
          viewBox="0 0 32 160"
          preserveAspectRatio="none"
        >
          <path d="M32 20 H14 V140 H0" fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="32" cy="20" r="2" fill="rgba(245,241,232,0.25)" />
        </svg>
        <AnnotationPanel japanese={hover} />
      </div>
    </div>
  );
}

/* ---------------- chapter ---------------- */

export function ComparativeAnalysis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end 90%", "end 30%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative bg-[#17191D]">
      <BlueprintBackdrop />
      <div className="relative">
        <ChapterShell
          id="comparative-analysis"
          number="04"
          label="Comparative Analysis"
          heading="Reconstructing the Interface"
          pageRef="§ 04 · Pages 053 – 072"
          wide={
            <div className="mx-auto mt-16 w-[92%] max-w-[1600px] lg:w-[85%]">
              <Workspace />
              <div className="mt-24">
                <ChapterRule />
                <div className="max-w-[720px]">
                  <ChapterAnnotation>
                    Continues in Chapter 05 — Findings, where the transformations observed here are
                    stated as recorded results.
                  </ChapterAnnotation>
                </div>
              </div>
            </div>
          }
        >
          <p
            className="font-synonym text-[15px] leading-[1.85]"
            style={{ color: "rgba(245,241,232,0.78)" }}
          >
            A single interface is held on the research table. At rest it follows the conventions
            observed across the Indian sample; as the reader engages with it, the same interface
            reorganises itself according to the Japanese sample — navigation, spacing, grid,
            typography and density shifting together rather than in sequence.
          </p>
          <p className="mt-4 text-[9px] tracking-[0.35em] uppercase" style={{ color: INK, opacity: 0.4 }}>
            Hover the workspace to observe the transformation
          </p>
        </ChapterShell>
      </div>
    </motion.div>
  );
}