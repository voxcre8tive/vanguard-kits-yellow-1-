import { delay, isLiveBackendEnabled, ok, request } from "./client";
import type { ServiceResult, Testimonial } from "../types";

/**
 * Testimonials are placeholders until real, approved customer feedback is
 * supplied through the business system. No names or schools are invented.
 */
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Placeholder testimonial — replace with an approved quote from a real program once available.",
    attribution: "Program Name Placeholder",
    role: "Head Coach — Placeholder",
    isPlaceholder: true,
  },
  {
    id: "t2",
    quote:
      "Placeholder testimonial — this card is wired to load from the business system when connected.",
    attribution: "Club Name Placeholder",
    role: "Club Director — Placeholder",
    isPlaceholder: true,
  },
  {
    id: "t3",
    quote:
      "Placeholder testimonial — editable content, no customer details are invented here.",
    attribution: "Athletic Department Placeholder",
    role: "Athletic Director — Placeholder",
    isPlaceholder: true,
  },
];

export async function getTestimonials(): Promise<ServiceResult<Testimonial[]>> {
  if (isLiveBackendEnabled) {
    return request<Testimonial[]>("/content/testimonials");
  }
  await delay(400);
  return ok(PLACEHOLDER_TESTIMONIALS);
}

export { PLACEHOLDER_TESTIMONIALS };
