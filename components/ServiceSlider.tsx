"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { CogIcon, MoveVerticalIcon, VanIcon, WrenchIcon, Loader2, Wrench } from "lucide-react";
import { getIconComponent } from "@/components/admin/IconPicker";
import ServiceSliderCard from "./ui/ServiceSliderCard";
import EmptyState from "./ui/EmptyState";
import { useI18n } from "@/contexts/I18nContext";
import type { DbService } from "@/lib/db";
import type React from "react";

type SlideItem = {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
};

const iconMap: Record<string, React.ElementType> = {
  cog: CogIcon,
  drill: CogIcon,
  moveVertical: MoveVerticalIcon,
  van: VanIcon,
  wrench: WrenchIcon,
  default: WrenchIcon,
};

export default function ServicesSlider() {
  const { t, language } = useI18n();
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { items?: DbService[] } | null) => {
        const pub = (d?.items ?? []).filter((s) => s.is_published);
        if (pub.length) {
          setSlides(pub.map((s) => ({
            id:       s.id,
            icon:     getIconComponent(s.icon ?? "wrench"),
            /* title et subtitle sont résolus dans le rendu selon la langue */
            title:    s.title,
            subtitle: s.subtitle,
          })));
        }
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
      <Loader2 size={20} className="animate-spin" />
    </div>
  );

  if (slides.length === 0) return (
    <EmptyState
      icon={Wrench}
      title={t("data.services.emptyTitle") || "Aucun service disponible"}
      description={t("data.services.emptyDesc") || "Nos services seront bientôt disponibles."}
    />
  );

  const canLoop = slides.length >= 6;

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      loop={canLoop}
      slidesPerView={1.2}
      centeredSlides
      spaceBetween={24}
      breakpoints={{
        640: { slidesPerView: 2, centeredSlides: false },
        1024: { slidesPerView: 3, centeredSlides: false },
      }}
      className="pb-12! w-full services-slider"
    >
      {slides.map((s) => {
        /* En EN : essayer la traduction i18n, sinon garder le titre DB (FR) */
        const displayTitle    = (language === "en")
          ? (t(`data.services.${s.id}.title`)    !== `data.services.${s.id}.title`    ? t(`data.services.${s.id}.title`)    : s.title)
          : s.title;
        const displaySubtitle = (language === "en")
          ? (t(`data.services.${s.id}.subtitle`) !== `data.services.${s.id}.subtitle` ? t(`data.services.${s.id}.subtitle`) : s.subtitle)
          : s.subtitle;
        return (
          <SwiperSlide key={s.id} className="h-auto self-stretch">
            <ServiceSliderCard
              icon={s.icon}
              title={displayTitle}
              subtitle={displaySubtitle}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
