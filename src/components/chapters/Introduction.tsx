import {
  ChapterShell,
  ChapterLead,
  ChapterParagraph,
  ChapterSubheading,
  ChapterMarker,
  ChapterRule,
  ChapterAnnotation,
} from "./ChapterShell";

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

      <ChapterParagraph>
        This inquiry begins with an observation rather than a conclusion. The interfaces I encounter
        daily as an Indian design student are largely spacious and restrained, shaped by conventions
        that circulate widely in contemporary Western practice. Repeated visits to Japanese news
        sites, government portals, university pages, and commercial platforms suggested a different
        set of priorities: closely packed navigation, layered typographic scales, and a high volume
        of information presented at once.
      </ChapterParagraph>

      <ChapterParagraph>
        These pages continue to be used at scale, which raises questions rather than settles them.
        Why do such visually dense interfaces appear to remain workable for their audiences? Are the
        conventions that international design discourse treats as broadly applicable in fact shaped
        by particular scripts, reading habits, and publishing histories? This research takes those
        questions as its starting point.
      </ChapterParagraph>

      <ChapterAnnotation>
        A note on scope. This study concerns publicly accessible desktop and mobile web interfaces
        published between 2018 and 2025. It does not consider native applications, print, or
        broadcast media, though these clearly inform the same visual lineage.
      </ChapterAnnotation>

      <ChapterSubheading>A Question of Density</ChapterSubheading>

      <ChapterParagraph>
        The central question this study attempts to answer is whether visual density in Japanese web
        interfaces functions as an organising system rather than as an absence of hierarchy. Existing
        commentary often reads such pages as cluttered; other accounts suggest that kanji and kana,
        typographic scale, and long-standing newspaper and pamphlet conventions may contribute to
        structures that are legible to their intended readers. Which of these readings the evidence
        supports is examined in the chapters that follow.
      </ChapterParagraph>

      <ChapterParagraph>
        India offers a useful point of comparison. The Indian web is multilingual and largely
        mobile-first, and many of its readers move between several scripts. At the same time, much
        mainstream Indian digital design appears to adopt conventions common to global technology
        products. Whether a comparative reading of these two contexts is instructive — and in what
        respects — is treated here as an open question.
      </ChapterParagraph>

      <ChapterSubheading>Aims of the Study</ChapterSubheading>

      <ChapterParagraph>
        Three aims guide the work. First, to document recurring structural and typographic patterns
        in contemporary Japanese web design through close reading of a curated sample. Second, to set
        those observations alongside a parallel reading of Indian web design from the same period.
        Third, to consider what vocabulary — descriptive rather than prescriptive — might be useful
        for designers working in dense, multilingual contexts. The chapters that follow establish the
        existing literature, describe the method of selection and analysis, present the comparative
        readings, and only then discuss what may reasonably be inferred from them.
      </ChapterParagraph>

      <ChapterRule />

      <ChapterAnnotation>
        Continues in Chapter 02 — Literature Review, where the historical and theoretical
        foundations of information density in East Asian typography are examined in detail.
      </ChapterAnnotation>
    </ChapterShell>
  );
}