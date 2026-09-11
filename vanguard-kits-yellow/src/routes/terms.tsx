import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Vanguard Kits" },
      {
        name: "description",
        content:
          "Terms covering quotes, orders, design approvals and delivery of custom uniforms from Vanguard Kits.",
      },
      { property: "og:title", content: "Terms of Service | Vanguard Kits" },
      { property: "og:description", content: "Terms covering quotes, orders and delivery." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <Section>
        <Container>
          <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p className="border border-border bg-surface p-5 text-foreground/80">
              Placeholder terms. Replace this page with your reviewed terms of service before
              launch.
            </p>
            <p>
              Quotes are estimates until confirmed in writing. Custom orders enter production only
              after you approve a design proof.
            </p>
            <p>
              Because uniforms are produced to order, customized items cannot generally be
              returned except for production faults.
            </p>
            <p>Delivery timelines are agreed per order and confirmed before production begins.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
