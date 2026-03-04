import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/lib/types";
import WishlistClient from "./page-client";

interface WishlistItem {
  id: string;
  listing_id: string;
  user_id: string;
  created_at: string;
  listings: Listing;
}

export default async function WishlistPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: wishlists } = await supabase
    .from("wishlists")
    .select("*, listings(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<WishlistItem[]>();

  return <WishlistClient wishlists={wishlists} />;
}
