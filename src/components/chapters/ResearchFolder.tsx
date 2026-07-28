import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * An archival research folder. Closed at first; as the reader scrolls the
 * cover lifts and four documents slide out one at a time, each settling
 * beneath the next. At the end the folder gently closes again.
 */

interface Doc {
  n: string;
  label: string;
  title: string;
  lines: string[];
  ref: string;
}

const docs: Doc[] = [
  {
    n: "01",
    label: "Document i",
    title: "Observation",
    lines: [
      "Japanese news sites, government portals and university pages are frequently described as visually dense and information-rich.",
      "These characteristics appear to differ from the minimalist visual language frequently associated with Japanese design in international discourse.",
    ],
    ref: "Field note — 2024",
  },
  {
    n: "02",
    label: "Document ii",
    title: "Research Question",
    lines: [
      "Does visual density in Japanese web interfaces function as an organising system rather than as an absence of hierarchy?",
      "And to what extent are conventions treated as universal in fact shaped by script, reading habit and publishing history?",
    ],
    ref: "Query sheet — 01 of 01",
  },
  {
    n: "03",
    label: "Document iii",
    title: "Scope",
    lines: [
      "Publicly accessible desktop and mobile web interfaces published between 2018 and 2025.",
      "Native applications, print and broadcast media are excluded, though they inform the same visual lineage.",
    ],
    ref: "Scope note — appendix A",
  },
  {
    n: "04",
    label: "Document iv",
    title: "Purpose",
    lines: [
      "To document recurring structural and typographic patterns, to read them alongside Indian web design of the same period,",
      "and to propose descriptive vocabulary for designers working in dense, multilingual contexts.",
    ],
    ref: "Aims — pages 017 – 019",
  },
];

export function ResearchFolder() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const coverRotate = useTransform(scrollYProgress, [0.04, 0.16, 0.9, 0.99], [0, -6, -6, 0]);
  const coverOpacity = useTransform(scrollYProgress, [0.04, 0.18], [1, 0.55]);
  const tabOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.4]);

  if (isMobile) {
    return (
      <div className="mt-16 space-y-8" aria-label="Research folder">
        <FolderCaption />
        {docs.map((d) => (
          <motion.article
            key={d.n}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sheet d={d} />
          </motion.article>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative mt-24 h-[400vh]" aria-label="Research folder">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative w-full">
          <FolderCaption />

          <div className="relative mt-8 h-[62vh] min-h-[420px]">
            {/* folder back panel */}
            <div className="absolute inset-x-0 bottom-0 top-10 border border-[rgba(245,241,232,0.16)] bg-[#1B1D22]" />

            {/* folder tab */}
            <motion.div
              style={{ opacity: tabOpacity }}
              className="absolute left-0 top-0 border border-b-0 border-[rgba(245,241,232,0.16)] bg-[#1B1D22] px-5 py-2"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[rgba(245,241,232,0.5)]">
                Introduction — 04 documents
              </span>
            </motion.div>

            {docs.map((d, i) => (
              <DocSheet key={d.n} d={d} index={i} progress={scrollYProgress} />
            ))}

            {/* folder front cover, hinged at the bottom */}
            <motion.div
              style={{
                rotateX: coverRotate,
                opacity: coverOpacity,
                transformOrigin: "bottom center",
                transformPerspective: 1600,
              }}
              className="pointer-events-none absolute inset-x-0 bottom-0 top-10 border border-[rgba(245,241,232,0.18)] bg-[#191B20]"
            >
              <div className="flex h-full flex-col justify-between p-8">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[rgba(245,241,232,0.45)]">
                    Research folder
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[rgba(245,241,232,0.3)]">
                    § 01
                  </span>
                </div>
                <div>
                  <div className="h-px w-24 bg-[rgba(245,241,232,0.2)]" />
                  <h4 className="mt-6 font-boska text-4xl leading-tight text-[#F5F1E8]">
                    Introductory Investigation
                  </h4>
                  <p className="mt-4 font-synonym text-[13px] tracking-[0.02em] text-[rgba(245,241,232,0.5)]">
                    Collected before the formal analysis begins.
                  </p>
                </div>
                <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.3em] text-[rgba(245,241,232,0.3)]">
                  <span>Observation · Question · Scope · Purpose</span>
                  <span>Sealed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FolderCaption() {
  return (
    <div className="text-[10px] uppercase tracking-[0.35em] text-[rgba(245,241,232,0.4)]">
      Research folder — introductory documents
    </div>
  );
}

function DocSheet({
  d,
  index,
  progress,
}: {
  d: Doc;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.18 + index * 0.16;
  const end = start + 0.12;
  const close = 0.9 + index * 0.015;

  const y = useTransform(
    progress,
    [start, end, close, 0.99],
    ["6%", `${-6 - index * 3}%`, `${-6 - index * 3}%`, "6%"],
  );
  const x = useTransform(
    progress,
    [start, end, close, 0.99],
    ["0%", `${index * 3.5}%`, `${index * 3.5}%`, "0%"],
  );
  const rotate = useTransform(
    progress,
    [start, end, close, 0.99],
    [0, index % 2 ? 1.4 : -1.2, index % 2 ? 1.4 : -1.2, 0],
  );
  const opacity = useTransform(
    progress,
    [start, end, end + 0.16, close, 0.99],
    [0, 1, index === docs.length - 1 ? 1 : 0.4, 0.4, 0],
  );

  return (
    <motion.article
      style={{ x, y, rotate, opacity, zIndex: 10 + index }}
      className="absolute inset-x-8 top-16 origin-bottom"
    >
      <Sheet d={d} />
    </motion.article>
  );
}

function Sheet({ d }: { d: Doc }) {
  return (
    <div className="border border-[rgba(245,241,232,0.14)] bg-[#F5F1E8]/[0.045] px-8 py-8 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-[1px] sm:px-10">
      <div className="flex items-baseline justify-between">
        <span className="font-boska text-[13px] tracking-[0.1em] text-[#A98E7A]">{d.label}</span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[rgba(245,241,232,0.35)]">
          {d.ref}
        </span>
      </div>

      <div className="mt-6 flex items-start gap-6">
        <div className="font-boska text-3xl leading-none text-[rgba(245,241,232,0.28)]">{d.n}</div>
        <div className="flex-1">
          <h4 className="font-boska text-3xl leading-tight tracking-[-0.01em] text-[#F5F1E8] sm:text-4xl">
            {d.title}
          </h4>
          <div className="mt-5 h-px w-full bg-[rgba(245,241,232,0.12)]" />
          {d.lines.map((l) => (
            <p
              key={l}
              className="mt-5 font-synonym text-[15px] leading-[1.8] text-[rgba(245,241,232,0.75)]"
            >
              {l}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}