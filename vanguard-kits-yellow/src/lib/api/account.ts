import { delay, isLiveBackendEnabled, ok, request } from "./client";
import { MOCK_ORDERS } from "./orders";
import type { AccountOverview, ServiceResult } from "../types";

/**
 * Customer-facing account data only. Internal business records are never
 * exposed through this service.
 */
export async function getAccountOverview(): Promise<ServiceResult<AccountOverview>> {
  if (isLiveBackendEnabled) {
    return request<AccountOverview>("/account/overview");
  }

  await delay(800);
  return ok({
    profile: {
      name: "Placeholder Coach",
      email: "coach@example.com",
      organization: "Placeholder Athletic Program",
    },
    orders: MOCK_ORDERS,
    quotes: [
      {
        reference: "VK-2026-8H2KD",
        createdAt: "2026-08-21T00:00:00.000Z",
        sport: "Volleyball",
        status: "quoted",
        itemCount: 22,
      },
      {
        reference: "VK-2026-4QP1M",
        createdAt: "2026-09-01T00:00:00.000Z",
        sport: "Soccer",
        status: "in_review",
        itemCount: 40,
      },
    ],
    designs: [
      {
        id: "dp-1",
        title: "Home Set — Concept A",
        sport: "Volleyball",
        status: "awaiting_approval",
        updatedAt: "2026-09-04T00:00:00.000Z",
      },
      {
        id: "dp-2",
        title: "Away Set — Concept B",
        sport: "Soccer",
        status: "approved",
        updatedAt: "2026-08-28T00:00:00.000Z",
      },
    ],
    teamStores: [
      {
        id: "ts-1",
        name: "Placeholder Team Store",
        status: "open",
        closesAt: "2026-10-01T00:00:00.000Z",
        itemCount: 12,
      },
      {
        id: "ts-2",
        name: "Placeholder Spirit Store",
        status: "scheduled",
        opensAt: "2026-11-05T00:00:00.000Z",
        itemCount: 8,
      },
    ],
  });
}
