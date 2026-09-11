import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageSquare, Phone } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Section";
import { VkButton } from "@/components/site/Button";
import { Field, TextArea, TextInput } from "@/components/site/FormControls";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact a Team Specialist | Vanguard Kits" },
      {
        name: "description",
        content:
          "Talk to a Vanguard Kits team specialist about custom uniforms, teamwear, team stores and bulk pricing for your program.",
      },
      { property: "og:title", content: "Contact a Team Specialist | Vanguard Kits" },
      {
        property: "og:description",
        content: "Questions about custom uniforms or team pricing? Send us the details.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a team specialist"
        copy="Tell us what your program needs and we'll come back with next steps."
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="rule-accent text-2xl">Ways to reach us</h2>
              <ul className="mt-6 space-y-5 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    Email
                    <br />
                    <span className="text-foreground/80">Add your business email address</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    Phone
                    <br />
                    <span className="text-foreground/80">Add your business phone number</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    Ready to price a full package?
                    <br />
                    <Link to="/quote" className="text-primary hover:underline">
                      Start a team quote
                    </Link>
                  </span>
                </li>
              </ul>
            </div>

            <div className="border border-border bg-surface p-7 sm:p-9">
              {sent ? (
                <div>
                  <h2 className="text-3xl">Message sent</h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Thanks — a team specialist will follow up with you.
                  </p>
                  <VkButton className="mt-6" variant="outline" onClick={() => setSent(false)}>
                    Send another
                  </VkButton>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-5"
                >
                  <Field label="Full name" htmlFor="c-name" required>
                    <TextInput
                      id="c-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
                  <Field label="Email" htmlFor="c-email" required>
                    <TextInput
                      id="c-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Field>
                  <Field label="How can we help?" htmlFor="c-message" required>
                    <TextArea
                      id="c-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Field>
                  <VkButton type="submit" size="lg" className="w-full">
                    Send Message
                  </VkButton>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
