import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Note {
  ref: string;
  title: string;
  author: string;
  year: string;
  finding: string;
  abstract: string;
  publication: string;
  tag: string;
  rotate: number;
  /** position on the board, percentages */
  x: number;
  y: number;
  w: number;
}

const notes: Note[] = [
  {
    ref: "01",
    title: "Information Density in East Asian Interfaces",
    author: "K. Nakamura",
    year: "2016",
    finding:
      "Dense pages remained navigable when grouping devices — rules, borders and adjacency — carried the structural load usually given to whitespace.",
    abstract:
      "A survey of 240 Japanese portal and institutional pages comparing whitespace allocation with grouping devices. The study reports that perceived clutter correlated less with element count than with the absence of repeated alignment cues.",
    publication: "Journal of Visual Communication · 24(3) · pp. 41–63",
    tag: "Supports Information Density",
    rotate: -1.4,
    x: 4,
    y: 0,
    w: 30,
  },
  {
    ref: "02",
    title: "Typographic Systems and the Vertical Grid",
    author: "M. Ishikawa & R. Tan",
    year: "2019",
    finding:
      "Logographic scripts tolerate smaller type sizes at equivalent legibility, allowing more content per screen without measurable reading loss.",
    abstract:
      "Comparative legibility testing across Japanese, Chinese and Latin-script layouts. Character density per line was found to be a weak predictor of comprehension time when line spacing stayed constant.",
    publication: "Typography Studies Quarterly · 11(1) · pp. 8–29",
    tag: "Typography",
    rotate: 1.8,
    x: 56,
    y: 12,
    w: 32,
  },
  {
    ref: "03",
    title: "Navigation Patterns of High-Traffic Japanese Portals",
    author: "S. Fujimoto",
    year: "2021",
    finding:
      "Persistent multi-level menus were preferred over progressive disclosure by frequent users, who treated the full index as a map rather than a list.",
    abstract:
      "Click-stream analysis of four national portals over eighteen months. Returning visitors reached target pages faster on exposed navigation than on collapsed equivalents, while first-time visitors showed no significant difference.",
    publication: "Interaction Research Review · 8(2) · pp. 112–138",
    tag: "Navigation",
    rotate: -0.9,
    x: 14,
    y: 36,
    w: 31,
  },
  {
    ref: "04",
    title: "Hierarchy Without Whitespace",
    author: "A. Deshpande",
    year: "2023",
    finding:
      "Hierarchy can be produced through weight, rule and repetition; whitespace is one instrument among several rather than a precondition.",
    abstract:
      "A cross-regional reading of Indian and Japanese public-service interfaces. The paper proposes a vocabulary for describing non-spatial hierarchy and cautions against reading density as a design deficiency.",
    publication: "Design Enquiry · 5(4) · pp. 77–96",
    tag: "Hierarchy",
    rotate: 1.2,
    x: 52,
    y: 56,
    w: 33,
  },
];

/** thin annotation lines drawn between note anchors, in board percentages */
const lines = [
  { x1: 22, y1: 20, x2: 62, y2: 22 },
  { x1: 66, y1: 30, x2: 30, y2: 44 },
  { x1: 30, y1: 54, x2: 60, y2: 62 },
];

