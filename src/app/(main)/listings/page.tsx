import { createClient } from "@/lib/supabase/server";
import { REVENUE_MODEL_LABELS } from "@/lib/types";
import type { Listing, RevenueModel } from "@/lib/types";
import ListingsPageClient from "./page-client";

type SortOption = "newest" | "price_asc" | "price_desc";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    model?: RevenueModel;
    sort?: SortOption;
  }>;
}) {
  const params = await searchParams;
  const q = params.q ?? "";
  const model = params.model ?? "";
  const sort = params.sort ?? "newest";

  const supabase = await createClient();

  let query = supabase
    .from("listings")
    .select("*, profiles(display_name, avatar_url)")
    .eq("status", "active");

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,short_description.ilike.%${q}%,description.ilike.%${q}%`
    );
  }

  if (model && model in REVENUE_MODEL_LABELS) {
    query = query.eq("revenue_model_type", model);
  }

  switch (sort) {
    case "price_asc":
      query = query.order("asking_price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("asking_price", { ascending: false });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data: listings } = await query;
  const displayListings: Listing[] = listings ?? [];

  return (
    <ListingsPageClient
      listings={displayListings}
      q={q}
      model={model}
      sort={sort}
    />
  );
}
