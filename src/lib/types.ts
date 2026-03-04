export type UserRole = "buyer" | "seller" | "both";
export type ListingStatus = "draft" | "pending_review" | "active" | "under_offer" | "sold" | "rejected" | "archived";
export type RevenueModel = "saas" | "marketplace" | "freemium" | "api" | "one_time" | "ads" | "membership" | "lead_gen";
export type TransactionStatus = "offer_sent" | "offer_accepted" | "deposit_paid" | "verification_in_progress" | "verification_passed" | "verification_failed" | "full_payment" | "transfer_in_progress" | "completed" | "cancelled" | "refunded" | "disputed";
export type MessageType = "text" | "offer" | "counter_offer" | "system";

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
  website: string | null;
  github_username: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: string;
  seller_id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  revenue_model_type: RevenueModel | null;
  tech_stack: string[];
  monthly_revenue: number;
  monthly_users: number;
  asking_price: number;
  currency: string;
  demo_url: string | null;
  screenshots: string[];
  status: ListingStatus;
  verification_badge: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  // Joined
  profiles?: Profile;
}

export interface Conversation {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  last_message_at: string;
  created_at: string;
  listings?: Listing;
  buyer?: Profile;
  seller?: Profile;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: MessageType;
  offer_amount: number | null;
  is_read: boolean;
  created_at: string;
}

export const REVENUE_MODEL_LABELS: Record<RevenueModel, string> = {
  saas: "SaaS",
  marketplace: "Marketplace",
  freemium: "Freemium",
  api: "API / Usage",
  one_time: "One-time",
  ads: "Ad-based",
  membership: "Membership",
  lead_gen: "Lead Gen",
};

export const LISTING_STATUS_LABELS: Record<ListingStatus, string> = {
  draft: "Draft",
  pending_review: "Pending Review",
  active: "Active",
  under_offer: "Under Offer",
  sold: "Sold",
  rejected: "Rejected",
  archived: "Archived",
};
