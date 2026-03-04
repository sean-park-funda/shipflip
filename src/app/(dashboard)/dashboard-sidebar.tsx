"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";

export function DashboardSidebar() {
  const { t } = useLocale();

  const sidebarLinks = [
    { href: "/dashboard", label: t.dashboard.overview },
    { href: "/dashboard/listings", label: t.dashboard.myListings },
    { href: "/dashboard/messages", label: t.dashboard.messages },
    { href: "/dashboard/transactions", label: t.dashboard.transactions },
    { href: "/dashboard/wishlist", label: t.dashboard.wishlist },
    { href: "/dashboard/profile", label: t.dashboard.profile },
  ];

  return (
    <aside className="hidden w-52 shrink-0 md:block">
      <nav className="space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
