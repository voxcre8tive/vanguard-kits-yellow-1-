/**
 * Thin transport layer.
 *
 * Today every service resolves against local mock data. When the Vanguard
 * Kits business management system is ready, set VITE_API_BASE_URL and the
 * services in this folder switch to `request()` without any UI changes.
 */

import type { ServiceError, ServiceResult } from "../types";

export const API_BASE_URL: string | undefined = import.meta.env["VITE_API_BASE_URL"] as
  | string
  | undefined;

export const isLiveBackendEnabled = Boolean(API_BASE_URL);

export async function request<T>(
  path: string,
  init?: RequestInit & { json?: unknown },
): Promise<ServiceResult<T>> {
  if (!API_BASE_URL) {
    return fail("network", "No backend is configured yet.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      body: init?.json !== undefined ? JSON.stringify(init.json) : (init?.body ?? null),
    });

    if (response.status === 404) return fail("not_found", "Not found.");
    if (!response.ok) return fail("unknown", `Request failed (${response.status}).`);

    return { ok: true, data: (await response.json()) as T };
  } catch {
    return fail("network", "We couldn't reach the server. Please try again.");
  }
}

export function ok<T>(data: T): ServiceResult<T> {
  return { ok: true, data };
}

export function fail<T = never>(
  code: ServiceError["code"],
  message: string,
): ServiceResult<T> {
  return { ok: false, error: { code, message } };
}

/** Simulates realistic latency so loading states are exercised in mock mode. */
export function delay(ms = 700): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
