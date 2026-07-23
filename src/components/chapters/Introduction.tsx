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
        Japanese web design has long existed as a paradox — visually dense, information-heavy, and
        seemingly at odds with the minimal aesthetics the West often attributes to Japanese culture.
      </ChapterLead>

      <ChapterMarker label="Opening Note" />

      <ChapterParagraph>
        This inquiry begins with a simple observation. The interfaces I encountered daily as an
        Indian designer — restrained, spacious, quietly Western in their assumptions — bore almost
        no resemblance to the pages I found on Japanese news portals, retail platforms, and civic
        websites. Those pages felt loud, packed, almost cartographic in their density. And yet they
        worked. Millions of readers navigated them with ease.
      </ChapterParagraph>

      <ChapterParagraph>
        The dissonance between what the design world praises as "good" and what a large,
        technologically advanced country actually uses became the seed of this research. If usability
        is universal, why do two literate, dense cultures arrive at such different visual languages?
        And what might Indian designers — working in an equally multilingual, high-information
        context — learn from a system that refuses the quiet page?
      </ChapterParagraph>

      <ChapterAnnotation>
        A note on scope. This study concerns publicly accessible desktop and mobile web interfaces
        published between 2018 and 2025. It does not consider native applications, print, or
        broadcast media, though these clearly inform the same visual lineage.
      </ChapterAnnotation>

      <ChapterSubheading>A Question of Density</ChapterSubheading>

      <ChapterParagraph>
        Density is not clutter. This is the central claim the research sets out to test. Where a
        Western reader may see visual chaos, a Japanese reader often reads a carefully ordered
        hierarchy — one shaped by kanji, kana, typographic scale, and centuries of newspaper and
        pamphlet convention. The research asks whether density, when handled through the right
        typographic and structural tools, can be a form of respect for the reader's time.
      </ChapterParagraph>

      <ChapterParagraph>
        India presents a useful counterpoint. Our internet is multilingual, mobile-first, and often
        built for readers who move between three scripts within a single sentence. Yet mainstream
        Indian digital design largely inherits Silicon Valley's grammar — generous whitespace, single
        columns, hero images. This research does not argue that Japanese conventions should replace
        those norms. It asks what might be recovered if we treated the page, once again, as a
        publication.
      </ChapterParagraph>

      <ChapterSubheading>Aims of the Study</ChapterSubheading>

      <ChapterParagraph>
        Three aims guide the work. First, to document the recurring structural and typographic
        patterns of contemporary Japanese web design through close reading of a curated sample.
        Second, to place those findings against a parallel reading of Indian web design of the same
        period. Third, to propose a small vocabulary — not a style guide — for designers working in
        dense, multilingual contexts who feel underserved by the templates the industry offers them.
      </ChapterParagraph>

      <ChapterRule />

      <ChapterAnnotation>
        Continues in Chapter 02 — Literature Review, where the historical and theoretical
        foundations of information density in East Asian typography are examined in detail.
      </ChapterAnnotation>
    </ChapterShell>
  );
}