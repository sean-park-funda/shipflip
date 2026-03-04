import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";

export default async function TransactionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground mt-1">
          Track your offers and purchases.
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No transactions yet.</p>
          <p className="text-sm text-muted-foreground mt-1">
            When you make or receive offers, they&apos;ll appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
