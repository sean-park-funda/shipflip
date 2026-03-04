import Link from "next/link";
import { Header } from "@/components/layout/header";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/listings", label: "My Listings" },
  { href: "/dashboard/messages", label: "Messages" },
  { href: "/dashboard/transactions", label: "Transactions" },
  { href: "/dashboard/wishlist", label: "Wishlist" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex gap-8">
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
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
