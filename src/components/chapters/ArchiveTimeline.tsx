import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface DocumentItem {
  ref: string;
  label: string;
  title: string;
  meta: string[];
  body: ReactNode;
}

const documents: DocumentItem[] = [
  {
    ref: "01",
    label: "Observation",
    title: "Opening Observation",
    meta: ["File 01", "Introduction", "Page 012"],
    body: (
      <>
        <p>
          This inquiry begins with an observation rather than a conclusion. Japanese websites are
          frequently described as visually dense and information-rich — characteristics that appear
          to differ from the minimalist visual language frequently associated with Japanese design
          in international discourse.
        </p>
        <p>
          Repeated encounters with news portals, university pages, government services and retail
          sites raised a question that observation alone could not settle: why these interfaces
          continue to serve very large audiences without apparent difficulty.
        </p>
      </>
    ),
  },
  {
    ref: "02",
    label: "Question",
    title: "Research Question",
    meta: ["File 02", "Research Note", "Page 014"],
    body: (
      <>
        <p className="font-boska text-[22px] leading-[1.5] text-[#F5F1E8] sm:text-[26px]">
          “Can visual density function as an organising system rather than the absence of
          hierarchy?”
        </p>
        <p>
          The question is deliberately open. It asks whether grouping devices — rules, borders,
          adjacency and repetition — perform structural work in place of generous whitespace, and
          under what conditions such pages remain navigable for the readers who use them daily.
        </p>
      </>
    ),
  },
  {
    ref: "03",
    label: "Scope",
    title: "Scope",
    meta: ["Field Note", "2018–2025", "Desktop + Mobile"],
    body: (
      <>
        <p>
          The study examines publicly accessible Japanese websites across four categories — news
          portals, universities, public-sector services and commercial retail — observed in both
          desktop and mobile presentations between 2018 and 2025.
        </p>
        <p>
          Indian websites of comparable category serve as the comparative set. No proprietary or
          login-restricted interfaces are included, and no claims are made about interfaces outside
          the observed sample.
        </p>
      </>
    ),
  },
  {
    ref: "04",
    label: "Purpose",
    title: "Purpose",
    meta: ["Archive", "Reference", "Page 018"],
    body: (
      <ol className="space-y-6">
        {[
          "To document the recurring structural features of visually dense Japanese interfaces without treating density as a deficiency.",
          "To compare those features against the corresponding Indian interfaces, noting where organising logic converges and where it diverges.",
          "To establish a descriptive vocabulary that later chapters can use when assessing legibility, hierarchy and navigability.",
        ].map((aim, i) => (
          <li key={aim} className="border-l border-[rgba(169,142,122,0.45)] pl-5">
            <div className="text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.55)]">
              Objective {String(i + 1).padStart(2, "0")}
            </div>
            <p className="mt-3">{aim}</p>
          </li>
        ))}
      </ol>
    ),
  },
];

function Folder({
  doc,
  open,
  onToggle,
}: {
  doc: DocumentItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className="group relative cursor-pointer select-none"
    >
      {/* folder tab */}
      <div
        className="h-6 w-40 border border-b-0 border-[rgba(245,241,232,0.08)] bg-[rgba(245,241,232,0.035)] px-3 pt-[5px] text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.55)] transition-colors duration-300 group-hover:border-[rgba(245,241,232,0.18)] group-hover:bg-[rgba(245,241,232,0.06)]"
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      >
        {doc.label}
      </div>

      <motion.div
        animate={{ y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="editorial-glass border px-7 py-7 transition-colors duration-300 group-hover:bg-[rgba(245,241,232,0.08)]"
      >
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          {doc.meta.map((m) => (
            <span
              key={m}
              className="text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.42)]"
            >
              {m}
            </span>
          ))}
        </div>

        <h4 className="mt-5 font-boska text-[28px] leading-[1.15] tracking-[-0.005em] text-[#F5F1E8] sm:text-[32px]">
          {doc.title}
        </h4>

        <div className="mt-6 h-px w-full bg-[rgba(245,241,232,0.08)]" />

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="paper"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                className="space-y-6 pt-7 font-synonym text-[16px] leading-[1.9] text-[rgba(245,241,232,0.82)] [&>p]:mt-0"
              >
                {doc.body}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-5 text-[9px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.35)]">
          {open ? "Document open" : "Status · Verified"}
        </div>
      </motion.div>
    </div>
  );
}

export function ArchiveTimeline() {
  const [openRef, setOpenRef] = useState<string | null>("01");

  return (
    <div className="relative mx-auto mt-24 max-w-[1180px]">
      {/* archival guide line */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-4 w-px bg-[rgba(245,241,232,0.08)] lg:left-1/2" />

      <div className="space-y-24">
        {documents.map((doc, i) => {
          const left = i % 2 === 0;
          return (
            <motion.div
              key={doc.ref}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative grid grid-cols-1 gap-x-20 pl-14 lg:grid-cols-2 lg:pl-0"
            >
              {/* reference number on the guide line */}
              <div className="absolute top-6 left-0 font-boska text-[13px] tracking-[0.2em] text-[rgba(245,241,232,0.55)] lg:left-1/2 lg:-translate-x-1/2 lg:bg-[#15171B] lg:px-3">
                {doc.ref}
              </div>

              <div className={left ? "lg:col-start-1 lg:pr-4" : "lg:col-start-2 lg:pl-4"}>
                <Folder
                  doc={doc}
                  open={openRef === doc.ref}
                  onToggle={() => setOpenRef(openRef === doc.ref ? null : doc.ref)}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}