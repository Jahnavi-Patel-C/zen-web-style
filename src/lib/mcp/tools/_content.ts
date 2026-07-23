export interface Chapter {
  id: string;
  number: string;
  title: string;
  summary: string;
  body: string;
}

export const chapters: Chapter[] = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction — Why This Research?",
    summary:
      "Framing the paradox of Japanese web design and the motivation for a comparative study with Indian web design.",
    body: [
      "Japanese web design has long existed as a paradox — visually dense, information-heavy, and seemingly at odds with the minimal aesthetics the West often attributes to Japanese culture.",
      "This inquiry begins with a simple observation: the interfaces encountered daily by an Indian designer — restrained, spacious, quietly Western in their assumptions — bear almost no resemblance to the pages found on Japanese news portals, retail platforms, and civic websites. Those pages feel loud, packed, almost cartographic in their density. And yet they work.",
      "Density is not clutter. This is the central claim the research sets out to test. Where a Western reader may see visual chaos, a Japanese reader often reads a carefully ordered hierarchy shaped by kanji, kana, typographic scale, and centuries of newspaper and pamphlet convention.",
      "The study has three aims: document the recurring structural and typographic patterns of contemporary Japanese web design; place those findings against a parallel reading of Indian web design of the same period; and propose a small vocabulary for designers working in dense, multilingual contexts.",
    ].join("\n\n"),
  },
  {
    id: "literature-review",
    number: "02",
    title: "Literature Review",
    summary: "Historical and theoretical foundations of information density in East Asian typography.",
    body: "Placeholder — this chapter has not been written yet.",
  },
  {
    id: "methodology",
    number: "03",
    title: "Methodology",
    summary: "How the sample was chosen and how the close readings were conducted.",
    body: "Placeholder — this chapter has not been written yet.",
  },
  {
    id: "comparative-analysis",
    number: "04",
    title: "Comparative Analysis",
    summary: "Side-by-side reading of Japanese and Indian web design of the same period.",
    body: "Placeholder — this chapter has not been written yet.",
  },
  {
    id: "findings",
    number: "05",
    title: "Findings",
    summary: "Recurring structural and typographic patterns observed across the sample.",
    body: "Placeholder — this chapter has not been written yet.",
  },
  {
    id: "discussion",
    number: "06",
    title: "Discussion",
    summary: "What density affords, what it costs, and what Indian design can learn.",
    body: "Placeholder — this chapter has not been written yet.",
  },
  {
    id: "conclusion",
    number: "07",
    title: "Conclusion",
    summary: "Closing arguments and directions for further research.",
    body: "Placeholder — this chapter has not been written yet.",
  },
  {
    id: "references",
    number: "08",
    title: "References",
    summary: "Sources cited across the publication.",
    body: "Placeholder — this chapter has not been written yet.",
  },
];