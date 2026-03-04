"use client";

import { useLocale } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { REVENUE_MODEL_LABELS } from "@/lib/types";
import type { Listing, RevenueModel } from "@/lib/types";
import Link from "next/link";

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}

function ArrowUpDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
  );
}

function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
  );
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

type SortOption = "newest" | "price_asc" | "price_desc";

interface ListingsPageClientProps {
  listings: Listing[];
  q: string;
  model: string;
  sort: SortOption;
}

export default function ListingsPageClient({
  listings,
  q,
  model,
  sort,
}: ListingsPageClientProps) {
  const { t } = useLocale();

  const revenueModels = Object.entries(REVENUE_MODEL_LABELS) as [
    RevenueModel,
    string,
  ][];

  const SORT_OPTIONS = [
    { value: "newest", label: t.browsePage.sortNewest },
    { value: "price_asc", label: t.browsePage.sortPriceLow },
    { value: "price_desc", label: t.browsePage.sortPriceHigh },
  ] as const;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t.browsePage.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t.browsePage.subtitle}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <form className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="q"
              placeholder={t.browsePage.searchPlaceholder}
              defaultValue={q}
              className="pl-10"
            />
            {/* Preserve existing filters */}
            {model && <input type="hidden" name="model" value={model} />}
            {sort && sort !== "newest" && (
              <input type="hidden" name="sort" value={sort} />
            )}
          </form>

          {/* Filter row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Revenue model filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!model ? "default" : "outline"}
                size="sm"
                asChild
              >
                <Link
                  href={{
                    pathname: "/listings",
                    query: {
                      ...(q ? { q } : {}),
                      ...(sort && sort !== "newest" ? { sort } : {}),
                    },
                  }}
                >
                  {t.browsePage.allModels}
                </Link>
              </Button>
              {revenueModels.map(([key, label]) => (
                <Button
                  key={key}
                  variant={model === key ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link
                    href={{
                      pathname: "/listings",
                      query: {
                        ...(q ? { q } : {}),
                        model: key,
                        ...(sort && sort !== "newest" ? { sort } : {}),
                      },
                    }}
                  >
                    {label}
                  </Link>
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                {SORT_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={sort === option.value ? "default" : "ghost"}
                    size="sm"
                    className="text-xs"
                    asChild
                  >
                    <Link
                      href={{
                        pathname: "/listings",
                        query: {
                          ...(q ? { q } : {}),
                          ...(model ? { model } : {}),
                          ...(option.value !== "newest"
                            ? { sort: option.value }
                            : {}),
                        },
                      }}
                    >
                      {option.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-muted-foreground">
          {listings.length}{" "}
          {listings.length === 1 ? "listing" : "listings"}
          {q && (
            <>
              {" "}
              for &ldquo;{q}&rdquo;
            </>
          )}
          {model && model in REVENUE_MODEL_LABELS && (
            <>
              {" "}
              in{" "}
              <span className="font-medium text-foreground">
                {REVENUE_MODEL_LABELS[model as RevenueModel]}
              </span>
            </>
          )}
        </p>

        {/* Listings grid */}
        {listings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.slug}`}>
                <Card className="group cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {listing.title}
                      </h3>
                      <span className="text-lg font-bold text-primary shrink-0 ml-2">
                        {formatPrice(listing.asking_price)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {listing.short_description || listing.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {listing.revenue_model_type && (
                        <Badge variant="default" className="text-xs">
                          {
                            REVENUE_MODEL_LABELS[
                              listing.revenue_model_type
                            ]
                          }
                        </Badge>
                      )}
                      {listing.tech_stack.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {listing.tech_stack.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{listing.tech_stack.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-4 border-t border-border pt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>
                          {listing.monthly_revenue > 0
                            ? `${formatPrice(listing.monthly_revenue)}/mo`
                            : "Pre-revenue"}
                        </span>
                        <span>
                          {listing.monthly_users > 0
                            ? `${listing.monthly_users.toLocaleString()} ${t.listings.users}`
                            : t.listings.preLaunch}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-border">
            <Rocket className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">{t.browsePage.noResults}</h3>
            <p className="mt-2 text-muted-foreground">
              {q || model
                ? t.browsePage.noResults
                : t.listings.empty}
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {(q || model) && (
                <Button variant="outline" asChild>
                  <Link href="/listings">{t.browsePage.clearFilters}</Link>
                </Button>
              )}
              <Button asChild>
                <Link href="/dashboard/listings/new">{t.listings.listCta}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
