import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SportEntry } from "@/lib/site-data";

export function SportCard({ sport, className }: { sport: SportEntry; className?: string }) {
  return (
    <Link
      to="/sports/$sport"
      params={{ sport: sport.slug }}
      className={cn(
        "group relative block overflow-hidden border border-border bg-surface transition-shadow duration-500 hover:shadow-[0_24px_55px_-28px_var(--primary)]",
        className,
      )}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={sport.image}
          alt={sport.alt}
          loading="lazy"
          width={900}
          height={1200}
          className="h-full w-full object-cover opacity-95 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="block h-0.5 w-10 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
        <h3 className="mt-3 text-2xl">{sport.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{sport.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          Explore
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ProductCard({
  name,
  blurb,
  index,
}: {
  name: string;
  blurb: string;
  index: number;
}) {
  return (
    <Link
      to="/quote"
      className="surface-lift group relative flex flex-col justify-between border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_45px_-25px_var(--primary)] sm:p-7"
    >
      <span className="font-display text-xs tracking-[0.3em] text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-10">
        <h3 className="text-2xl transition-colors duration-300 group-hover:text-primary">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      </div>
      <ArrowRight className="mt-6 h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function SolutionCard({
  id,
  name,
  copy,
  Icon,
}: {
  id: string;
  name: string;
  copy: string;
  Icon: LucideIcon;
}) {
  return (
    <article
      id={id}
      className="surface-lift group relative flex flex-col border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_45px_-25px_var(--primary)]"
    >
      <span className="grid h-12 w-12 place-items-center border border-border bg-surface-2 text-primary transition-colors duration-300 group-hover:border-primary/60">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-6 text-2xl">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
      <Link
        to="/quote"
        className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
      >
        Get a quote
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

export function ValueCard({
  title,
  copy,
  Icon,
}: {
  title: string;
  copy: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="surface-lift flex gap-4 border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_16px_36px_-24px_var(--primary)]">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{copy}</p>
      </div>
    </div>
  );
}
