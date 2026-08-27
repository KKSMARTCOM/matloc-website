"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const PARTNERS = [
  { name: "Bénin BTP Services" },
  { name: "Cotonou Travaux" },
  { name: "Atlantique Construction" },
  { name: "Génie Civil Plus" },
  { name: "Littoral Ingénierie" },
  { name: "Sahel Bâtiment" },
  { name: "Ouémé Infrastructures" },
];

const logoUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=random&color=fff&bold=true&size=128&format=png`;

export default function PartnersSlider() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop
      speed={800}
      slidesPerView={2}
      spaceBetween={24}
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
      className="w-full partners-slider"
    >
      {PARTNERS.map((partner, key) => (
        <SwiperSlide key={key} className="h-auto">
          <div className="group flex flex-col items-center justify-center gap-3 h-full py-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              <Image
                src={logoUrl(partner.name)}
                alt={partner.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
