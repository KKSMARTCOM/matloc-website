"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { SiFacebook, SiX, SiInstagram } from "@icons-pack/react-simple-icons";
import { MEMBERS } from "@/public/assets/assets";
import Link from "next/link";
import type { DbMember } from "@/lib/db";

/* Fallback depuis les données statiques */
const FALLBACK: DbMember[] = MEMBERS.map((m, i) => ({
  id: `member-${i}`,
  name: m.name,
  role: m.role,
  image_url: m.image,
  sort_order: i,
}));

export default function TeamSlider() {
  const [members, setMembers] = useState<DbMember[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/admin/members")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { items?: DbMember[] } | null) => {
        if (d?.items?.length) setMembers(d.items);
      })
      .catch(() => undefined);
  }, []);

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      slidesPerView={1.5}
      centeredSlides
      spaceBetween={24}
      breakpoints={{ 640: { slidesPerView: 2.5 }, 1024: { slidesPerView: 3.5 } }}
      className="pb-12! w-full team-slider"
    >
      {members.map((member) => (
        <SwiperSlide key={member.id}>
          {({ isActive }) => (
            <div className={`bg-primary/10 rounded-xl overflow-hidden transition-all duration-500 ease-out ${isActive ? "shadow-lg scale-100" : "scale-95 opacity-70"}`}>
              <div className={`relative w-full transition-all duration-500 ease-out ${isActive ? "h-60" : "h-90"}`}>
                <Image
                  src={member.image_url}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-t-xl"
                  unoptimized
                />
              </div>
              <div className={`px-3 space-y-3 overflow-hidden transition-all duration-500 ease-out ${isActive ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
                <div>
                  <h2 className="font-[600]">{member.name}</h2>
                  <p>{member.role}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/"><SiFacebook size={20} /></Link>
                  <Link href="/"><SiX size={20} /></Link>
                  <Link href="/"><SiInstagram size={20} /></Link>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
