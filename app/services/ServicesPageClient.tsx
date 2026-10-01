"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import CtaBanner from "@/components/ui/CtaBanner";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/contexts/I18nContext";
import { useCmsSettings } from "@/hooks/useCmsSettings";
import { getIconComponent } from "@/components/admin/IconPicker";
import type { DbService } from "@/lib/db";

/**
 * Mapping slug DB (id du service) → clé i18n data.services.*
 * Les IDs en DB sont typiquement : echafaudages, transport, engins, associes
 * On normalise en minuscules sans accents pour matcher.
 */
const SERVICE_SLUG_MAP: Record<string, string> = {
  echafaudages: "echafaudages",
  transport: "transport",
  engins: "engins",
  associes: "associes",
  // Alias possibles si l'admin a saisi un id différent
  scaffolding: "echafaudages",
  equipment: "engins",
  associated: "associes",
};

function resolveServiceI18nKey(id: string): string | null {
  const normalized = id.toLowerCase().replace(/[^a-z]/g, "");
  return SERVICE_SLUG_MAP[normalized] ?? SERVICE_SLUG_MAP[id] ?? null;
}

export default function ServicesPage() {
  const { t, tArray, language } = useI18n();
  const cms = useCmsSettings("services");
  const images = useCmsSettings("images");

  /* Données depuis la DB avec fallback statique */
  const [cards, setCards] = useState<DbService[]>([]);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { items?: DbService[] } | null) => {
        const pub = (d?.items ?? []).filter((s) => s.is_published);
        if (pub.length) {
          setCards(pub);
        }
      })
      .catch(() => undefined);
  }, [t]);

  return (
    <>
      <PageHero
        title={cms.get("services_hero_title", "pages.services", t("pages.services"))}
        url={images.get("img_banner_services", "/assets/images/banner.jpg")}
      />
      <div className="container-site py-16">
        <SectionHeader
          title={cms.get("services_title", "pages.serviceTitle", t("pages.serviceTitle"))}
          subtitle={cms.get("services_subtitle", "home.servicesIntro", t("home.servicesIntro"))}
        />
        <Reveal
          duration={1.5}
          delay={0.5}
          distance={80}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards.map((s) => {
            const i18nKey = resolveServiceI18nKey(s.id);
            const isEn = language === "en" && i18nKey !== null;

            const tVal = (field: string, fallback: string) => {
              if (!isEn) return fallback;
              const translated = t(`data.services.${i18nKey}.${field}`);
              // Si la clé n'existe pas, i18next retourne la clé elle-même
              return translated !== `data.services.${i18nKey}.${field}`
                ? translated
                : fallback;
            };

            const title       = tVal("title",       s.title);
            const subtitle    = tVal("subtitle",    s.subtitle);
            const description = tVal("description", s.description);
            const points: string[] = isEn
              ? (() => {
                  const arr = tArray(`data.services.${i18nKey}.points`);
                  return arr.length > 0 ? arr : (s.points ?? []);
                })()
              : (s.points ?? []);

            const IconComponent = getIconComponent(s.icon ?? "wrench");

            return (
              <ServiceCard
                key={s.id}
                title={title}
                subtitle={subtitle}
                url={s.image_url}
                description={description}
                points={points}
                icon={<IconComponent size={18} className="text-[var(--color-primary)]" />}
                iconLarge={<IconComponent size={22} className="text-[var(--color-primary)]" />}
                learnMoreLabel={t("service.learn")}
              />
            );
          })}
        </Reveal>
      </div>
      <CtaBanner />
    </>
  );
}
