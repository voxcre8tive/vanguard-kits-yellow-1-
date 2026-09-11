import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Vanguard Kits" },
      {
        name: "description",
        content:
          "How Vanguard Kits collects, uses and protects information submitted through quote requests, orders and team stores.",
      },
      { property: "og:title", content: "Privacy Policy | Vanguard Kits" },
      { property: "og:description", content: "Our approach to customer information." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <Container>
          <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p className="border border-border bg-surface p-5 text-foreground/80">
              Placeholder policy text. Replace this page with your reviewed privacy policy before
              launch.
            </p>
            <p>
              We collect the information you provide in quote requests, orders and account
              details, and use it to prepare quotes, produce and deliver orders, and support your
              program.
            </p>
            <p>
              We do not sell customer information. Files you upload, such as team logos and
              artwork, are used only to prepare your designs.
            </p>
            <p>To request a copy or removal of your information, contact us.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
