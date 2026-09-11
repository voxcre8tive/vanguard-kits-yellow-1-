import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/site/Section";
import { VkButton } from "@/components/site/Button";
import { CTASection } from "@/components/site/CTASection";
import { ProductCard } from "@/components/site/Cards";
import { productCategories, sports } from "@/lib/site-data";

export const Route = createFileRoute("/sports/$sport")({
  loader: ({ params }) => {
    const sport = sports.find((s) => s.slug === params.sport);
    if (!sport) throw notFound();
    return { sport };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Sport not found | Vanguard Kits" }, { name: "robots", content: "noindex" }],
      };
    }
    const { sport } = loaderData;
    const title = `Custom ${sport.name} Uniforms | Vanguard Kits`;
    return {
      meta: [
        { title },
        { name: "description", content: sport.description },
        { property: "og:title", content: title },
        { property: "og:description", content: sport.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/sports/${sport.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/sports/${sport.slug}` }],
    };
  },
  notFoundComponent: SportNotFound,
  component: SportPage,
});

function SportNotFound() {
  return (
    <Section>
      <Container>
        <h1 className="text-4xl">Sport not found</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find that sport. Browse everything we build for instead.
        </p>
        <VkButton asChild className="mt-6">
          <Link to="/sports">View All Sports</Link>
        </VkButton>
      </Container>
    </Section>
  );
}

const INCLUDES = [
  "Team-matched colors and marks",
  "Player names and numbers",
  "Full size runs from youth to adult",
  "Matching warm-ups and fanwear",
];

function SportPage() {
  const { sport } = Route.useLoaderData();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={sport.image}
          alt={sport.alt}
          width={900}
          height={1200}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top opacity-90"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/78 to-background/30" />
        <Container>
          <div className="max-w-2xl py-20 sm:py-28">
            <p className="eyebrow mb-4">Sports / {sport.name}</p>
            <span className="mb-6 block h-1 w-14 bg-primary" />
            <h1 className="text-5xl sm:text-6xl">Custom {sport.name} Uniforms</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {sport.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <VkButton asChild size="lg">
                <Link to="/quote">Get a Free Team Quote</Link>
              </VkButton>
              <VkButton asChild variant="outline" size="lg">
                <Link to="/uniforms">Explore Uniforms</Link>
              </VkButton>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="rule-accent text-3xl sm:text-4xl">What's included</h2>
              <ul className="mt-6 space-y-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Build your package" title="Pieces for this program" />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {productCategories.slice(0, 4).map((cat, i) => (
                  <ProductCard key={cat.slug} name={cat.name} blurb={cat.blurb} index={i} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
