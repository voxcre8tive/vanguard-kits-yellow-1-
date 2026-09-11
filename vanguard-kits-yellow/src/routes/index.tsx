import { createFileRoute, Link } from "@tanstack/react-router";

import heroImage from "@/assets/hero-athletes.jpg";
import ctaImage from "@/assets/cta-huddle.jpg";
import { Container } from "@/components/site/Section";
import { VkButton } from "@/components/site/Button";
import {
  DesignPathway,
  FeatureSplit,
  HowItWorks,
  ShopBySport,
  SolutionsGrid,
  StatsBar,
  UniformCategories,
} from "@/components/site/Sections";
import { TeamStoreSection } from "@/routes/team-stores";
import { Testimonials } from "@/components/site/Testimonials";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Custom Sports Uniforms & Teamwear USA | Vanguard Kits" },
      {
        name: "description",
        content:
          "Vanguard Kits builds custom sports uniforms, jerseys, warm-ups, teamwear and fanwear for teams, schools, clubs and leagues across the USA. Get a free team quote.",
      },
      { property: "og:title", content: "Custom Sports Uniforms & Teamwear | Vanguard Kits" },
      {
        property: "og:description",
        content:
          "Premium custom uniforms and teamwear designed for teams, schools, clubs, leagues and organizations across the USA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const HERO_POINTS = ["Custom Design Support", "Team Pricing", "Fast Turnaround", "USA-Wide Delivery"];

const WHY_BULLETS = [
  "Unlimited custom design revisions",
  "Premium fabrics & performance fit",
  "No minimums for team stores",
  "Trusted by schools, clubs & leagues",
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={heroImage}
          alt="Diverse group of athletes from multiple sports standing together in custom team apparel"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/72 to-background/15" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_100%,transparent_55%,oklch(0.14_0.006_90/75%))]" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-1.5 bg-primary"
        />
        <div
          aria-hidden
          className="absolute -right-16 top-0 -z-10 hidden h-[140%] w-[30%] skew-x-[-12deg] bg-primary/10 lg:block"
        />
        <Container>
          <div className="max-w-2xl py-24 sm:py-32 lg:py-40">
            <p className="eyebrow">Custom teamwear · USA</p>
            <h1 className="mt-5 text-5xl sm:text-7xl lg:text-[5.5rem]">
              Custom sports uniforms
              <span className="block text-primary">built for your team.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Premium custom uniforms and teamwear designed for teams, schools, clubs, leagues and
              organizations across the USA.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <VkButton asChild size="lg">
                <Link to="/quote">Get a Free Team Quote</Link>
              </VkButton>
              <VkButton asChild variant="outline" size="lg">
                <Link to="/uniforms">Explore Uniforms</Link>
              </VkButton>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {HERO_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <StatsBar />

      <ShopBySport />
      <UniformCategories />
      <DesignPathway />

      <FeatureSplit
        eyebrow="Why Vanguard Kits"
        title="A uniform partner, not a catalog"
        copy="What we focus on so your program spends less time managing kit and more time competing."
        bullets={WHY_BULLETS}
        image={ctaImage}
        alt="Team huddled together in custom uniforms before a game"
        reverse
      />

      <SolutionsGrid light />
      <TeamStoreSection />
      <HowItWorks light />
      <Testimonials />
      <CTASection />
    </>
  );
}
