import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { VkButton } from "@/components/site/Button";
import { CTASection } from "@/components/site/CTASection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Size Guides, Design Resources & FAQ | Vanguard Kits" },
      {
        name: "description",
        content:
          "Sizing guidance, artwork requirements, reorder help and answers to common questions about custom team uniforms and teamwear.",
      },
      { property: "og:title", content: "Resources & FAQ | Vanguard Kits" },
      {
        property: "og:description",
        content: "Size guides, design file requirements, reorders and frequently asked questions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/resources" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const FAQS = [
  {
    q: "How does custom uniform ordering work?",
    a: "Tell us about your team through a quote request, our design team builds a custom concept, you approve a proof, and your order moves into production once everything is confirmed.",
  },
  {
    q: "Do you provide custom design?",
    a: "Yes. Every order includes a custom design proof built around your colors, marks and program identity before anything goes into production.",
  },
  {
    q: "Can I use my existing logo?",
    a: "Yes. Send your existing logo and our design team will build your uniform concept around it. If it needs cleanup, we can help with that too.",
  },
  {
    q: "Can I add player names and numbers?",
    a: "Yes. Names and numbers can be added to jerseys, warm-ups and most apparel in your program's package.",
  },
  {
    q: "Do you offer youth sizes?",
    a: "Yes. Team orders regularly mix youth and adult size runs within the same design.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Minimums depend on the product and program type. Share your roster size in your quote request and we'll confirm what applies.",
  },
  {
    q: "How long does production take?",
    a: "Timelines vary by order size and product mix. Share your required-by date in your quote request and we'll confirm a realistic timeline for your program.",
  },
  {
    q: "Do you offer rush orders?",
    a: "Rush options may be available depending on the products and quantities involved. Let us know your deadline and we'll tell you what's possible.",
  },
  {
    q: "Can players order individually?",
    a: "Yes, through a team store. Players and parents can order their own sizes directly while the program keeps everything organized in one place.",
  },
  {
    q: "Do you offer team stores?",
    a: "Yes. A dedicated online store can be set up for your program so players, parents and fans can order team apparel individually.",
  },
  {
    q: "Can I reorder uniforms later?",
    a: "Yes. Approved designs are kept on file so replacements and next-season additions can be matched to your original order.",
  },
  {
    q: "Can I add a player to an existing order?",
    a: "Yes. Reach out with your order number and we'll help get an additional player added to the same design and colorway.",
  },
  {
    q: "Do you ship across the USA?",
    a: "Yes. We deliver to teams, schools, clubs and organizations nationwide.",
  },
  {
    q: "What file types can I upload?",
    a: "Vector files (AI, EPS, SVG or PDF) work best. High-resolution PNG or JPG files can also be used, and our design team can help clean up older marks.",
  },
];

function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Everything you need before you order"
        copy="Sizing, artwork, reorders and the questions programs ask us most."
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <article id="size-guides" className="scroll-mt-32 border border-border bg-surface p-7">
              <h2 className="text-2xl">Size Guides</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Youth through adult size runs for jerseys, shorts, warm-ups and fanwear. Sizing
                samples can be arranged for larger programs before the roster is locked in.
              </p>
            </article>
            <article
              id="design-resources"
              className="scroll-mt-32 border border-border bg-surface p-7"
            >
              <h2 className="text-2xl">Design Resources</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Artwork requirements, color matching guidance and what to send us if your team's
                logo only exists as an old image file.
              </p>
            </article>
            <article id="reorders" className="scroll-mt-32 border border-border bg-surface p-7">
              <h2 className="text-2xl">Reorders</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Approved designs stay on file so mid-season replacements and next-season additions
                match what your team already wears.
              </p>
              <VkButton asChild variant="link" className="mt-4">
                <Link to="/quote">Request a reorder</Link>
              </VkButton>
            </article>
          </div>
        </Container>
      </Section>

      <Section light id="faq" className="scroll-mt-32">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <Accordion type="single" collapsible className="mt-10 max-w-3xl">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left font-display text-lg uppercase tracking-wide">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
