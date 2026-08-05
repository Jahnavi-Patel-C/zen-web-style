import { useRef, useState } from "react";
import { motion, useAnimationFrame, useScroll, useTransform, useInView } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Source {
  ref: string;
  year: string;
  title: string;
  author: string;
  finding: string;
  abstract: string;
  publication: string;
  /** entry direction offset */
  from: { x: number; y: number };
}

const sources: Source[] = [
  {
    ref: "01",
    year: "2016",
    title: "Information Density in East Asian Interfaces",
    author: "K. Nakamura",
    finding: "Dense pages stayed navigable when grouping devices carried the structural load.",
    abstract:
      "A survey of 240 Japanese portal and institutional pages comparing whitespace allocation with grouping devices. Perceived clutter correlated less with element count than with the absence of repeated alignment cues.",
    publication: "Journal of Visual Communication · 24(3)",
    from: { x: -420, y: -260 },
  },
  {
    ref: "02",
    year: "2019",
    title: "Typographic Systems and the Vertical Grid",
    author: "M. Ishikawa & R. Tan",
    finding: "Logographic scripts tolerate smaller type at equivalent legibility.",
    abstract:
      "Comparative legibility testing across Japanese, Chinese and Latin-script layouts. Character density per line was a weak predictor of comprehension time when line spacing stayed constant.",
    publication: "Typography Studies Quarterly · 11(1)",
    from: { x: 380, y: -320 },
  },
  {
    ref: "03",
    year: "2021",
    title: "Navigation Patterns of High-Traffic Portals",
    author: "S. Fujimoto",
    finding: "Frequent users preferred persistent menus, treating the index as a map.",
    abstract:
      "Click-stream analysis of four national portals over eighteen months. Returning visitors reached targets faster on exposed navigation; first-time visitors showed no significant difference.",
    publication: "Interaction Research Review · 8(2)",
    from: { x: 460, y: 120 },
  },
  {
    ref: "04",
    year: "2023",
    title: "Hierarchy Without Whitespace",
    author: "A. Deshpande",
    finding: "Hierarchy can be produced through weight, rule and repetition.",
    abstract:
      "A cross-regional reading of Indian and Japanese public-service interfaces. Proposes a vocabulary for non-spatial hierarchy and cautions against reading density as a design deficiency.",
    publication: "Design Enquiry · 5(4)",
    from: { x: 300, y: 380 },
  },
  {
    ref: "05",
    year: "2018",
    title: "Reading Behaviour on Multi-Column Layouts",
    author: "H. Sato",
    finding: "Scanning paths adapted quickly to repeated column widths across pages.",
    abstract:
      "Eye-tracking of 62 participants across three column systems. Consistency of measure between pages mattered more to scan efficiency than the number of columns present.",
    publication: "Applied Ergonomics Letters · 33(2)",
    from: { x: -160, y: 420 },
  },
  {
    ref: "06",
    year: "2020",
    title: "Trust Signals in Institutional Web Pages",
    author: "Y. Mori & P. Iyer",
    finding: "Visible breadth of content was read as institutional completeness.",
    abstract:
      "Survey work with 410 respondents in Japan and India. Pages showing more visible sections were rated as more thorough, independent of the depth of any individual section.",
    publication: "Public Communication Studies · 15(1)",
    from: { x: -450, y: 220 },
  },
  {
    ref: "07",
    year: "2017",
    title: "Localisation and the Limits of Minimalism",
    author: "T. Okabe",
    finding: "Minimalist templates lost information when adapted to Japanese content.",
    abstract:
      "Case analysis of eleven global brands localising to the Japanese market. Reduced templates were routinely extended locally, suggesting content expectations outpaced the imported system.",
    publication: "Global Design Practice · 6(3)",
    from: { x: -480, y: -40 },
  },
  {
    ref: "08",
    year: "2022",
    title: "Mobile Density and Sectioned Scrolling",
    author: "R. Banerjee",
    finding: "Sectioned scrolling preserved density without raising error rates.",
    abstract:
      "Task-based comparison of dense and sparse mobile layouts. Clear section rules allowed dense mobile pages to match sparse equivalents on completion time and error rate.",
    publication: "Mobile Interaction Journal · 9(4)",
    from: { x: 120, y: -420 },
  },
];

