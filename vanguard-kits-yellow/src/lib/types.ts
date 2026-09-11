/**
 * Shared domain types for the Vanguard Kits customer-facing site.
 *
 * These describe the CUSTOMER-facing contract only. Internal business
 * management data (leads, margins, production scheduling, payments) is
 * deliberately not modelled here so the public site can never leak it.
 */

export type SportSlug =
  | "football"
  | "basketball"
  | "baseball"
  | "soccer"
  | "volleyball"
  | "lacrosse"
  | "softball"
  | "other";

export interface Sport {
  slug: SportSlug;
  name: string;
  tagline: string;
  description: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  blurb: string;
}

export interface Testimonial {
  id: string;
  /** Placeholder content until real, approved testimonials exist. */
  quote: string;
  attribution: string;
  role: string;
  isPlaceholder: boolean;
}

/* ---------------------------------- Quotes --------------------------------- */

export type ContactRole =
  | "coach"
  | "athletic_director"
  | "team_manager"
  | "parent"
  | "organization"
  | "other"
  | "";

export interface QuoteContact {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  role: ContactRole;
}

export interface QuoteTeamDetails {
  sport: SportSlug | "";
  programType: "school" | "club" | "league" | "organization" | "";
  teamName: string;
  location: string;
  athleteCount: string;
  requiredBy: string;
}

export interface QuoteProductLine {
  category: string;
  quantity: string;
}

export interface QuoteCustomization {
  primaryColor: string;
  secondaryColor: string;
  needsNames: boolean;
  needsNumbers: boolean;
  needsLogo: boolean;
  designNotes: string;
}

export interface QuoteAttachment {
  name: string;
  size: number;
  type: string;
}

export interface QuoteRequest {
  contact: QuoteContact;
  team: QuoteTeamDetails;
  products: QuoteProductLine[];
  customization: QuoteCustomization;
  attachments: QuoteAttachment[];
}

export interface QuoteSubmissionResult {
  referenceNumber: string;
  submittedAt: string;
  estimatedResponse: string;
}

/* ---------------------------------- Orders --------------------------------- */

export type OrderStageKey =
  | "confirmed"
  | "design"
  | "approved"
  | "production"
  | "quality"
  | "shipped"
  | "delivered";

export interface OrderStage {
  key: OrderStageKey;
  label: string;
  description: string;
  completedAt: string | null;
}

export interface OrderSummary {
  orderNumber: string;
  teamName: string;
  sport: string;
  placedAt: string;
  itemCount: number;
  currentStage: OrderStageKey;
  stages: OrderStage[];
  carrier?: string;
  trackingNumber?: string;
}

/* --------------------------------- Account --------------------------------- */

export interface AccountProfile {
  name: string;
  email: string;
  organization: string;
}

export interface AccountQuote {
  reference: string;
  createdAt: string;
  sport: string;
  status: "received" | "in_review" | "quoted" | "accepted";
  itemCount: number;
}

export interface DesignProof {
  id: string;
  title: string;
  sport: string;
  status: "awaiting_approval" | "approved" | "revision_requested";
  updatedAt: string;
}

export interface TeamStoreSummary {
  id: string;
  name: string;
  status: "open" | "scheduled" | "closed";
  opensAt?: string;
  closesAt?: string;
  itemCount: number;
}

export interface AccountOverview {
  profile: AccountProfile;
  orders: OrderSummary[];
  quotes: AccountQuote[];
  designs: DesignProof[];
  teamStores: TeamStoreSummary[];
}

/* --------------------------------- Transport -------------------------------- */

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

export interface ServiceError {
  code: "not_found" | "validation" | "network" | "unknown";
  message: string;
}
