"use client";

import { useEffect, useState } from "react";

type CmsGroup =
  | "hero" | "about" | "aboutpage" | "services" | "realisations"
  | "partners" | "cta" | "seo" | "footer" | "contact" | "images";

/**
 * Charge les settings CMS depuis /api/cms/{group}.
 * `get(key, fallback)` → valeur DB ou fallback si pas encore chargé.
 */
export function useCmsSettings(group: CmsGroup) {
  const [data, setData] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/cms/${group}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res: { data?: Record<string, string> } | null) => {
        if (res?.data) setData(res.data);
      })
      .catch(() => undefined);
  }, [group]);

  const get = (key: string, fallback = ""): string => data[key] ?? fallback;

  return { data, get };
}
