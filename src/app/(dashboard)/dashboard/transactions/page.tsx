import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TransactionsClient from "./page-client";

export default async function TransactionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <TransactionsClient />;
}
