import {
  ChapterShell,
  ChapterLead,
  ChapterMarker,
  ChapterRule,
  ChapterAnnotation,
  ChapterSubheading,
  ChapterParagraph,
} from "./ChapterShell";
import { ReconstructingInterface } from "./ReconstructingInterface";

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

      <ReconstructingInterface />

      <ChapterSubheading>A Question of Density</ChapterSubheading>

      <ChapterParagraph>
        The interface reconstructed above is not a copy of any single website; it is an assembly of
        the features that recurred most often across the Japanese news portals, university sites and
        public-sector pages examined during early observation. Read in sequence, its layers describe
        a particular set of priorities: navigation that declares the full extent of a site at once,
        headings that shift scale rather than disappear, and secondary modules that sit alongside the
        main column instead of behind a menu.
      </ChapterParagraph>

      <ChapterParagraph>
        What appears, once the reconstruction settles, is an interface in which information
        accumulates. Grouping — rules, borders, adjacency and repetition — carries much of the
        structural work that generous whitespace performs in many contemporary Western layouts. This
        raises the question the study takes up: whether visual density in these interfaces reflects a
        different organising logic rather than an absence of design restraint, and what conditions
        allow such pages to remain navigable for the audiences that use them daily.
      </ChapterParagraph>

      <ChapterRule />

      <ChapterAnnotation>
        Continues in Chapter 02 — Literature Review, where the historical and theoretical
        foundations of information density in East Asian typography are examined in detail.
      </ChapterAnnotation>
    </ChapterShell>
  );
}