const RADIUS = 380;
const PERIOD = 45000;

function OrbitCard({
  source,
  angle,
  hovered,
  dimmed,
  collapse,
  index,
  onHover,
}: {
  source: Source;
  angle: number;
  hovered: boolean;
  dimmed: boolean;
  collapse: number;
  index: number;
  onHover: (ref: string | null) => void;
}) {
  const r = RADIUS * (hovered ? 0.52 : 1) * (1 - collapse);
  const x = Math.cos(angle) * r * 1.02;
  const y = Math.sin(angle) * r * 0.80;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[240px]"
      initial={{ opacity: 0, x: source.from.x, y: source.from.y, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ type: "spring", stiffness: 42, damping: 18, delay: 0.5 + index * 0.12 }}
      style={{ marginLeft: -120 }}
    >
      <motion.div
        animate={{
          x,
          y,
          scale: hovered ? 1.08 : 1,
          opacity: collapse > 0.6 ? 0 : dimmed ? 0.2 : hovered ? 1 : 0.86,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.7 }}
        onHoverStart={() => onHover(source.ref)}
        onHoverEnd={() => onHover(null)}
        className="rounded-[14px] border border-[rgba(245,241,232,0.08)] bg-[#17191D] p-5"
        style={{ zIndex: hovered ? 40 : 20 }}
      >
        <div className="flex items-baseline justify-between">
          <span className="font-synonym text-[9px] tracking-[0.35em] uppercase text-[#B89367]">
            Source {source.ref}
          </span>
          <span className="font-synonym text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.4)]">
            {source.year}
          </span>
        </div>
        <h3 className="mt-3 font-boska text-[19px] leading-[1.22] text-[#F5F1E8]">{source.title}</h3>
        <div className="mt-1.5 font-synonym text-[11.5px] text-[rgba(245,241,232,0.5)]">
          {source.author}
        </div>
        <div className="mt-4 h-px w-full bg-[rgba(245,241,232,0.08)]" />
        <p className="mt-4 font-synonym text-[12.5px] leading-[1.7] text-[rgba(245,241,232,0.8)]">
          {source.finding}
        </p>
        <motion.div
          animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="overflow-hidden"
        >
          <p className="mt-4 font-synonym text-[11.5px] leading-[1.8] text-[rgba(245,241,232,0.62)]">
            {source.abstract}
          </p>
        </motion.div>
        <div className="mt-4 font-synonym text-[9px] tracking-[0.3em] uppercase text-[rgba(245,241,232,0.38)]">
          {source.publication}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LiteratureReview() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: "-10% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [base, setBase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end 80%", "end 20%"],
  });
  const collapseMV = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [collapse, setCollapse] = useState(0);
  useAnimationFrame((_, delta) => {
    setCollapse(collapseMV.get());
    if (!inView || hovered) return;
    setBase((b) => b + (delta / PERIOD) * Math.PI * 2);
  });

  const positions = sources.map((_, i) => base + (i / sources.length) * Math.PI * 2);
  const hoveredIndex = sources.findIndex((s) => s.ref === hovered);

  return (
    <section
      ref={sectionRef}
      id="literature-review"
      className="relative overflow-hidden border-t border-[rgba(245,241,232,0.08)] bg-[#15171B] px-6 py-32 sm:px-10 lg:px-16 lg:pr-[16rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F5F1E8 1px, transparent 1px), linear-gradient(to bottom, #F5F1E8 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(#F5F1E8 0.5px, transparent 0.5px)",
          backgroundSize: "9px 9px",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] font-synonym">
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

        {/* orbit stage — desktop */}
        <div
          ref={stageRef}
          className="relative mt-24 hidden h-[900px] w-full items-center justify-center xl:flex"
        >
          {/* orbit ellipse guide */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 rounded-[50%] border border-[rgba(245,241,232,0.06)]"
            style={{ width: RADIUS * 2 * 1.02, height: RADIUS * 2 * 0.80, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1 - collapse, scale: 1 - collapse * 0.6 }}
            transition={{ duration: 0.4, ease: EASE }}
          />

          {/* connecting line on hover */}
          {hovered && hoveredIndex >= 0 ? (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ zIndex: 15 }}
            >
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${Math.cos(positions[hoveredIndex]!) * RADIUS * 0.52 * 1.02}px)`}
                y2={`calc(50% + ${Math.sin(positions[hoveredIndex]!) * RADIUS * 0.52 * 0.80}px)`}
                stroke="rgba(184,147,103,0.5)"
                strokeWidth={1}
                strokeDasharray="3 4"
              />
            </svg>
          ) : null}

          {/* hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ type: "spring", stiffness: 50, damping: 18 }}
            className="absolute top-1/2 left-1/2 z-30 flex h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[rgba(245,241,232,0.22)] bg-[#131519] px-10 text-center"
            style={{ boxShadow: "0 0 80px 12px rgba(184,147,103,0.07) inset, 0 0 60px rgba(0,0,0,0.5)" }}
          >
            <motion.div
              animate={{ opacity: 1 - collapse }}
              className="flex flex-col items-center"
            >
              <div className="font-synonym text-[9px] tracking-[0.4em] uppercase text-[#B89367]">
                Research Question
              </div>
              <div className="mt-4 h-px w-10 bg-[rgba(245,241,232,0.2)]" />
              <p className="mt-5 font-boska text-[17px] leading-[1.4] text-[#F5F1E8]">
                How does Japanese web design maintain usability despite its high information
                density?
              </p>
            </motion.div>
          </motion.div>

          {sources.map((s, i) => (
            <OrbitCard
              key={s.ref}
              source={s}
              index={i}
              angle={positions[i]!}
              hovered={hovered === s.ref}
              dimmed={hovered !== null && hovered !== s.ref}
              collapse={collapse}
              onHover={setHovered}
            />
          ))}
        </div>

        {/* compact stacked fallback */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 xl:hidden">
          <div className="rounded-[14px] border border-[rgba(245,241,232,0.14)] bg-[#131519] p-8 sm:col-span-2">
            <div className="font-synonym text-[9px] tracking-[0.4em] uppercase text-[#B89367]">
              Research Question
            </div>
            <p className="mt-4 font-boska text-[20px] leading-[1.35] text-[#F5F1E8]">
              How does Japanese web design maintain usability despite its high information density?
            </p>
          </div>
          {sources.map((s) => (
            <div
              key={s.ref}
              className="rounded-[14px] border border-[rgba(245,241,232,0.08)] bg-[#17191D] p-5"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-synonym text-[9px] tracking-[0.35em] uppercase text-[#B89367]">
                  Source {s.ref}
                </span>
                <span className="font-synonym text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.4)]">
                  {s.year}
                </span>
              </div>
              <h3 className="mt-3 font-boska text-[19px] leading-[1.22] text-[#F5F1E8]">
                {s.title}
              </h3>
              <div className="mt-1.5 font-synonym text-[11.5px] text-[rgba(245,241,232,0.5)]">
                {s.author}
              </div>
              <div className="mt-4 h-px w-full bg-[rgba(245,241,232,0.08)]" />
              <p className="mt-4 font-synonym text-[12.5px] leading-[1.7] text-[rgba(245,241,232,0.8)]">
                {s.finding}
              </p>
              <div className="mt-4 font-synonym text-[9px] tracking-[0.3em] uppercase text-[rgba(245,241,232,0.38)]">
                {s.publication}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="mt-24 flex items-center gap-6"
        >
          <div className="h-px w-16 bg-[rgba(184,147,103,0.5)]" />
          <div className="font-melodrama text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.55)]">
            Collected Evidence — Proceeding to Methodology
          </div>
        </motion.div>
      </div>
    </section>
  );
}
