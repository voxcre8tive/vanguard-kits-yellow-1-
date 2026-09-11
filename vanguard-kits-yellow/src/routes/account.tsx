import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, PackageSearch } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Section";
import { VkButton } from "@/components/site/Button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAccountOverview } from "@/lib/api/account";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account | Vanguard Kits" },
      {
        name: "description",
        content:
          "View your custom uniform orders, quotes, design approvals, team stores and reorders in one place.",
      },
      { property: "og:title", content: "Your Account | Vanguard Kits" },
      { property: "og:description", content: "Orders, quotes, designs and team stores." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/account" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/account" }],
  }),
  component: AccountPage,
});

function statusLabel(value: string) {
  return value.replace(/_/g, " ");
}

function AccountPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["account-overview"],
    queryFn: async () => {
      const result = await getAccountOverview();
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Account"
        title={data ? `Welcome back, ${data.profile.name}` : "Your account"}
        copy="Orders, quotes, design approvals, team stores and reorders — everything for your program in one place."
      />

      <Section>
        <Container>
          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-36 w-full" />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-start gap-4 border border-border bg-surface p-8">
              <AlertCircle className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-2xl">We couldn't load your account</h2>
                <p className="mt-2 text-sm text-muted-foreground">{(error as Error).message}</p>
              </div>
              <VkButton variant="outline" onClick={() => void refetch()}>
                Try again
              </VkButton>
            </div>
          ) : data ? (
            <Tabs defaultValue="orders">
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                {["orders", "quotes", "designs", "stores"].map((value) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="border border-border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {value}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="orders" className="mt-8">
                {data.orders.length === 0 ? (
                  <EmptyState
                    title="No orders yet"
                    copy="Once your first order is confirmed it will appear here."
                  />
                ) : (
                  <ul className="grid gap-5 md:grid-cols-2">
                    {data.orders.map((order) => (
                      <li key={order.orderNumber} className="border border-border bg-surface p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="eyebrow">{order.orderNumber}</p>
                            <h3 className="mt-2 text-2xl">{order.teamName}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {order.sport} · {order.itemCount} items
                            </p>
                          </div>
                          <Badge>{statusLabel(order.currentStage)}</Badge>
                        </div>
                        <VkButton asChild variant="link" className="mt-5">
                          <Link to="/track-order">Track this order</Link>
                        </VkButton>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>

              <TabsContent value="quotes" className="mt-8">
                <ul className="divide-y divide-border border border-border bg-surface">
                  {data.quotes.map((q) => (
                    <li
                      key={q.reference}
                      className="flex flex-wrap items-center justify-between gap-3 px-6 py-5"
                    >
                      <div>
                        <p className="font-display text-xl uppercase leading-none">{q.reference}</p>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {q.sport} · {q.itemCount} items ·{" "}
                          {new Date(q.createdAt).toLocaleDateString("en-US")}
                        </p>
                      </div>
                      <Badge>{statusLabel(q.status)}</Badge>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="designs" className="mt-8">
                <ul className="grid gap-5 md:grid-cols-2">
                  {data.designs.map((d) => (
                    <li key={d.id} className="border border-border bg-surface p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl">{d.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {d.sport} · updated {new Date(d.updatedAt).toLocaleDateString("en-US")}
                          </p>
                        </div>
                        <Badge highlight={d.status === "awaiting_approval"}>
                          {statusLabel(d.status)}
                        </Badge>
                      </div>
                      {d.status === "awaiting_approval" ? (
                        <p className="mt-4 text-sm text-muted-foreground">
                          Design approvals will be actionable here once the design system is
                          connected.
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="stores" className="mt-8">
                <ul className="grid gap-5 md:grid-cols-2">
                  {data.teamStores.map((s) => (
                    <li key={s.id} className="border border-border bg-surface p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl">{s.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {s.itemCount} items
                            {s.closesAt
                              ? ` · closes ${new Date(s.closesAt).toLocaleDateString("en-US")}`
                              : s.opensAt
                                ? ` · opens ${new Date(s.opensAt).toLocaleDateString("en-US")}`
                                : ""}
                          </p>
                        </div>
                        <Badge highlight={s.status === "open"}>{s.status}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
                <VkButton asChild className="mt-8">
                  <Link to="/team-stores">Create a Team Store</Link>
                </VkButton>
              </TabsContent>
            </Tabs>
          ) : null}
        </Container>
      </Section>
    </>
  );
}

function Badge({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <span
      className={cn(
        "shrink-0 border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]",
        highlight ? "border-primary/60 text-primary" : "border-border text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="flex flex-col items-center border border-border bg-surface px-6 py-16 text-center">
      <PackageSearch className="h-9 w-9 text-muted-foreground" />
      <h3 className="mt-4 text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{copy}</p>
      <VkButton asChild className="mt-6">
        <Link to="/quote">Get a Quote</Link>
      </VkButton>
    </div>
  );
}
