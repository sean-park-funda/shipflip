import Link from "next/link";

export function Footer() {
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
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 ShipFlip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
