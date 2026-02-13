"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { translations, type Locale, type Translations } from "./i18n";

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  t: translations.en,
  toggleLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "es" : "en"));
  }, []);

  return (
    <LocaleContext.Provider
      value={{ locale, t: translations[locale], toggleLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
