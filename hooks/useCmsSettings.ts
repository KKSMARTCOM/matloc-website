"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

type CmsGroup =
  | "hero" | "about" | "aboutpage" | "services" | "realisations"
  | "partners" | "cta" | "seo" | "footer" | "contact" | "images";

/**
 * Charge les settings CMS depuis /api/cms/{group}.
 *
 * Comportement selon la langue :
 * - FR : retourne les valeurs DB (cms_settings) éditables depuis l'admin
 * - EN : retourne t(key) si une traduction existe, sinon la valeur DB FR
 *
 * Cela garantit que tout le contenu est traduit en EN dès que
 * l'admin a saisi les traductions dans /admin/langue.
 */
export function useCmsSettings(group: CmsGroup) {
  const { language, t } = useI18n();
  const [data, setData] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/cms/${group}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res: { data?: Record<string, string> } | null) => {
        if (res?.data) setData(res.data);
      })
      .catch(() => undefined);
  }, [group]);

  /**
   * get(cmsKey, i18nKeyOrFallback?, fallback?)
   *
   * Si le 2e argument commence par "/" ou "http" → c'est un fallback direct (URL d'image)
   * Sinon → c'est une clé i18n pour la traduction EN
   */
  const get = (cmsKey: string, i18nKeyOrFallback?: string, fallback = ""): string => {
    const isUrl = i18nKeyOrFallback?.startsWith("/") || i18nKeyOrFallback?.startsWith("http");
    const i18nKey  = isUrl ? undefined : i18nKeyOrFallback;
    const fbValue  = isUrl ? (i18nKeyOrFallback ?? fallback) : fallback;

    if (language === "en" && i18nKey) {
      const translated = t(i18nKey);
      if (translated && translated !== i18nKey) return translated;
    }
    return data[cmsKey] ?? fbValue;
  };

  return { data, get, language };
}
