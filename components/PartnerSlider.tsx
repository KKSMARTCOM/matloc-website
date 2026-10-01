"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Loader2, Users } from "lucide-react";
import EmptyState from "./ui/EmptyState";
import type { DbPartner } from "@/lib/db";

const FALLBACK = [1, 2, 3, 4, 5].map((i) => ({
  id: `partner-${i}`,
  name: `Partenaire ${i}`,
  logo_url: `/assets/images/jpg/partner${i}.jpeg`,
  website_url: "",
  sort_order: i,
  is_published: true,
}));

export default function PartnersSlider() {
  const [partners, setPartners] = useState<DbPartner[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch("/api/admin/partners")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { items?: DbPartner[] } | null) => {
        const pub = (d?.items ?? []).filter((p) => p.is_published);
        setPartners(pub);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-10"><Loader2 size={20} className="animate-spin text-gray-400" /></div>
  );

  if (partners.length === 0) return (
    <EmptyState
      icon={Users}
      title="Aucun partenaire pour le moment"
      description="Nos partenaires seront présentés ici prochainement."
    />
  );

  const canLoop = partners.length >= 10;

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={canLoop}
      speed={800}
      slidesPerView={2}
      spaceBetween={24}
      breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 5 } }}
      className="w-full partners-slider"
    >
      {partners.map((p) => (
        <SwiperSlide key={p.id} className="h-auto">
          <div className="group flex flex-col items-center justify-center gap-3 h-full py-4">
            <div className="relative w-38 h-16 rounded-full overflow-hidden grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              <Image
                src={p.logo_url}
                alt={p.name}
                fill
                sizes="152px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
