"use client";

import { useLocale } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { REVENUE_MODEL_LABELS } from "@/lib/types";
import Link from "next/link";
import type { Listing } from "@/lib/types";

// --- Inline SVG Icons ---

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
  );
}

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
  );
}

function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  );
}

function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
  );
}

// --- Helpers ---

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);

// --- Types ---

interface ListingDetailClientProps {
  listing: Listing & {
    profiles: {
      id: string;
      display_name: string | null;
      avatar_url: string | null;
      username: string | null;
    };
  };
  isAuthenticated: boolean;
}

export default function ListingDetailClient({
  listing,
  isAuthenticated,
}: ListingDetailClientProps) {
  const { t } = useLocale();
  const seller = listing.profiles;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/listings" className="hover:text-foreground transition-colors">
          {t.listingDetail.backToListings}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-xs">
          {listing.title}
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {listing.revenue_model_type && (
                <Badge variant="secondary">
                  {REVENUE_MODEL_LABELS[listing.revenue_model_type]}
                </Badge>
              )}
              {listing.verification_badge && (
                <Badge className="gap-1 bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {listing.title}
            </h1>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-3">{t.listingDetail.description}</h2>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {listing.description}
            </div>
          </div>

          <Separator />

          {/* Tech Stack */}
          {listing.tech_stack.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">{t.listingDetail.techStack}</h2>
              <div className="flex flex-wrap gap-2">
                {listing.tech_stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="px-3 py-1 text-sm"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Metrics */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.listingDetail.monthlyRevenue}</p>
                    <p className="text-xl font-bold">
                      {listing.monthly_revenue > 0
                        ? formatPrice(listing.monthly_revenue)
                        : "Pre-revenue"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <UsersIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.listingDetail.monthlyUsers}</p>
                    <p className="text-xl font-bold">
                      {listing.monthly_users > 0
                        ? formatNumber(listing.monthly_users)
                        : t.listings.preLaunch}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Demo URL */}
          {listing.demo_url && (
            <>
              <Separator />
              <div>
                <h2 className="text-lg font-semibold mb-3">{t.listingDetail.viewDemo}</h2>
                <a
                  href={listing.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {listing.demo_url}
                </a>
              </div>
            </>
          )}
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">{t.listingDetail.askingPrice}</p>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(listing.asking_price)}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                {isAuthenticated ? (
                  <Button size="lg" className="w-full" asChild>
                    <Link href={`/dashboard/conversations?listing=${listing.id}`}>
                      {t.listingDetail.makeOffer}
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/login">{t.listingDetail.makeOffer}</Link>
                  </Button>
                )}

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {t.dashboard.wishlist}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Protected by ShipFlip Escrow
              </p>
            </CardContent>
          </Card>

          {/* Seller Info Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                {t.listingDetail.listedBy}
              </h3>
              <div className="flex items-center gap-3">
                {seller.avatar_url ? (
                  <img
                    src={seller.avatar_url}
                    alt={seller.display_name || "Seller"}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-sm">
                    {(seller.display_name || "S").charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium">
                    {seller.display_name || "Anonymous Seller"}
                  </p>
                  {seller.username && (
                    <p className="text-sm text-muted-foreground">
                      @{seller.username}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
