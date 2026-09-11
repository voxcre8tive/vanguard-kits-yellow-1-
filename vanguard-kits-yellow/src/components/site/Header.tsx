import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";

import { Logo } from "./Logo";
import { VkButton } from "./Button";
import { Container } from "./Section";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type NavLink = { label: string; to: string; hash?: string };
type NavItem = { label: string; to: string; children?: NavLink[] };

const NAV: NavItem[] = [
  {
    label: "Uniforms",
    to: "/uniforms",
    children: [
      { label: "Custom Jerseys", to: "/uniforms", hash: "jerseys" },
      { label: "Full Uniforms", to: "/uniforms", hash: "full-uniforms" },
      { label: "Warm-Ups", to: "/uniforms", hash: "warm-ups" },
      { label: "Teamwear", to: "/uniforms", hash: "training-wear" },
      { label: "Fanwear", to: "/uniforms", hash: "fanwear" },
      { label: "Accessories", to: "/uniforms", hash: "accessories" },
    ],
  },
  { label: "Team Stores", to: "/team-stores" },
  {
    label: "Solutions",
    to: "/solutions",
    children: [
      { label: "Schools", to: "/solutions", hash: "schools" },
      { label: "Clubs & Travel Teams", to: "/solutions", hash: "clubs" },
      { label: "Leagues", to: "/solutions", hash: "leagues" },
      { label: "Organizations & Events", to: "/solutions", hash: "organizations" },
    ],
  },
  {
    label: "Sports",
    to: "/sports",
    children: [
      { label: "Football", to: "/sports/football" },
      { label: "Basketball", to: "/sports/basketball" },
      { label: "Baseball", to: "/sports/baseball" },
      { label: "Soccer", to: "/sports/soccer" },
      { label: "Volleyball", to: "/sports/volleyball" },
      { label: "Lacrosse", to: "/sports/lacrosse" },
      { label: "Softball", to: "/sports/softball" },
      { label: "Other Sports", to: "/sports" },
    ],
  },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Resources", to: "/resources" },
];

const SEARCH_LINKS: NavLink[] = [
  { label: "Get a quote", to: "/quote" },
  { label: "Track my order", to: "/track-order" },
  { label: "Custom uniforms", to: "/uniforms" },
  { label: "Team stores", to: "/team-stores" },
  { label: "Football uniforms", to: "/sports/football" },
  { label: "Basketball uniforms", to: "/sports/basketball" },
  { label: "Baseball uniforms", to: "/sports/baseball" },
  { label: "Soccer uniforms", to: "/sports/soccer" },
  { label: "Volleyball uniforms", to: "/sports/volleyball" },
  { label: "Lacrosse uniforms", to: "/sports/lacrosse" },
  { label: "Softball uniforms", to: "/sports/softball" },
  { label: "Schools & athletic departments", to: "/solutions" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Size guides & resources", to: "/resources" },
  { label: "My account", to: "/account" },
];

export function AnnouncementBar() {
  return (
    <div className="border-b border-border/60 bg-surface-2/60">
      <Container>
        <p className="py-2 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Free design consultation <span className="text-primary">•</span> Bulk team pricing{" "}
          <span className="text-primary">•</span> USA-wide delivery
        </p>
      </Container>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const results = SEARCH_LINKS.filter((l) =>
    l.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden sm:block">
        <AnnouncementBar />
      </div>
      <div
        className={cn(
          "border-b border-border/60 backdrop-blur transition-colors duration-300",
          scrolled ? "bg-background/95 shadow-[0_14px_40px_-30px_black]" : "bg-background/80",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
            <Logo />

            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => (
                <div key={item.label} className="group relative">
                  <Link
                    to={item.to}
                    className="flex items-center gap-1 px-3 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-foreground data-[status=active]:text-foreground"
                  >
                    {item.label}
                    {item.children ? (
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                    ) : null}
                  </Link>
                  <span className="pointer-events-none absolute inset-x-3 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  {item.children ? (
                    <div className="invisible absolute left-0 top-full w-64 translate-y-1 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="mt-2 border border-border bg-popover p-2 shadow-[0_24px_60px_-24px_black]">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to={child.to}
                              {...(child.hash ? { hash: child.hash } : {})}
                              className="block px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search the site"
                className="grid h-10 w-10 place-items-center text-foreground/75 transition-colors hover:text-primary"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
              <Link
                to="/account"
                aria-label="Your account"
                className="hidden h-10 w-10 place-items-center text-foreground/75 transition-colors hover:text-primary sm:grid"
              >
                <User className="h-[18px] w-[18px]" />
              </Link>
              <VkButton asChild size="sm" className="hidden sm:inline-flex">
                <Link to="/quote">Get a Quote</Link>
              </VkButton>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="grid h-10 w-10 place-items-center text-foreground lg:hidden"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "overflow-hidden border-b border-border bg-background transition-[max-height] duration-300 lg:hidden",
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0",
        )}
      >
        <Container>
          <nav aria-label="Mobile" className="flex flex-col py-4">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-border/50 py-1">
                <Link
                  to={item.to}
                  className="block py-2.5 font-display text-lg uppercase tracking-wide"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="grid grid-cols-2 gap-x-4 pb-3">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          to={child.to}
                          {...(child.hash ? { hash: child.hash } : {})}
                          className="block py-1.5 text-sm text-muted-foreground"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <div className="mt-5 flex flex-col gap-3">
              <VkButton asChild size="lg">
                <Link to="/quote">Get a Free Team Quote</Link>
              </VkButton>
              <VkButton asChild variant="outline" size="lg">
                <Link to="/account">Account</Link>
              </VkButton>
            </div>
          </nav>
        </Container>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-lg border-border bg-popover">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">Search</DialogTitle>
          </DialogHeader>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search uniforms, sports, resources…"
            className="h-12 w-full border border-input bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            aria-label="Search"
          />
          <ul className="max-h-72 overflow-y-auto">
            {results.length === 0 ? (
              <li className="px-1 py-6 text-center text-sm text-muted-foreground">
                No matches. Try “jerseys”, “soccer” or “tracking”.
              </li>
            ) : (
              results.map((r) => (
                <li key={r.label}>
                  <Link
                    to={r.to}
                    className="block px-1 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {r.label}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </header>
  );
}
