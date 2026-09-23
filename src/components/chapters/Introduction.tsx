import {
  ChapterShell,
  ChapterLead,
  ChapterMarker,
  ChapterRule,
  ChapterAnnotation,
} from "./ChapterShell";
import { ReconstructingInterface } from "./ReconstructingInterface";
import { ArchiveTimeline } from "./ArchiveTimeline";
import sunsetRoomAsset from "@/assets/japanese-sunset-room.png.asset.json";

function IntroductionBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-top bg-repeat-y [animation:introduction-image-reveal_1.4s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
      style={{ backgroundImage: `url(${sunsetRoomAsset.url})`, backgroundSize: "100% auto" }}
    >
      <div className="absolute inset-0 bg-[rgba(18,20,23,0.18)]" />
    </div>
  );
}

export function Introduction() {
  return (
    <ChapterShell
      id="introduction"
      number="01"
      label="Introduction"
      heading="Why This Research?"
      pageRef="§ 01 · Pages 012 – 019"
      backdrop={<IntroductionBackdrop />}
      wide={
        <>
          <ReconstructingInterface />
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
    </ChapterShell>
  );
}