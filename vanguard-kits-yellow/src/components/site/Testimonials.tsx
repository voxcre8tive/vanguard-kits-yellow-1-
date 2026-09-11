import { useQuery } from "@tanstack/react-query";
import { Quote } from "lucide-react";

import { getTestimonials } from "@/lib/api/content";
import { Container, Section, SectionHeading } from "./Section";
import { Skeleton } from "@/components/ui/skeleton";

export function Testimonials() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const result = await getTestimonials();
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="What programs say"
          title="Built on team relationships"
          copy="Testimonial content below is placeholder text. Approved customer feedback will replace it once available."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-border bg-surface p-7">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-6 h-20 w-full" />
                  <Skeleton className="mt-6 h-4 w-32" />
                </div>
              ))
            : null}

          {isError ? (
            <p className="text-sm text-muted-foreground md:col-span-3">
              Testimonials couldn't be loaded right now.
            </p>
          ) : null}

          {data?.length === 0 ? (
            <p className="text-sm text-muted-foreground md:col-span-3">
              No testimonials have been published yet.
            </p>
          ) : null}

          {data?.map((t) => (
            <figure key={t.id} className="surface-lift flex flex-col border border-border bg-surface p-7">
              <Quote className="h-6 w-6 text-primary" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-display text-lg uppercase tracking-wide">{t.attribution}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t.role}</p>
                {t.isPlaceholder ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-primary/80">
                    Editable placeholder
                  </p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
