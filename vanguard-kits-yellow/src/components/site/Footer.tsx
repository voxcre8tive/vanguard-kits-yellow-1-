import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Music2 } from "lucide-react";

import { Container } from "./Section";
import { Logo } from "./Logo";

type FooterLink = { label: string; to: string; hash?: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Custom Uniforms", to: "/uniforms" },
      { label: "Jerseys", to: "/uniforms", hash: "jerseys" },
      { label: "Warm-Ups", to: "/uniforms", hash: "warm-ups" },
      { label: "Fanwear", to: "/uniforms", hash: "fanwear" },
      { label: "Accessories", to: "/uniforms", hash: "accessories" },
    ],
  },
  {
    title: "Sports",
    links: [
      { label: "Football", to: "/sports/football" },
      { label: "Basketball", to: "/sports/basketball" },
      { label: "Baseball", to: "/sports/baseball" },
      { label: "Soccer", to: "/sports/soccer" },
      { label: "Volleyball", to: "/sports/volleyball" },
      { label: "Lacrosse", to: "/sports/lacrosse" },
      { label: "Softball", to: "/sports/softball" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Schools", to: "/solutions", hash: "schools" },
      { label: "Clubs & Travel Teams", to: "/solutions", hash: "clubs" },
      { label: "Leagues", to: "/solutions", hash: "leagues" },
      { label: "Organizations & Events", to: "/solutions", hash: "organizations" },
      { label: "Team Stores", to: "/team-stores" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Size Guides", to: "/resources", hash: "size-guides" },
      { label: "Design Resources", to: "/resources", hash: "design-resources" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "FAQ", to: "/resources", hash: "faq" },
      { label: "Reorders", to: "/resources", hash: "reorders" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Get a Quote", to: "/quote" },
      { label: "Track Order", to: "/track-order" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "TikTok", href: "https://tiktok.com", Icon: Music2 },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Custom sports uniforms and teamwear for teams, schools, clubs, leagues and
              organizations across the USA.
            </p>
            <ul className="mt-6 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm tracking-[0.18em]">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      {...(link.hash ? { hash: link.hash } : {})}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vanguard Kits. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
