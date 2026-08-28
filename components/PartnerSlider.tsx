"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const PARTNERS = [
  { logoUrl: "/assets/images/jpg/partner1.jpeg" },
  { logoUrl: "/assets/images/jpg/partner2.jpeg" },
  { logoUrl: "/assets/images/jpg/partner3.jpeg" },
  { logoUrl: "/assets/images/jpg/partner4.jpeg" },
  { logoUrl: "/assets/images/jpg/partner5.jpeg" },
];

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
            <div className="relative w-38 h-16 rounded-full overflow-hidden grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              <Image
                src={partner.logoUrl}
                alt={partner.logoUrl}
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
