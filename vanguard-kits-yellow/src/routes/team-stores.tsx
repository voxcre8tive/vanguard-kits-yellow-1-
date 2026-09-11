import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { TeamStoreMockup } from "@/components/site/TeamStoreShowcase";
import { VkButton } from "@/components/site/Button";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/team-stores")({
  head: () => ({
    meta: [
      { title: "Online Team Stores for Uniform Orders | Vanguard Kits" },
      {
        name: "description",
        content:
          "Give your program a dedicated online team store so players and parents can order team apparel individually while orders stay organized.",
      },
      { property: "og:title", content: "Online Team Stores | Vanguard Kits" },
      {
        property: "og:description",
        content:
          "A dedicated storefront for your team apparel — individual ordering, organized fulfillment, less admin work.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/team-stores" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/team-stores" }],
  }),
  component: TeamStoresPage,
});

const BENEFITS = [
  "Players can order individually, in their own size",
  "Parents and supporters can purchase directly",
  "Team apparel stays available through the season",
  "Orders are organized and grouped for your program",
  "Less collecting of sizes, forms and payments by hand",
];

export function TeamStoreSection() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Team stores</p>
            <h2 className="text-4xl sm:text-5xl">
              Your team.
              <span className="block text-primary">Your store.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Your program gets its own online store stocked with approved team apparel. Everyone
              orders from one place, and you stop chasing spreadsheets.
            </p>
            <ul className="mt-8 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <VkButton asChild size="lg" className="mt-9">
              <Link to="/quote">Create a Team Store</Link>
            </VkButton>
          </div>
          <TeamStoreMockup />
        </div>
      </Container>
    </Section>
  );
}

function TeamStoresPage() {
  return (
    <>
      <PageHero
        eyebrow="Team stores"
        title="Team stores. Make team orders simple."
        copy="One storefront for your roster, your families and your supporters — open when you need it, closed when you don't."
      />
      <TeamStoreSection />
      <Section light>
        <Container>
          <SectionHeading
            eyebrow="Set up"
            title="What we need to open your store"
            copy="Your team name and marks, the apparel you want offered, sizing preferences, and the dates the store should be open."
          />
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
