import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { HowItWorks } from "@/components/site/Sections";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Custom Uniform Orders Work | Vanguard Kits" },
      {
        name: "description",
        content:
          "Five clear steps from team details to delivered custom uniforms: share your team info, get your design, approve your proof, we build it, and game day.",
      },
      { property: "og:title", content: "How Custom Uniform Orders Work | Vanguard Kits" },
      {
        property: "og:description",
        content: "The Vanguard Kits process from first conversation to game day.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/how-it-works" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From first call to game day"
        copy="A straightforward process with a real person attached to it at every step."
      />
      <HowItWorks />
      <CTASection />
    </>
  );
}
