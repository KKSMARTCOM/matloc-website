"use client";

import { useEffect, useState } from "react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import CtaBanner from "@/components/ui/CtaBanner";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/public/assets/assets";
import { useI18n } from "@/contexts/I18nContext";
import { useCmsSettings } from "@/hooks/useCmsSettings";
import type { DbService } from "@/lib/db";
import type React from "react";

type CardItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  url?: string;
  icon: React.ReactNode;
  iconLarge: React.ReactNode;
};

export default function ServicesPage() {
  const { t } = useI18n();
  const cms    = useCmsSettings("services");
  const images = useCmsSettings("images");

  /* Données depuis la DB avec fallback statique */
  const [cards, setCards] = useState<CardItem[]>(
    SERVICES.map((s) => ({
      id: s.id ?? "",
      title: t(`data.services.${s.id}.title`),
      subtitle: t(`data.services.${s.id}.subtitle`),
      description: t(`data.services.${s.id}.description`),
      points: s.points?.map((_, i) => t(`data.services.${s.id}.points.${i}`)) ?? [],
      url: s.url,
      icon: <s.icon size={18} className="text-primary shrink-0" />,
      iconLarge: <s.icon size={20} className="text-primary" />,
    }))
  );

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { items?: DbService[] } | null) => {
        const pub = (d?.items ?? []).filter((s) => s.is_published);
        if (pub.length) {
          setCards(pub.map((s) => {
            const fallback = SERVICES.find((f) => f.id === s.id);
            const Icon = fallback?.icon;
            return {
              id: s.id,
              title: s.title || t(`data.services.${s.id}.title`),
              subtitle: s.subtitle || t(`data.services.${s.id}.subtitle`),
              description: s.description || t(`data.services.${s.id}.description`),
              points: s.points.length ? s.points : (fallback?.points?.map((_, i) => t(`data.services.${s.id}.points.${i}`)) ?? []),
              url: s.image_url || fallback?.url,
              icon: Icon ? <Icon size={18} className="text-primary shrink-0" /> : null,
              iconLarge: Icon ? <Icon size={20} className="text-primary" /> : null,
            };
          }));
        }
      })
      .catch(() => undefined);
  }, [t]);

  return (
    <>
      <PageHero title={cms.get("services_hero_title", t("pages.services"))} url={images.get("img_banner_services", "/assets/images/banner.jpg")} />
      <div className="container-site py-16">
        <SectionHeader
          title={cms.get("services_title", t("pages.serviceTitle"))}
          subtitle={cms.get("services_subtitle", t("home.servicesIntro"))}
        />
        <Reveal duration={1.5} delay={0.5} distance={80} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              subtitle={s.subtitle}
              url={s.url}
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
