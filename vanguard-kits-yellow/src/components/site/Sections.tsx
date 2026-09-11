import { Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  Check,
  GraduationCap,
  Trophy,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "./Section";
import { VkButton } from "./Button";
import { ProductCard, SolutionCard, SportCard } from "./Cards";
import { processSteps, productCategories, solutions, sports, stats } from "@/lib/site-data";

export function StatsBar() {
  return (
    <div className="relative z-10 border-b border-border bg-surface/70 backdrop-blur">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-4 sm:gap-y-0 sm:py-10">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 sm:justify-center">
              <span className="hidden h-8 w-px bg-border first:hidden sm:block" />
              <div>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl leading-none text-primary sm:text-4xl">
                  {s.value}
                </dd>
                <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}

export function FeatureSplit({
  eyebrow,
  title,
  copy,
  bullets,
  image,
  alt,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  bullets: string[];
  image: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <Section id="why-us">
      <Container>
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden border border-border">
              <img
                src={image}
                alt={alt}
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
            <span
              aria-hidden
              className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full border border-primary/40 sm:block"
            />
          </div>
          <div>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="text-4xl sm:text-5xl">{title}</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy}
            </p>
            <ul className="mt-7 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm sm:text-base">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <VkButton asChild size="lg" className="mt-8">
              <Link to="/quote">Start Your Design</Link>
            </VkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function SportsGrid({ limit }: { limit?: number }) {
  const list = limit ? sports.slice(0, limit) : sports;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((sport) => (
        <SportCard key={sport.slug} sport={sport} />
      ))}
    </div>
  );
}

export function ShopBySport() {
  return (
    <Section id="sports">
      <Container>
        <SectionHeading
          eyebrow="Shop by sport"
          title="Uniforms for every program"
          copy="Sport-specific construction, fits and fabrics — designed around how your team actually plays."
          action={
            <VkButton asChild variant="outline">
              <Link to="/sports">View All Sports</Link>
            </VkButton>
          }
        />
        <div className="mt-12">
          <SportsGrid />
        </div>
      </Container>
    </Section>
  );
}

const DESIGN_PATHS = [
  { prompt: "Have a logo?", answer: "Send it." },
  { prompt: "Have an idea?", answer: "We'll build from it." },
  { prompt: "Have a reference?", answer: "Show us." },
  { prompt: "Need something original?", answer: "We've got you covered." },
];

export function DesignPathway() {
  return (
    <Section id="design">
      <Container>
        <SectionHeading
          eyebrow="Design your uniform"
          title={
            <>
              Your team.
              <span className="block text-primary">Your design.</span>
            </>
          }
          copy="However far along your design is, our team can take it from there — free of charge, before you commit to anything."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DESIGN_PATHS.map((p) => (
            <div
              key={p.prompt}
              className="surface-lift border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
            >
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {p.prompt}
              </p>
              <p className="mt-3 text-2xl">{p.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Every request starts with a free custom design proof — colors, logo placement and
            layout — before your order goes into production.
          </p>
          <VkButton asChild size="lg">
            <Link to="/quote">Start Your Design</Link>
          </VkButton>
        </div>
      </Container>
    </Section>
  );
}

export function UniformCategories() {
  return (
    <Section light id="uniforms">
      <Container>
        <SectionHeading
          eyebrow="Custom uniforms"
          title="Custom uniforms. Built your way."
          copy="Choose the pieces your program needs and we'll build a matched, season-ready package around them."
          action={
            <VkButton asChild variant="solid">
              <Link to="/uniforms">View All Uniforms</Link>
            </VkButton>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((cat, i) => (
            <div key={cat.slug} id={cat.slug} className="scroll-mt-32">
              <ProductCard name={cat.name} blurb={cat.blurb} index={i} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const SOLUTION_ICONS = [GraduationCap, Users, Trophy, CalendarDays, Building2];

export function SolutionsGrid({ light = false }: { light?: boolean }) {
  return (
    <Section light={light} id="solutions">
      <Container>
        <SectionHeading
          eyebrow="Who we serve"
          title="Built for real athletic programs"
          copy="From a single school team to a league-wide rollout, the process scales with your program."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <SolutionCard
              key={s.slug}
              id={s.slug}
              name={s.name}
              copy={s.copy}
              Icon={SOLUTION_ICONS[i] ?? Building2}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function HowItWorks({ light = false }: { light?: boolean }) {
  return (
    <Section light={light} id="how-it-works">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From first call to game day"
          align="center"
        />
        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          {processSteps.map((step) => (
            <li key={step.number} className="relative">
              <span className="relative z-10 grid h-12 w-12 place-items-center border border-primary/50 bg-background font-display text-lg text-primary">
                {step.number}
              </span>
              <h3 className="mt-5 text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center">
          <VkButton asChild size="lg">
            <Link to="/quote">Start Your Quote</Link>
          </VkButton>
        </div>
      </Container>
    </Section>
  );
}
