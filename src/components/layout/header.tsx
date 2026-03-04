import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/auth/user-menu";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
            Browse
          </Link>
          <Link href="/#how" className="hover:text-foreground transition-colors">
            How it works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/login">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
