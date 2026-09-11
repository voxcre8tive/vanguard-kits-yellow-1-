import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, PackageSearch } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Section";
import { VkButton } from "@/components/site/Button";
import { Field, TextInput } from "@/components/site/FormControls";
import { StatusTimeline } from "@/components/site/StatusTimeline";
import { getSampleOrderNumbers, trackOrder } from "@/lib/api/orders";
import type { OrderSummary } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track My Order | Vanguard Kits" },
      {
        name: "description",
        content:
          "Check the status of your custom uniform order — from design and approval through production, quality check, shipping and delivery.",
      },
      { property: "og:title", content: "Track My Order | Vanguard Kits" },
      { property: "og:description", content: "Follow your custom uniform order from design to delivery." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/track-order" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/track-order" }],
  }),
  component: TrackOrderPage,
});

function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation<OrderSummary, Error, { orderNumber: string; email: string }>({
    mutationFn: async ({ orderNumber: num, email: mail }) => {
      const result = await trackOrder(num, mail);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  const samples = getSampleOrderNumbers();

  return (
    <>
      <PageHero
        eyebrow="Order tracking"
        title="Track my order"
        copy="Enter your order number and the email on the order to see where things stand."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate({ orderNumber, email });
              }}
              className="h-fit border border-border bg-surface p-7"
            >
              <div className="space-y-5">
                <Field label="Order number" htmlFor="order-number" required>
                  <TextInput
                    id="order-number"
                    required
                    placeholder="VK-100482"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </Field>
                <Field label="Email on the order" htmlFor="order-email" required>
                  <TextInput
                    id="order-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <VkButton type="submit" size="lg" className="w-full" disabled={mutation.isPending}>
                  {mutation.isPending ? "Checking…" : "Track Order"}
                </VkButton>
              </div>
              <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                Demo data only until the order system is connected. Try{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setOrderNumber(samples[0] ?? "")}
                >
                  {samples[0]}
                </button>{" "}
                or{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setOrderNumber(samples[1] ?? "")}
                >
                  {samples[1]}
                </button>
                .
              </p>
            </form>

            <div className="border border-border bg-surface p-7 sm:p-9">
              {mutation.isPending ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : mutation.isError ? (
                <div className="flex items-start gap-3 text-sm">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-display text-xl uppercase">We couldn't find that order</p>
                    <p className="mt-2 text-muted-foreground">{mutation.error.message}</p>
                  </div>
                </div>
              ) : mutation.data ? (
                <OrderResult order={mutation.data} />
              ) : (
                <div className="flex flex-col items-center py-12 text-center">
                  <PackageSearch className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-4 font-display text-xl uppercase">No order loaded yet</p>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Enter your order number and email to see your production and delivery status.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function OrderResult({ order }: { order: OrderSummary }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="eyebrow">Order {order.orderNumber}</p>
          <h2 className="mt-2 text-3xl">{order.teamName}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {order.sport} · {order.itemCount} items · Placed{" "}
            {new Date(order.placedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        {order.trackingNumber ? (
          <div className="text-right text-xs text-muted-foreground">
            <p className="uppercase tracking-[0.18em]">{order.carrier}</p>
            <p className="mt-1 text-foreground/80">{order.trackingNumber}</p>
          </div>
        ) : null}
      </div>
      <div className="pt-8">
        <StatusTimeline order={order} />
      </div>
    </div>
  );
}
