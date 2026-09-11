import { Link } from "@tanstack/react-router";

import ctaImage from "@/assets/cta-huddle.jpg";
import { Container } from "./Section";
import { VkButton } from "./Button";

export function CTASection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border">
      <img
        src={ctaImage}
        alt="Team huddled together on a floodlit field at night"
        loading="lazy"
        width={1920}
        height={900}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/70 to-background/25" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_0%_100%,transparent_50%,oklch(0.14_0.006_90/65%))]" />
      <Container>
        <div className="max-w-2xl py-24 sm:py-32">
          <span className="block h-1 w-14 bg-primary" />
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Ready to build your team's next kit?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Tell us what your team needs and we'll help you take it from idea to game day.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <VkButton asChild size="lg">
              <Link to="/quote">Get a Free Team Quote</Link>
            </VkButton>
            <VkButton asChild variant="outline" size="lg">
              <Link to="/contact">Talk to a Team Specialist</Link>
            </VkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
