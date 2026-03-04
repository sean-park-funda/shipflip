"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { Profile } from "@/lib/types";
import { useLocale } from "@/lib/i18n/context";

const profileSchema = z.object({
  display_name: z
    .string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be 50 characters or less"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be 30 characters or less")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, hyphens, and underscores"
    ),
  bio: z
    .string()
    .max(500, "Bio must be 500 characters or less")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  github_username: z
    .string()
    .max(39, "GitHub username must be 39 characters or less")
    .regex(/^[a-zA-Z0-9-]*$/, "Invalid GitHub username")
    .optional()
    .or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { t } = useLocale();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: "",
      username: "",
      bio: "",
      website: "",
      github_username: "",
    },
  });

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single<Profile>();

      if (profile) {
        reset({
          display_name: profile.display_name ?? "",
          username: profile.username ?? "",
          bio: profile.bio ?? "",
          website: profile.website ?? "",
          github_username: profile.github_username ?? "",
        });
      }

      setLoading(false);
    }

    loadProfile();
  }, [reset, router]);

  function onSubmit(values: ProfileFormValues) {
    startTransition(async () => {
      setMessage(null);

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: values.display_name,
          username: values.username,
          bio: values.bio || null,
          website: values.website || null,
          github_username: values.github_username || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        setMessage({
          type: "error",
          text:
            error.code === "23505"
              ? "That username is already taken."
              : "Failed to update profile. Please try again.",
        });
      } else {
        setMessage({ type: "success", text: t.profilePage.saved });
      }
    });
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t.profilePage.title}</h1>
          <p className="text-muted-foreground mt-1">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.profilePage.title}</h1>
        <p className="text-muted-foreground mt-1">
          {t.profilePage.subtitle}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="display_name">{t.profilePage.displayName}</Label>
              <Input
                id="display_name"
                placeholder={t.profilePage.displayName}
                {...register("display_name")}
              />
              {errors.display_name && (
                <p className="text-sm text-destructive">
                  {errors.display_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">{t.profilePage.username}</Label>
              <Input
                id="username"
                placeholder="your-username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">{t.profilePage.bio}</Label>
              <Textarea
                id="bio"
                placeholder={t.profilePage.bio}
                rows={4}
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-destructive">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">{t.profilePage.website}</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                {...register("website")}
              />
              {errors.website && (
                <p className="text-sm text-destructive">
                  {errors.website.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_username">{t.profilePage.github}</Label>
              <Input
                id="github_username"
                placeholder="octocat"
                {...register("github_username")}
              />
              {errors.github_username && (
                <p className="text-sm text-destructive">
                  {errors.github_username.message}
                </p>
              )}
            </div>

            {message && (
              <p
                className={
                  message.type === "success"
                    ? "text-sm text-green-600"
                    : "text-sm text-destructive"
                }
              >
                {message.text}
              </p>
            )}

            <Button type="submit" disabled={isPending}>
              {isPending ? t.profilePage.saving : t.profilePage.save}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
