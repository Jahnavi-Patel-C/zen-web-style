import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ChapterShellProps {
  id: string;
  number: string;
  label: string;
  heading: string;
  pageRef?: string;
  children: ReactNode;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function ChapterShell({ id, number, label, heading, pageRef, children }: ChapterShellProps) {
  return (
    <section
      id={id}
      className="relative border-t border-[rgba(245,241,232,0.08)] px-6 py-32 sm:px-10 lg:px-16 lg:pr-[16rem]"
    >
      <div className="mx-auto max-w-[1600px] font-synonym">
        {/* Top editorial masthead */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ staggerChildren: 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 gap-6"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-2"
          >
            <div className="font-boska text-6xl leading-none text-[#A98E7A] sm:text-7xl">
              {number}
            </div>
            <div className="mt-3 text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.5)]">
              Chapter
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-10"
          >
            <div className="text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.55)]">
              — {label}
            </div>
            <h2 className="mt-6 font-boska text-5xl leading-[1.02] tracking-[-0.01em] sm:text-6xl md:text-7xl">
              {heading}
            </h2>

            <div className="mt-10 flex items-center gap-6">
              <div className="h-px w-24 bg-[rgba(245,241,232,0.25)]" />
              <div className="text-[10px] tracking-[0.3em] uppercase text-[rgba(245,241,232,0.4)]">
                {pageRef ?? `§ ${number} · Page ${number}`}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-24 grid grid-cols-12 gap-6"
        >
          <div className="col-span-12 md:col-span-10 md:col-start-3 lg:col-span-8 lg:col-start-3">
            <div className="max-w-[720px]">{children}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ChapterParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 font-synonym text-[17px] leading-[1.9] text-[rgba(245,241,232,0.82)] first:mt-0">
      {children}
    </p>
  );
}

export function ChapterLead({ children }: { children: ReactNode }) {
  return (
    <p className="font-boska text-2xl leading-[1.55] tracking-[-0.005em] text-[#F5F1E8] sm:text-[26px]">
      {children}
    </p>
  );
}

export function ChapterSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-16 font-boska text-2xl tracking-[-0.005em] text-[#F5F1E8]">{children}</h3>
  );
}

export function ChapterMarker({ label }: { label: string }) {
  return (
    <div className="mt-16 flex items-center gap-4">
      <div className="h-px w-8 bg-[rgba(245,241,232,0.3)]" />
      <div className="text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.45)]">
        {label}
      </div>
    </div>
  );
}

export function ChapterRule() {
  return <div className="mt-16 h-px w-full bg-[rgba(245,241,232,0.08)]" />;
}

export function ChapterAnnotation({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-10 border-l border-[rgba(169,142,122,0.5)] pl-5 font-synonym text-[13px] leading-[1.7] tracking-[0.01em] text-[rgba(245,241,232,0.55)]">
      {children}
    </aside>
  );
}