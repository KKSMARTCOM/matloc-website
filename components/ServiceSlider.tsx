"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { CogIcon, MoveVerticalIcon, VanIcon, WrenchIcon } from "lucide-react";
import { SERVICES } from "@/public/assets/assets";
import ServiceSliderCard from "./ui/ServiceSliderCard";
import type { DbService } from "@/lib/db";
import type React from "react";

type SlideItem = { id: string; icon: React.ElementType; title: string; subtitle: string };

const iconMap: Record<string, React.ElementType> = {
  cog: CogIcon, drill: CogIcon, moveVertical: MoveVerticalIcon,
  van: VanIcon, wrench: WrenchIcon, default: WrenchIcon,
};

const fallback: SlideItem[] = SERVICES.map((s) => ({
  id: s.id ?? "",
  icon: s.icon,
  title: s.title,
  subtitle: s.subtitle,
}));

export default function ServicesSlider() {
  const [slides, setSlides] = useState<SlideItem[]>(fallback);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { items?: DbService[] } | null) => {
        const pub = (d?.items ?? []).filter((s) => s.is_published);
        if (pub.length) {
          setSlides(pub.map((s) => ({
            id:       s.id,
            icon:     iconMap[s.id] ?? iconMap.default,
            title:    s.title,    /* DB en priorité absolue */
            subtitle: s.subtitle,  /* DB en priorité absolue */
          })));
        }
      })
      .catch(() => undefined);
  }, []);

  const canLoop = slides.length >= 6;

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      loop={canLoop}
      slidesPerView={1.2}
      centeredSlides
      spaceBetween={24}
      breakpoints={{ 640: { slidesPerView: 2, centeredSlides: false }, 1024: { slidesPerView: 3, centeredSlides: false } }}
      className="pb-12! w-full services-slider"
    >
      {slides.map((s) => (
        <SwiperSlide key={s.id} className="h-auto self-stretch">
          <ServiceSliderCard icon={s.icon} title={s.title} subtitle={s.subtitle} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
