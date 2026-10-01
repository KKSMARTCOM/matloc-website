"use client";

import { createContext, useContext, useEffect, useState } from "react";
import i18n from "@/lib/i18n";

type Language = "fr" | "en";

interface I18nContextValue {
  language: Language;
  t: (key: string) => string;
  /** Retourne un tableau de chaînes si la clé pointe sur un array i18n, sinon [] */
  tArray: (key: string) => string[];
  changeLanguage: (language: Language) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Charge les traductions EN depuis la DB et les injecte dans i18next.
 * Les traductions FR viennent toujours de lib/i18n.ts (statiques).
 */
async function loadEnFromDb() {
  try {
    const res = await fetch("/api/cms/translations?lang=en");
    if (!res.ok) return;
    const data = await res.json() as { data?: Record<string, string> };
    if (!data.data || Object.keys(data.data).length === 0) return;

    /* Reconstituer l'objet imbriqué pour i18next */
    const nested: Record<string, unknown> = {};
    for (const [flatKey, value] of Object.entries(data.data)) {
      const parts  = flatKey.split(".");
      let   cursor = nested;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cursor[parts[i]]) cursor[parts[i]] = {};
        cursor = cursor[parts[i]] as Record<string, unknown>;
      }
      const lastKey = parts[parts.length - 1];
      /* Les champs "points" sont stockés en DB avec séparateur " | " → reconvertir en array */
      if (lastKey === "points" && typeof value === "string" && value.includes(" | ")) {
        cursor[lastKey] = value.split(" | ");
      } else {
        cursor[lastKey] = value;
      }
    }

    /* Injecter dans i18next — écrase les valeurs statiques EN */
    i18n.addResourceBundle("en", "translation", nested, true, true);
  } catch {
    /* Silencieux — les traductions statiques de lib/i18n.ts servent de fallback */
  }
}

export function I18nContextProvider({ children }: { children: React.ReactNode }) {
  /* Toujours FR au premier rendu SSR — pas de flash de contenu */
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    /* Lire la préférence stockée en localStorage uniquement */
    const stored = localStorage.getItem("matloc_lang") as Language | null;
    const initialLang: Language = stored === "en" ? "en" : "fr";

    if (initialLang === "en") {
      /* Charger les traductions EN depuis la DB avant d'afficher EN */
      loadEnFromDb().then(() => {
        void i18n.changeLanguage("en");
        setLanguage("en");
      });
    } else {
      /* S'assurer que i18next est bien en FR */
      if (i18n.language !== "fr") void i18n.changeLanguage("fr");
      setLanguage("fr");
    }

    /* Écouter les changements de langue */
    const onLangChanged = (lng: string) => {
      setLanguage(lng === "en" ? "en" : "fr");
    };
    i18n.on("languageChanged", onLangChanged);
    return () => { i18n.off("languageChanged", onLangChanged); };
  }, []);

  const changeLanguage = (lang: Language) => {
    localStorage.setItem("matloc_lang", lang);
    if (lang === "en") {
      /* Charger les traductions EN depuis la DB puis basculer */
      loadEnFromDb().then(() => {
        void i18n.changeLanguage("en");
      });
    } else {
      void i18n.changeLanguage("fr");
    }
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        t:              (key) => i18n.t(key),
        tArray:         (key) => {
          const val = i18n.t(key, { returnObjects: true });
          return Array.isArray(val) ? (val as string[]) : [];
        },
        changeLanguage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nContextProvider");
  return ctx;
}
