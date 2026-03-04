import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import DashboardClient from "./page-client";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  const [listingsRes, offersRes, messagesRes, wishlistRes] = await Promise.all([
    supabase
      .from("listings")
      .select("id", { count: "exact", head: true })
      .eq("seller_id", user.id),
    supabase
      .from("transactions")
      .select("id", { count: "exact", head: true })
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .in("status", ["offer_sent", "offer_accepted"]),
    supabase
      .from("conversations")
      .select("id", { count: "exact", head: true })
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`),
    supabase
      .from("wishlists")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
  ]);

  const stats = [
    { key: "myListings", value: listingsRes.count ?? 0, href: "/dashboard/listings" },
    { key: "activeOffers", value: offersRes.count ?? 0, href: "/dashboard/transactions" },
    { key: "messages", value: messagesRes.count ?? 0, href: "/dashboard/messages" },
    { key: "wishlist", value: wishlistRes.count ?? 0, href: "/dashboard/wishlist" },
  ];

  const displayName = profile?.display_name ?? profile?.username ?? "there";

  return <DashboardClient displayName={displayName} stats={stats} />;
}
