"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/auth/user-menu";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useLocale } from "@/lib/i18n/context";
import type { User } from "@supabase/supabase-js";

interface SerializedUser {
  id: string;
  email: string | null;
  user_metadata: User["user_metadata"];
}

export function HeaderClient({ user }: { user: SerializedUser | null }) {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            SF
          </div>
          <span className="text-lg font-bold tracking-tight">ShipFlip</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="/listings" className="hover:text-foreground transition-colors">
            {t.nav.browse}
          </Link>
          <Link href="/#how" className="hover:text-foreground transition-colors">
            {t.nav.howItWorks}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          {user ? (
            <UserMenu user={user as unknown as User} />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t.nav.signIn}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/login">{t.nav.getStarted}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
