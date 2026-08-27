"use client";

import { createContext, useContext, useEffect, useState } from "react";
import i18n from "@/lib/i18n";

type Language = "fr" | "en";

interface I18nContextValue {
  language: Language;
  t: (key: string) => string;
  changeLanguage: (language: Language) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const DEFAULT_LANGUAGE: Language = "fr";

export function I18nContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Toujours "fr" au premier render, identique serveur/client
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const syncDetectedLanguage = () => {
      setMounted(true);
      setLanguage(i18n.language === "en" ? "en" : "fr");
    };
    queueMicrotask(syncDetectedLanguage);
    const onLanguageChanged = (nextLanguage: string) => {
      setLanguage(nextLanguage === "en" ? "en" : "fr");
    };
    i18n.on("languageChanged", onLanguageChanged);
    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, []);

  return (
    <I18nContext.Provider
      value={{
        language,
        // avant montage : force "fr" pour matcher le SSR, même si i18n
        // interne a déjà une autre langue détectée en mémoire
        t: (key) =>
          mounted ? i18n.t(key) : i18n.t(key, { lng: DEFAULT_LANGUAGE }),
        changeLanguage: (nextLanguage) =>
          void i18n.changeLanguage(nextLanguage),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
