import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Section";
import { SportsGrid } from "@/components/site/Sections";
import { CTASection } from "@/components/site/CTASection";
import { VkButton } from "@/components/site/Button";

export const Route = createFileRoute("/sports/")({
  head: () => ({
    meta: [
      { title: "Custom Uniforms by Sport | Vanguard Kits" },
      {
        name: "description",
        content:
          "Custom football, basketball, baseball, softball, soccer, volleyball and lacrosse uniforms built for teams, schools and clubs across the USA.",
      },
      { property: "og:title", content: "Custom Uniforms by Sport | Vanguard Kits" },
      {
        property: "og:description",
        content:
          "Sport-specific custom uniforms and teamwear for American athletic programs.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sports" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sports" }],
  }),
  component: SportsPage,
});

function SportsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sports"
        title="Custom uniforms by sport"
        copy="Construction, fit and fabric choices tuned to each sport — and a design team that knows the difference."
      />
      <Section>
        <Container>
          <SportsGrid />
          <div className="mt-10 border border-border bg-surface p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl">Other sports</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Wrestling, track and field, cheer, hockey, golf, swim and more — if your program
              needs it, tell us the sport and we'll scope a custom package for it.
            </p>
            <VkButton asChild className="mt-6">
              <Link to="/quote">Ask About Your Sport</Link>
            </VkButton>
          </div>
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
