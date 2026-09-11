import { delay, fail, isLiveBackendEnabled, ok, request } from "./client";
import type { OrderStage, OrderStageKey, OrderSummary, ServiceResult } from "../types";

export const ORDER_STAGE_SEQUENCE: { key: OrderStageKey; label: string; description: string }[] = [
  { key: "confirmed", label: "Order Confirmed", description: "We've received and confirmed your order details." },
  { key: "design", label: "Design", description: "Our design team is preparing your proof." },
  { key: "approved", label: "Approved", description: "Your design proof has been approved." },
  { key: "production", label: "Production", description: "Your uniforms are being produced." },
  { key: "quality", label: "Quality Check", description: "Every piece is inspected before packing." },
  { key: "shipped", label: "Shipped", description: "Your order is on the way to your team." },
  { key: "delivered", label: "Delivered", description: "Your order has been delivered." },
];

function buildStages(current: OrderStageKey, startISO: string): OrderStage[] {
  const currentIndex = ORDER_STAGE_SEQUENCE.findIndex((s) => s.key === current);
  const start = new Date(startISO).getTime();
  return ORDER_STAGE_SEQUENCE.map((stage, index) => ({
    ...stage,
    completedAt:
      index <= currentIndex
        ? new Date(start + index * 4 * 24 * 60 * 60 * 1000).toISOString()
        : null,
  }));
}

/** Mock records — replaced by the business system once the API is connected. */
const MOCK_ORDERS: OrderSummary[] = [
  {
    orderNumber: "VK-100482",
    teamName: "Placeholder Team Name",
    sport: "Basketball",
    placedAt: "2026-07-14T00:00:00.000Z",
    itemCount: 34,
    currentStage: "production",
    stages: buildStages("production", "2026-07-14T00:00:00.000Z"),
  },
  {
    orderNumber: "VK-100311",
    teamName: "Placeholder Program",
    sport: "Football",
    placedAt: "2026-05-02T00:00:00.000Z",
    itemCount: 62,
    currentStage: "delivered",
    stages: buildStages("delivered", "2026-05-02T00:00:00.000Z"),
    carrier: "Placeholder Carrier",
    trackingNumber: "0000 0000 0000",
  },
];

export async function trackOrder(
  orderNumber: string,
  email: string,
): Promise<ServiceResult<OrderSummary>> {
  if (isLiveBackendEnabled) {
    return request<OrderSummary>(
      `/orders/track?order=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`,
    );
  }

  await delay(900);
  const match = MOCK_ORDERS.find(
    (order) => order.orderNumber.toLowerCase() === orderNumber.trim().toLowerCase(),
  );
  if (!match) {
    return fail(
      "not_found",
      "We couldn't find an order with those details. Check the order number and email, then try again.",
    );
  }
  return ok(match);
}

export function getSampleOrderNumbers(): string[] {
  return MOCK_ORDERS.map((o) => o.orderNumber);
}

export { MOCK_ORDERS };
