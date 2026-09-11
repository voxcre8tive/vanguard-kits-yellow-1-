import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { UniformCategories } from "@/components/site/Sections";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/uniforms")({
  head: () => ({
    meta: [
      { title: "Custom Uniforms & Teamwear | Vanguard Kits" },
      {
        name: "description",
        content:
          "Custom sports uniforms, jerseys, warm-ups, training wear, fanwear and accessories built for teams, schools and clubs across the USA.",
      },
      { property: "og:title", content: "Custom Uniforms & Teamwear | Vanguard Kits" },
      {
        property: "og:description",
        content:
          "Custom jerseys, full uniforms, warm-ups, training wear and fanwear for American athletic programs.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/uniforms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/uniforms" }],
  }),
  component: UniformsPage,
});

function UniformsPage() {
  return (
    <>
      <PageHero
        eyebrow="Uniforms"
        title="Custom uniforms. Built your way."
        copy="Every piece is made to your team's colors, marks and roster — from game jerseys to the fanwear in the stands."
      />
      <UniformCategories />
      <CTASection />
    </>
  );
}
