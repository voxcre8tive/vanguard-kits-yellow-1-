import type { ReactNode } from "react";

import { Container } from "./Section";

export function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-full w-[45%] skew-x-[-14deg] bg-primary/8"
      />
      <Container>
        <div className="relative max-w-3xl py-16 sm:py-24">
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          <span className="mb-6 block h-1 w-14 bg-primary" />
          <h1 className="text-4xl sm:text-6xl">{title}</h1>
          {copy ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
