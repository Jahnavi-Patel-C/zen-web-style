import { useEffect, useState } from "react";
import { motion } from "motion/react";

export interface Chapter {
  id: string;
  number: string;
  title: string;
}

export const chapters: Chapter[] = [
  { id: "introduction", number: "01", title: "Introduction" },
  { id: "literature-review", number: "02", title: "Literature Review" },
  { id: "methodology", number: "03", title: "Methodology" },
  { id: "comparative-analysis", number: "04", title: "Comparative Analysis" },
  { id: "findings", number: "05", title: "Findings" },
  { id: "discussion", number: "06", title: "Discussion" },
  { id: "conclusion", number: "07", title: "Conclusion" },
  { id: "references", number: "08", title: "References" },
];

export function ChapterNav() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const ids = ["hero", ...chapters.map((c) => c.id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      aria-label="Chapters"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 font-synonym lg:block"
    >
      <ol className="space-y-3">
        {chapters.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={(e) => handleClick(e, c.id)}
                className="group flex items-center justify-end gap-3 text-right"
              >
                <span
                  className={
                    "text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 " +
                    (isActive
                      ? "text-[#F5F1E8]"
                      : "text-[rgba(245,241,232,0.35)] group-hover:text-[rgba(245,241,232,0.7)]")
                  }
                >
                  {c.number}
                </span>
                <span
                  aria-hidden
                  className={
                    "block h-px transition-all duration-500 " +
                    (isActive
                      ? "w-8 bg-[#A98E7A]"
                      : "w-4 bg-[rgba(245,241,232,0.25)] group-hover:w-6 group-hover:bg-[rgba(245,241,232,0.5)]")
                  }
                />
              </a>
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}