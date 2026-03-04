"use client";

import { useLocale } from "@/lib/i18n/context";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardClientProps {
  displayName: string;
  stats: {
    key: string;
    value: number;
    href: string;
  }[];
}

export default function DashboardClient({ displayName, stats }: DashboardClientProps) {
  const { t } = useLocale();

  const labelMap: Record<string, string> = {
    myListings: t.dashboard.myListings,
    activeOffers: t.dashboard.activeOffers,
    messages: t.dashboard.messages,
    wishlist: t.dashboard.wishlist,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t.dashboard.welcome}, {displayName}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t.dashboard.overview}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.key} href={stat.href}>
            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{labelMap[stat.key]}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/dashboard/listings/new">{t.dashboard.createListing}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/listings">{t.dashboard.browseMvps}</Link>
        </Button>
      </div>
    </div>
  );
}
