import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { SolutionsGrid } from "@/components/site/Sections";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Teamwear Solutions for Schools, Clubs & Leagues | Vanguard Kits" },
      {
        name: "description",
        content:
          "Custom team uniforms and apparel programs for schools, clubs and travel teams, leagues, organizations and events across the USA.",
      },
      {
        property: "og:title",
        content: "Teamwear Solutions for Schools, Clubs & Leagues | Vanguard Kits",
      },
      {
        property: "og:description",
        content:
          "Uniform programs built for athletic departments, competitive clubs, leagues and event organizers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/solutions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Who we serve"
        copy="Uniform programs shaped around how your organization actually operates — budgets, seasons, rosters and reorders."
      />
      <SolutionsGrid />
      <CTASection />
    </>
  );
}
