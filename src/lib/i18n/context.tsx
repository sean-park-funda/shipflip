"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { dictionaries, type Locale, type Dictionary } from "./dictionaries";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: dictionaries.en,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("shipflip-locale") as Locale | null;
    if (saved && dictionaries[saved]) {
      setLocaleState(saved);
    } else {
      // Auto-detect from browser
      const lang = navigator.language.slice(0, 2);
      if (lang === "ko") setLocaleState("ko");
      else if (lang === "ja") setLocaleState("ja");
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("shipflip-locale", l);
    document.documentElement.lang = l;
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
