import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  light = false,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-24", light ? "band-light" : "glow-accent", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
        {copy ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{copy}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
