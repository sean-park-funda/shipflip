import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Listing } from "@/lib/types";
import ListingDetailClient from "./page-client";

// --- Data fetching ---

async function getListing(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select("*, profiles(id, display_name, avatar_url, username)")
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  return data as (Listing & { profiles: { id: string; display_name: string | null; avatar_url: string | null; username: string | null } }) | null;
}

// --- Metadata ---

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    return { title: "Listing Not Found" };
  }

  return {
    title: `${listing.title} - ShipFlip`,
    description: listing.short_description || listing.description.slice(0, 160),
    openGraph: {
      title: `${listing.title} - ShipFlip`,
      description: listing.short_description || listing.description.slice(0, 160),
    },
  };
}

// --- Page ---

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const listing = await getListing(slug);

  if (!listing) {
    notFound();
  }

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <ListingDetailClient
      listing={listing}
      isAuthenticated={!!user}
    />
  );
}
