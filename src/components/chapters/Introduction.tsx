import {
  ChapterShell,
  ChapterLead,
  ChapterMarker,
  ChapterRule,
  ChapterAnnotation,
} from "./ChapterShell";
import { ResearchFolder } from "./ResearchFolder";

export function Introduction() {
  return (
    <ChapterShell
      id="introduction"
      number="01"
      label="Introduction"
      heading="Why This Research?"
      pageRef="§ 01 · Pages 012 – 019"
    >
      <ChapterLead>
        Japanese websites are frequently described as visually dense and information-rich —
        characteristics that appear to differ from the minimalist visual language frequently
        associated with Japanese design in international discourse.
      </ChapterLead>

      <ChapterMarker label="Opening Note" />

      <ResearchFolder />

      <ChapterRule />

      <ChapterAnnotation>
        Continues in Chapter 02 — Literature Review, where the historical and theoretical
        foundations of information density in East Asian typography are examined in detail.
      </ChapterAnnotation>
    </ChapterShell>
  );
}