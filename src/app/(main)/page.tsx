import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/lib/types";
import { HomeClient } from "./home-client";

export default async function Home() {
  const supabase = await createClient();
  const { data: listings } = await supabase
    .from("listings")
    .select("*, profiles(display_name, avatar_url)")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(3);

  return <HomeClient listings={(listings as Listing[]) || []} />;
}
