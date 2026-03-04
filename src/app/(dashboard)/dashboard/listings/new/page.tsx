"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REVENUE_MODEL_LABELS } from "@/lib/types";
import type { RevenueModel } from "@/lib/types";
import { useState, useTransition, useEffect } from "react";

const TECH_OPTIONS = [
  "Next.js", "React", "Vue", "Svelte", "Nuxt",
  "Supabase", "Firebase", "PostgreSQL", "MongoDB",
  "Tailwind CSS", "TypeScript", "Node.js", "Python",
  "OpenAI", "Stripe", "Vercel", "AWS", "Resend",
];

interface ListingForm {
  title: string;
  short_description: string;
  description: string;
  revenue_model_type?: string;
  monthly_revenue: number;
  monthly_users: number;
  asking_price: number;
  demo_url?: string;
}

const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  short_description: z.string().min(10, "Short description must be at least 10 characters").max(200),
  description: z.string().min(30, "Description must be at least 30 characters").max(5000),
  revenue_model_type: z.string().optional(),
  monthly_revenue: z.coerce.number().min(0).default(0),
  monthly_users: z.coerce.number().min(0).default(0),
  asking_price: z.coerce.number().min(1, "Price must be at least $1"),
  demo_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 80);
}

export default function NewListingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<ListingForm>({
    resolver: zodResolver(listingSchema) as any,
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUserId(user.id);
    });
  }, [supabase, router]);

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  const onSubmit = (data: ListingForm) => {
    if (!userId) return;
    setError(null);

    startTransition(async () => {
      const slug = slugify(data.title) + "-" + Date.now().toString(36);

      const { error: insertError } = await supabase.from("listings").insert({
        seller_id: userId,
        title: data.title,
        slug,
        description: data.description,
        short_description: data.short_description,
        revenue_model_type: data.revenue_model_type || null,
        tech_stack: selectedTech,
        monthly_revenue: data.monthly_revenue,
        monthly_users: data.monthly_users,
        asking_price: data.asking_price,
        demo_url: data.demo_url || null,
        status: "draft",
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      router.push("/dashboard/listings");
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Create New Listing</h1>
      <p className="mt-1 text-muted-foreground">List your MVP for sale on ShipFlip</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8 max-w-2xl">
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold text-lg">Basic Information</h2>

            <div className="space-y-2">
              <Label htmlFor="title">Product Name</Label>
              <Input id="title" placeholder="e.g. AI Newsletter SaaS" {...register("title")} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                placeholder="One-line pitch for your product"
                {...register("short_description")}
              />
              {errors.short_description && (
                <p className="text-sm text-destructive">{errors.short_description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your product, its features, what's included in the sale..."
                rows={6}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo_url">Demo URL (optional)</Label>
              <Input
                id="demo_url"
                placeholder="https://your-app.vercel.app"
                {...register("demo_url")}
              />
              {errors.demo_url && <p className="text-sm text-destructive">{errors.demo_url.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold text-lg">Tech Stack</h2>
            <p className="text-sm text-muted-foreground">Select the technologies used in your product</p>
            <div className="flex flex-wrap gap-2">
              {TECH_OPTIONS.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    selectedTech.includes(tech)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue & Metrics */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold text-lg">Revenue & Metrics</h2>

            <div className="space-y-2">
              <Label>Revenue Model</Label>
              <Select onValueChange={(v) => setValue("revenue_model_type", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a revenue model" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(REVENUE_MODEL_LABELS) as [RevenueModel, string][]).map(
                    ([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthly_revenue">Monthly Revenue (USD)</Label>
                <Input
                  id="monthly_revenue"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("monthly_revenue")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly_users">Monthly Active Users</Label>
                <Input
                  id="monthly_users"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("monthly_users")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold text-lg">Asking Price</h2>
            <div className="space-y-2">
              <Label htmlFor="asking_price">Price (USD)</Label>
              <Input
                id="asking_price"
                type="number"
                min="1"
                placeholder="500"
                {...register("asking_price")}
              />
              {errors.asking_price && (
                <p className="text-sm text-destructive">{errors.asking_price.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isPending} className="px-8">
            {isPending ? "Creating..." : "Create Listing"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
