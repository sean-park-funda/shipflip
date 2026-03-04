"use client";

import { useLocale } from "@/lib/i18n/context";
import Link from "next/link";
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

interface MyListingsClientProps {
  listings: Listing[] | null;
}

export default function MyListingsClient({ listings }: MyListingsClientProps) {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t.dashboard.myListings}</h1>
          <p className="text-muted-foreground mt-1">
            {t.dashboard.myListings}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/listings/new">{t.dashboard.createListing}</Link>
        </Button>
      </div>

      {!listings || listings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {t.dashboard.noListings}
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/listings/new">{t.dashboard.createFirst}</Link>
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
