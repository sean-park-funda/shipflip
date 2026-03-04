import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

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
    {
      label: "My Listings",
      value: listingsRes.count ?? 0,
      href: "/dashboard/listings",
    },
    {
      label: "Active Offers",
      value: offersRes.count ?? 0,
      href: "/dashboard/transactions",
    },
    {
      label: "Messages",
      value: messagesRes.count ?? 0,
      href: "/dashboard/messages",
    },
    {
      label: "Wishlist",
      value: wishlistRes.count ?? 0,
      href: "/dashboard/wishlist",
    },
  ];

  const displayName = profile?.display_name ?? profile?.username ?? "there";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {displayName}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s an overview of your ShipFlip activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/dashboard/listings/new">Create Listing</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/browse">Browse MVPs</Link>
        </Button>
      </div>
    </div>
  );
}
