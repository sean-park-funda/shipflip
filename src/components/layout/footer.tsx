"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs">
              SF
            </div>
            <span className="font-semibold">ShipFlip</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">{t.footer.terms}</Link>
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">{t.footer.privacy}</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 ShipFlip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
