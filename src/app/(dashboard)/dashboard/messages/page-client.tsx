"use client";

import { useLocale } from "@/lib/i18n/context";
import { Card, CardContent } from "@/components/ui/card";

export default function MessagesClient() {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.dashboard.messages}</h1>
        <p className="text-muted-foreground mt-1">
          {t.dashboard.messages}
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">{t.dashboard.noMessages}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t.dashboard.messagesComingSoon}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
