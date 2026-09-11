import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vanguard Kits | Custom Teamwear" },
      {
        name: "description",
        content:
          "Vanguard Kits builds custom sports uniforms and teamwear for teams, schools, clubs, leagues and organizations across the USA.",
      },
      { property: "og:title", content: "About Vanguard Kits" },
      {
        property: "og:description",
        content: "A team-first approach to custom uniforms and teamwear.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built around the programs we outfit"
        copy="Vanguard Kits provides custom sports uniforms, teamwear, jerseys, warm-ups, fanwear and apparel for athletic programs across the USA."
      />
      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="rule-accent text-3xl">What we do</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We design and produce complete uniform packages — game kits, warm-ups, training
                wear, fanwear and accessories — for teams, schools, clubs, leagues and
                organizations. Every order runs through a design proof so what arrives is what
                your program approved.
              </p>
            </div>
            <div>
              <h2 className="rule-accent text-3xl">How we work</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                One point of contact, clear pricing for team quantities, and design files kept on
                record so reorders and replacements stay consistent season after season.
              </p>
            </div>
          </div>
          <p className="mt-10 border border-border bg-surface p-6 text-sm text-muted-foreground">
            Company background, locations and production details are placeholder-free by design —
            share your confirmed business details and we'll add them here.
          </p>
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
