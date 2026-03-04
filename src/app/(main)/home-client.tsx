"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import type { Listing } from "@/lib/types";

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
}
function Code(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
}
function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
}
function Shield(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
}
function Zap(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>;
}
function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
}
function Users(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>;
}
function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}

const stepIcons = [
  <Code key="code" className="h-6 w-6" />,
  <Rocket key="rocket" className="h-6 w-6" />,
  <Users key="users" className="h-6 w-6" />,
  <DollarSign key="dollar" className="h-6 w-6" />,
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

export function HomeClient({ listings }: { listings: Listing[] }) {
  const { t } = useLocale();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-32 md:pt-36">
          <div className="flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              {t.hero.badge}
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {t.hero.title1}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {t.hero.gradient1}
              </span>
              <br />
              {t.hero.title2}{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                {t.hero.gradient2}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {t.hero.desc1}
              <br />
              {t.hero.desc2}
              <br />
              <span className="text-foreground font-medium">{t.hero.desc3}</span>
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 px-8 text-base" asChild>
                <Link href="/dashboard/listings/new">
                  {t.hero.ctaList}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-base" asChild>
                <Link href="/listings">{t.hero.ctaBrowse}</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{t.hero.trust}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.howItWorks.title}</h2>
            <p className="mt-3 text-muted-foreground">{t.howItWorks.subtitle}</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="group relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {stepIcons[i]}
                </div>
                <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <ArrowRight className="absolute -right-4 top-5 hidden h-5 w-5 text-muted-foreground/30 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.listings.title}</h2>
              <p className="mt-3 text-muted-foreground">{t.listings.subtitle}</p>
            </div>
            <Button variant="ghost" className="hidden gap-1 md:flex" asChild>
              <Link href="/listings">
                {t.listings.viewAll} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {listings.length > 0 ? (
              listings.map((listing) => (
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
                        {listing.tech_stack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {listing.monthly_users > 0
                            ? `${listing.monthly_users} ${t.listings.users}`
                            : t.listings.preLaunch}
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-16">
                <p className="text-muted-foreground text-lg">{t.listings.empty}</p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/listings/new">{t.listings.listCta}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* For Sellers & Buyers */}
      <section id="for-who" className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-2">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold">{t.forWho.sellers.title}</h3>
                <p className="mt-2 text-muted-foreground">{t.forWho.sellers.desc}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {t.forWho.sellers.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full gap-2" variant="outline" asChild>
                  <Link href="/dashboard/listings/new">
                    {t.forWho.sellers.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold">{t.forWho.buyers.title}</h3>
                <p className="mt-2 text-muted-foreground">{t.forWho.buyers.desc}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {t.forWho.buyers.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Shield className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full gap-2" variant="outline" asChild>
                  <Link href="/listings">
                    {t.forWho.buyers.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border/40 p-10 text-center md:p-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t.cta.title1}
              <br />
              {t.cta.title2}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t.cta.desc1}
              <br />
              {t.cta.desc2}
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={t.cta.placeholder}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button size="lg" className="shrink-0 px-8">{t.cta.button}</Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t.cta.note}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
