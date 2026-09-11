import { delay, isLiveBackendEnabled, ok, request } from "./client";
import type { QuoteRequest, QuoteSubmissionResult, ServiceResult } from "../types";

function generateReference(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `VK-${year}-${random}`;
}

export async function submitQuoteRequest(
  payload: QuoteRequest,
): Promise<ServiceResult<QuoteSubmissionResult>> {
  if (isLiveBackendEnabled) {
    return request<QuoteSubmissionResult>("/quotes", { method: "POST", json: payload });
  }

  await delay(1200);
  return ok({
    referenceNumber: generateReference(),
    submittedAt: new Date().toISOString(),
    estimatedResponse: "1 business day",
  });
}
