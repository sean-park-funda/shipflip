"use client";

import { useLocale } from "@/lib/i18n/context";
import { LOCALE_LABELS, type Locale } from "@/lib/i18n/dictionaries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FLAG: Record<Locale, string> = { en: "🇺🇸", ko: "🇰🇷", ja: "🇯🇵" };

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
          <span>{FLAG[locale]}</span>
          <span className="hidden sm:inline">{LOCALE_LABELS[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(LOCALE_LABELS) as Locale[]).map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className={locale === l ? "font-semibold" : ""}
          >
            {FLAG[l]} {LOCALE_LABELS[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