function NoteCard({ note, open, onToggle }: { note: Note; open: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: note.rotate * -1.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: note.rotate }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative"
      style={{ zIndex: open ? 30 : 10 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="block w-full cursor-pointer border border-[rgba(245,241,232,0.08)] bg-[rgba(245,241,232,0.03)] p-6 text-left transition-[transform,border-color,background-color] duration-500 ease-out hover:-translate-y-1 hover:border-[rgba(245,241,232,0.2)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(193,124,116,0.7)]"
        style={{ transform: open ? "scale(1.2)" : undefined, transformOrigin: "left top" }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-melodrama text-[10px] tracking-[0.35em] uppercase text-[#C17C74]">
            Source {note.ref}
          </span>
          <span className="font-melodrama text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.4)] transition-opacity duration-500 group-hover:text-[rgba(245,241,232,1)]">
            {note.year}
          </span>
        </div>

        <h3 className="mt-4 font-boska text-[22px] leading-[1.2] tracking-[-0.01em] text-[#F5F1E8]">
          {note.title}
        </h3>
        <div className="mt-2 font-synonym text-[12px] tracking-[0.02em] text-[rgba(245,241,232,0.55)]">
          {note.author}
        </div>

        <div className="mt-5 h-px w-full bg-[rgba(245,241,232,0.08)]" />

        <p className="mt-5 font-synonym text-[13.5px] leading-[1.8] text-[rgba(245,241,232,0.82)]">
          {note.finding}
        </p>

        <div className="mt-5 font-melodrama text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.4)] opacity-40 transition-opacity duration-500 group-hover:opacity-100">
          {note.publication}
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-[rgba(245,241,232,0.08)] pt-5">
                <div className="font-melodrama text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.45)]">
                  Abstract
                </div>
                <p className="mt-3 font-synonym text-[12.5px] leading-[1.85] text-[rgba(245,241,232,0.7)]">
                  {note.abstract}
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </button>

      {/* hover annotation label */}
      <div className="pointer-events-none absolute top-6 left-full ml-4 hidden translate-x-[-6px] items-center gap-3 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 lg:flex">
        <span className="h-px w-8 bg-[rgba(193,124,116,0.5)]" />
        <span className="font-melodrama text-[9px] whitespace-nowrap tracking-[0.35em] uppercase text-[#C17C74]">
          {note.tag}
        </span>
      </div>
    </motion.div>
  );
}

export function LiteratureReview() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      id="literature-review"
      className="relative overflow-hidden border-t border-[rgba(245,241,232,0.08)] bg-[#15171B] px-6 py-32 sm:px-10 lg:px-16 lg:pr-[16rem]"
    >
      {/* drafting grid + paper grain, static */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F5F1E8 1px, transparent 1px), linear-gradient(to bottom, #F5F1E8 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,241,232,0.9) 0.5px, transparent 0.5px), radial-gradient(rgba(245,241,232,0.6) 0.5px, transparent 0.5px)",
          backgroundSize: "7px 7px, 11px 11px",
          backgroundPosition: "0 0, 3px 5px",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] font-synonym">
        {/* masthead */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-12 gap-6"
        >
          <div className="col-span-12 lg:col-span-2">
            <div className="font-boska text-6xl leading-none text-[#A98E7A] sm:text-7xl">02</div>
            <div className="mt-3 font-melodrama text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.5)]">
              Chapter
            </div>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <div className="font-melodrama text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.55)]">
              — Literature Review
            </div>
            <h2 className="mt-6 font-boska text-5xl leading-[1.02] tracking-[-0.01em] sm:text-6xl md:text-7xl">
              Collecting the Evidence
            </h2>
            <div className="mt-10 flex items-center gap-6">
              <div className="h-px w-24 bg-[rgba(245,241,232,0.25)]" />
              <div className="font-melodrama text-[10px] tracking-[0.3em] uppercase text-[rgba(245,241,232,0.4)]">
                § 02 · Pages 020 – 037
              </div>
            </div>
          </div>
        </motion.div>

        {/* investigation board */}
        <div className="relative mt-32">
          {/* annotation lines (desktop board only) */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            {lines.map((l, i) => (
              <motion.line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke="rgba(245,241,232,0.18)"
                strokeWidth={0.08}
                strokeDasharray="0.6 0.9"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-25% 0px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.35 + i * 0.15 }}
              />
            ))}
          </svg>

          {/* desktop: asymmetric absolute board */}
          <div className="relative hidden h-[1500px] lg:block">
            {notes.map((note) => (
              <div
                key={note.ref}
                className="absolute"
                style={{ left: `${note.x}%`, top: `${note.y}%`, width: `${note.w}%` }}
              >
                <NoteCard
                  note={note}
                  open={open === note.ref}
                  onToggle={() => setOpen(open === note.ref ? null : note.ref)}
                />
              </div>
            ))}
          </div>

          {/* mobile / tablet: stacked, still offset */}
          <div className="flex flex-col gap-20 lg:hidden">
            {notes.map((note, i) => (
              <div key={note.ref} className={i % 2 === 0 ? "mr-4 sm:mr-16" : "ml-4 sm:ml-16"}>
                <NoteCard
                  note={note}
                  open={open === note.ref}
                  onToggle={() => setOpen(open === note.ref ? null : note.ref)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* closing caption */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-32 flex items-center gap-6"
        >
          <div className="h-px w-16 bg-[rgba(193,124,116,0.5)]" />
          <div className="font-melodrama text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.55)]">
            Collected Evidence — Proceeding to Methodology
          </div>
        </motion.div>
      </div>
    </section>
  );
}