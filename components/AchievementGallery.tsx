"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PlayIcon, XIcon } from "lucide-react";
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES } from "@/public/assets/assets";
import Reveal from "./ui/Reveal";
import { useI18n } from "@/contexts/I18nContext";
import type { DbAchievement } from "@/lib/db";

function getGridClass(index: number, total: number) {
  if (total % 2 !== 0 && index === total - 1) return "md:col-start-2 md:col-span-4";
  const row = Math.floor(index / 2);
  const posInRow = index % 2;
  const isEvenRow = row % 2 === 0;
  if (isEvenRow) return posInRow === 0 ? "md:col-span-4" : "md:col-span-2";
  return posInRow === 0 ? "md:col-span-2" : "md:col-span-4";
}

export default function AchievementGallery() {
  const { t } = useI18n();
  const [achievements, setAchievements] = useState<DbAchievement[]>(
    ACHIEVEMENTS.map((a) => ({
      id: String(a.id),
      title: a.title,
      category: a.category,
      thumbnail: a.thumbnail,
      video_url: a.videoUrl,
      sort_order: Number(a.id) - 1,
      is_published: true,
    }))
  );
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [activeVideo, setActiveVideo] = useState<DbAchievement | null>(null);

  useEffect(() => {
    fetch("/api/admin/achievements")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { items?: DbAchievement[] } | null) => {
        const pub = (d?.items ?? []).filter((a) => a.is_published);
        if (pub.length) setAchievements(pub);
      })
      .catch(() => undefined);
  }, []);

  /* Catégories dynamiques depuis les données DB */
  const categories = useMemo(() => {
    const cats = Array.from(new Set(achievements.map((a) => a.category)));
    return ["Tous", ...cats];
  }, [achievements]);

  const filtered = useMemo(() => {
    if (activeCategory === "Tous") return achievements;
    return achievements.filter((a) => a.category === activeCategory);
  }, [activeCategory, achievements]);

  return (
    <>
      {/* Barre de filtre */}
      <Reveal duration={1.5} delay={0.5} distance={80}
        className="flex gap-2 overflow-x-auto pb-3 mb-10 -mx-1 px-1 custom-scrollbar">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
            }`}>
            {cat === "Tous" ? t("data.achievements.all") : cat}
          </button>
        ))}
      </Reveal>

      {/* Grille */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-16">{t("data.achievements.empty")}</p>
      ) : (
        <Reveal duration={1.6} delay={0.6} distance={85}
          className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
          {filtered.map((item, index) => (
            <button key={item.id} onClick={() => setActiveVideo(item)}
              className={`group relative w-full h-48 md:h-60 rounded-xl overflow-hidden shadow-md border-0 cursor-pointer p-0 ${getGridClass(index, filtered.length)}`}>
              <Image src={item.thumbnail} alt={item.title} fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 shadow-lg">
                  <PlayIcon size={26} className="text-primary ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left bg-linear-to-t from-black/70 to-transparent">
                <p className="text-white/70 text-xs uppercase tracking-wide mb-1">{item.category}</p>
                <p className="text-white font-semibold text-sm drop-shadow-md">{item.title}</p>
              </div>
            </button>
          ))}
        </Reveal>
      )}

      {/* Modal vidéo */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}>
          <button onClick={() => setActiveVideo(null)} aria-label={t("common.close")}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border-0 cursor-pointer transition-colors duration-150">
            <XIcon size={22} />
          </button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <video src={activeVideo.video_url} controls autoPlay
                className="w-full h-full object-cover" />
            </div>
            <p className="text-white text-center mt-4 font-medium">{activeVideo.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
