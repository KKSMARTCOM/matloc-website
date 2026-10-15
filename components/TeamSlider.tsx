"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { MEMBERS } from "@/public/assets/assets";
import { useI18n } from "@/contexts/I18nContext";
import TeamMemberModal from "./TeamMemberModal";

export default function TeamSlider() {
  const { t } = useI18n();
  const swiperRef = useRef<SwiperType | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const openMember = (index: number) => {
    swiperRef.current?.autoplay.stop();
    setSelected(index);
  };

  const closeMember = () => {
    // Recentre le slider sur le dernier membre consulté avant de reprendre
    if (selected !== null) swiperRef.current?.slideTo(selected);
    swiperRef.current?.autoplay.start();
    setSelected(null);
  };

  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        slidesPerView={1.5}
        centeredSlides
        spaceBetween={24}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        className="pb-12! w-full team-slider"
      >
        {MEMBERS.map((member, key) => (
          <SwiperSlide key={member.id}>
            {({ isActive }) => (
              <button
                type="button"
                onClick={() => openMember(key)}
                aria-haspopup="dialog"
                aria-label={`${t("team.viewProfile")} — ${member.name}`}
                className={`group block w-full text-left p-0 border-0 cursor-pointer bg-primary/10 rounded-xl overflow-hidden transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-primary ${
                  isActive ? "shadow-lg scale-100" : "scale-95 opacity-70"
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden transition-all duration-500 ease-out ${
                    isActive ? "h-60" : "h-90"
                  }`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-t-xl transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/30 transition-colors duration-300" />
                </div>

                <div
                  className={`px-3 space-y-3 overflow-hidden transition-all duration-500 ease-out ${
                    isActive
                      ? "max-h-40 py-4 opacity-100"
                      : "max-h-0 py-0 opacity-0"
                  }`}
                >
                  <div>
                    <h2 className="font-[600]">{member.name}</h2>
                    <p>{t(`data.members.${member.id}.role`)}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t("team.viewProfile")}
                    <ArrowRightIcon
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <TeamMemberModal
        index={selected}
        onClose={closeMember}
        onNavigate={setSelected}
      />
    </>
  );
}
