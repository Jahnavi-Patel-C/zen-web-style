import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/Hero";
import { ChapterNav, chapters } from "@/components/ChapterNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Japanese Web Design — A Comparative Inquiry" },
      {
        name: "description",
        content:
          "An undergraduate research publication comparing Japanese and Indian web design through literature review, observation and analysis.",
      },
      { property: "og:title", content: "Japanese Web Design — A Comparative Inquiry" },
      {
        property: "og:description",
        content: "An undergraduate comparative study of Japanese and Indian web design.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-[#15171B] text-[#F5F1E8]">
      <ChapterNav />
      <Hero />
      {chapters.map((c) => (
        <section
          key={c.id}
          id={c.id}
          className="min-h-screen border-t border-[rgba(245,241,232,0.06)] px-6 py-24 sm:px-10 lg:px-16 lg:pr-[16rem]"
        >
          <div className="mx-auto max-w-[1600px] font-synonym">
            <div className="text-[10px] tracking-[0.35em] uppercase text-[rgba(245,241,232,0.5)]">
              § {c.number}
            </div>
            <h2 className="mt-4 font-boska text-4xl sm:text-6xl">{c.title}</h2>
          </div>
        </section>
      ))}
    </div>
  );
}
