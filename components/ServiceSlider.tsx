"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { SERVICES } from "@/public/assets/assets";
import ServiceSliderCard from "./ui/ServiceSliderCard";
import { useI18n } from "@/contexts/I18nContext";

export default function ServicesSlider() {
  const { t } = useI18n();
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      loop
      slidesPerView={1.2}
      centeredSlides
      spaceBetween={24}
      breakpoints={{
        640: { slidesPerView: 2, centeredSlides: false },
        1024: { slidesPerView: 3, centeredSlides: false },
      }}
      className="pb-12! w-full services-slider"
    >
      {SERVICES.map((service, key) => (
        <SwiperSlide key={key} className="h-auto self-stretch">
          <ServiceSliderCard
            icon={service.icon}
            title={t(`data.services.${service.id}.title`)}
            subtitle={t(`data.services.${service.id}.subtitle`)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
