"use client";

import { useLocale } from "@/lib/i18n/context";
import { Card, CardContent } from "@/components/ui/card";

export default function TransactionsClient() {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.dashboard.transactions}</h1>
        <p className="text-muted-foreground mt-1">
          {t.dashboard.transactions}
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">{t.dashboard.noTransactions}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t.dashboard.transactionsSubtitle}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
