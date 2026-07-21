import { motion } from "motion/react";

export function ScrollIndicator() {
  return (
    <div className="flex items-end gap-4">
      <div className="font-synonym">
        <div className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--hero-primary)]">
          Scroll to Begin
        </div>
        <div className="mt-1 text-xs italic text-[color:var(--hero-secondary)] font-melodrama">
          the investigation
        </div>
      </div>
      <motion.div
        aria-hidden
        initial={{ y: 0, opacity: 0.6 }}
        animate={{ y: [0, 4, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="text-[color:var(--hero-primary)] text-lg leading-none pb-0.5"
      >
        ↓
      </motion.div>
    </div>
  );
}