"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import CtaBanner from "@/components/ui/CtaBanner";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/contexts/I18nContext";
import { useCmsSettings } from "@/hooks/useCmsSettings";
import type { DbService } from "@/lib/db";

export default function ServicesPage() {
  const { t } = useI18n();
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
        title={cms.get("services_hero_title", t("pages.services"))}
        url={images.get("img_banner_services", "/assets/images/banner.jpg")}
      />
      <div className="container-site py-16">
        <SectionHeader
          title={cms.get("services_title", t("pages.serviceTitle"))}
          subtitle={cms.get("services_subtitle", t("home.servicesIntro"))}
        />
        <Reveal
          duration={1.5}
          delay={0.5}
          distance={80}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              subtitle={s.subtitle}
              url={s.image_url}
              description={s.description}
              points={s.points}
              icon={s.icon}
              iconLarge={s.iconLarge}
            />
          ))}
        </Reveal>
      </div>
      <CtaBanner />
    </>
  );
}
