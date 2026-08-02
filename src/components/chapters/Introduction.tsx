import {
  ChapterShell,
  ChapterLead,
  ChapterMarker,
  ChapterRule,
  ChapterAnnotation,
} from "./ChapterShell";
import { ReconstructingInterface } from "./ReconstructingInterface";
import { ArchiveTimeline } from "./ArchiveTimeline";

export function Introduction() {
  return (
    <ChapterShell
      id="introduction"
      number="01"
      label="Introduction"
      heading="Why This Research?"
      pageRef="§ 01 · Pages 012 – 019"
      wide={
        <>
          <ArchiveTimeline />
          <div className="mx-auto mt-24 max-w-[1180px]">
            <ChapterRule />
            <div className="max-w-[720px]">
              <ChapterAnnotation>
                Continues in Chapter 02 — Literature Review, where the historical and theoretical
                foundations of information density in East Asian typography are examined in detail.
              </ChapterAnnotation>
            </div>
          </div>
        </>
      }
    >
      <ChapterLead>
        Japanese websites are frequently described as visually dense and information-rich —
        characteristics that appear to differ from the minimalist visual language frequently
        associated with Japanese design in international discourse.
      </ChapterLead>

      <ChapterMarker label="Opening Note" />

      <ReconstructingInterface />

      <ChapterMarker label="Collected Documents · 01 – 04" />
    </ChapterShell>
  );
}