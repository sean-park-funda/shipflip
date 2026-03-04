import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Listing, ListingStatus } from "@/lib/types";
import { LISTING_STATUS_LABELS } from "@/lib/types";

const statusVariant: Record<ListingStatus, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  pending_review: "outline",
  active: "default",
  under_offer: "default",
  sold: "secondary",
  rejected: "destructive",
  archived: "secondary",
};

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Listings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your MVP listings.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/listings/new">Create New Listing</Link>
        </Button>
      </div>

      {!listings || listings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              You don&apos;t have any listings yet.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/listings/new">Create Your First Listing</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/dashboard/listings/${listing.id}/edit`}
              className="block"
            >
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{listing.title}</h3>
                      <Badge variant={statusVariant[listing.status]}>
                        {LISTING_STATUS_LABELS[listing.status]}
                      </Badge>
                    </div>
                    <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                      <span>
                        ${listing.asking_price.toLocaleString()}
                      </span>
                      <span>{listing.view_count} views</span>
                      <span>
                        {new Date(listing.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
