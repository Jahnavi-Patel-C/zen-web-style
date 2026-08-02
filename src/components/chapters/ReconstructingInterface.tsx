import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-driven reconstruction of a simplified Japanese homepage wireframe.
 * Fade + translate only (max 20px). No scale, rotation, or bounce.
 */

const STEPS = [
  { at: 0.06, label: "Observation 01", text: "Navigation exposes many destinations simultaneously." },
  { at: 0.26, label: "Observation 02", text: "Multiple scales coexist without losing hierarchy." },
  { at: 0.46, label: "Observation 03", text: "Information accumulates instead of being hidden." },
  { at: 0.66, label: "Observation 04", text: "Hierarchy is created through grouping rather than empty space." },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function useStep(progress: MotionValue<number>, at: number, disabled: boolean) {
  const opacity = useTransform(progress, [at, at + 0.12], disabled ? [1, 1] : [0, 1]);
  const y = useTransform(progress, [at, at + 0.12], disabled ? [0, 0] : [14, 0]);
  return { opacity, y };
}

export function ReconstructingInterface() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const frame = useStep(scrollYProgress, 0.0, reduced);
  const nav = useStep(scrollYProgress, 0.08, reduced);
  const type = useStep(scrollYProgress, 0.28, reduced);
  const blocks = useStep(scrollYProgress, 0.48, reduced);
  const modules = useStep(scrollYProgress, 0.68, reduced);

  // Browser recedes once reconstruction completes.
  const browserOpacity = useTransform(scrollYProgress, [0.9, 1], reduced ? [1, 1] : [1, 0.35]);

  return (
    <div ref={ref} className="relative mt-16 h-[420vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <motion.div
          style={{ opacity: browserOpacity }}
          className="w-full lg:w-[min(1020px,68vw)]"
        >
          <div className="mb-6 text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.4)]">
            Reconstructing the Interface
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Wireframe */}
            <motion.div
              style={{ opacity: frame.opacity, y: frame.y }}
              className="col-span-12 lg:col-span-8"
            >
              <div className="border border-[rgba(245,241,232,0.14)]">
                {/* Chrome */}
                <div className="flex items-center gap-1.5 border-b border-[rgba(245,241,232,0.12)] px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full border border-[rgba(245,241,232,0.3)]" />
                  <span className="h-1.5 w-1.5 rounded-full border border-[rgba(245,241,232,0.3)]" />
                  <span className="h-1.5 w-1.5 rounded-full border border-[rgba(245,241,232,0.3)]" />
                  <div className="ml-3 h-2 flex-1 border border-[rgba(245,241,232,0.1)]" />
                </div>

                {/* Navigation */}
                <motion.div
                  style={{ opacity: nav.opacity, y: nav.y }}
                  className="border-b border-[rgba(245,241,232,0.12)] px-4 py-3"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <div className="h-2 w-14 bg-[rgba(245,241,232,0.28)]" />
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1.5 bg-[rgba(245,241,232,0.16)]"
                        style={{ width: 22 + ((i * 13) % 26) }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1 bg-[rgba(245,241,232,0.1)]"
                        style={{ width: 16 + ((i * 7) % 20) }}
                      />
                    ))}
                  </div>
                </motion.div>

                <div className="grid grid-cols-12">
                  <div className="col-span-12 border-r-0 p-4 md:col-span-8 md:border-r md:border-[rgba(245,241,232,0.1)]">
                    {/* Typography */}
                    <motion.div style={{ opacity: type.opacity, y: type.y }} className="space-y-2">
                      <div className="h-3.5 w-3/4 bg-[rgba(245,241,232,0.3)]" />
                      <div className="h-2.5 w-1/2 bg-[rgba(245,241,232,0.22)]" />
                      <div className="h-1.5 w-1/3 bg-[rgba(245,241,232,0.14)]" />
                    </motion.div>

                    {/* Content blocks */}
                    <motion.div
                      style={{ opacity: blocks.opacity, y: blocks.y }}
                      className="mt-4 space-y-4"
                    >
                      {Array.from({ length: 3 }).map((_, row) => (
                        <div key={row} className="space-y-1.5 border-t border-[rgba(245,241,232,0.08)] pt-3">
                          <div className="h-1.5 w-2/5 bg-[rgba(245,241,232,0.2)]" />
                          <div className="h-1 w-full bg-[rgba(245,241,232,0.1)]" />
                          <div className="h-1 w-11/12 bg-[rgba(245,241,232,0.1)]" />
                          <div className="h-1 w-10/12 bg-[rgba(245,241,232,0.1)]" />
                          <div className="grid grid-cols-4 gap-2 pt-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div key={i} className="h-8 border border-[rgba(245,241,232,0.1)]" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Side modules / notices */}
                  <motion.div
                    style={{ opacity: modules.opacity, y: modules.y }}
                    className="col-span-12 space-y-3 border-t border-[rgba(245,241,232,0.1)] p-4 md:col-span-4 md:border-t-0"
                  >
                    {["Notices", "Secondary", "Index"].map((_, m) => (
                      <div key={m} className="space-y-1.5 border border-[rgba(245,241,232,0.1)] p-2">
                        <div className="h-1.5 w-1/2 bg-[rgba(245,241,232,0.2)]" />
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-1 bg-[rgba(245,241,232,0.1)]"
                            style={{ width: `${95 - i * 9}%` }}
                          />
                        ))}
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-6 border border-[rgba(245,241,232,0.1)]" />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Annotation rail */}
            <div className="col-span-12 lg:col-span-4">
              <div className="space-y-8">
                {STEPS.map((s) => (
                  <Annotation
                    key={s.label}
                    progress={scrollYProgress}
                    at={s.at}
                    reduced={reduced}
                    label={s.label}
                  >
                    {s.text}
                  </Annotation>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Annotation({
  progress,
  at,
  reduced,
  label,
  children,
}: {
  progress: MotionValue<number>;
  at: number;
  reduced: boolean;
  label: string;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [at, at + 0.12], reduced ? [1, 1] : [0, 1]);
  const y = useTransform(progress, [at, at + 0.12], reduced ? [0, 0] : [12, 0]);
  const lineWidth = useTransform(progress, [at, at + 0.14], reduced ? ["48px", "48px"] : ["0px", "48px"]);

  return (
    <motion.div style={{ opacity, y }} transition={{ ease: EASE }} className="font-synonym">
      <motion.div style={{ width: lineWidth }} className="mb-3 h-px bg-[rgba(169,142,122,0.6)]" />
      <div className="text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.5)]">
        {label}
      </div>
      <p className="mt-2 max-w-[280px] text-[14px] leading-[1.7] text-[rgba(245,241,232,0.72)]">
        {children}
      </p>
    </motion.div>
  );
}
