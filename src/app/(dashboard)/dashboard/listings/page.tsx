import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/lib/types";
import MyListingsClient from "./page-client";

export default async function MyListingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Listing[]>();

  return <MyListingsClient listings={listings} />;
}
