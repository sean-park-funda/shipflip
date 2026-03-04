"use client";

import { useLocale } from "@/lib/i18n/context";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Listing } from "@/lib/types";

interface WishlistItem {
  id: string;
  listing_id: string;
  user_id: string;
  created_at: string;
  listings: Listing;
}

interface WishlistClientProps {
  wishlists: WishlistItem[] | null;
}

export default function WishlistClient({ wishlists }: WishlistClientProps) {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.dashboard.wishlist}</h1>
        <p className="text-muted-foreground mt-1">
          {t.dashboard.wishlist}
        </p>
      </div>

      {!wishlists || wishlists.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {t.dashboard.noWishlist}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlists.map((item) => (
            <Link key={item.id} href={`/listings/${item.listings.slug}`}>
              <Card className="hover:border-primary/30 transition-colors h-full">
                <CardContent className="pt-6">
                  <h3 className="font-medium truncate">
                    {item.listings.title}
                  </h3>
                  {item.listings.short_description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.listings.short_description}
                    </p>
                  )}
                  <p className="text-lg font-semibold mt-3">
                    ${item.listings.asking_price.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
