"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PlayIcon, XIcon } from "lucide-react";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORIES,
  type Achievement,
} from "@/public/assets/assets";
import Reveal from "./ui/Reveal";
import { useI18n } from "@/contexts/I18nContext";

const CATEGORY_KEYS = ["all", "roads", "industrial", "ports", "sanitation"];
const ACHIEVEMENT_KEYS = [
  "bridge",
  "zone",
  "port",
  "network",
  "roadSite",
  "portoSite",
];

function getGridClass(index: number, total: number) {
  const isLastAlone = total % 2 !== 0 && index === total - 1;

  if (isLastAlone) {
    return "md:col-start-2 md:col-span-4";
  }

  const row = Math.floor(index / 2);
  const posInRow = index % 2;
  const isEvenRow = row % 2 === 0;

  if (isEvenRow) {
    return posInRow === 0 ? "md:col-span-4" : "md:col-span-2";
  }
  return posInRow === 0 ? "md:col-span-2" : "md:col-span-4";
}

export default function AchievementGallery() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVideo, setActiveVideo] = useState<Achievement | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return ACHIEVEMENTS;
    return ACHIEVEMENTS.filter(
      (a) =>
        CATEGORY_KEYS[ACHIEVEMENT_CATEGORIES.indexOf(a.category)] ===
        activeCategory,
    );
  }, [activeCategory]);

  return (
    <>
      {/* Barre de filtre */}
      <Reveal
        duration={1.5}
        delay={0.5}
        distance={80}
        className="flex gap-2 overflow-x-auto pb-3 mb-10 -mx-1 px-1 custom-scrollbar"
      >
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${
              activeCategory === key
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {t(`data.achievements.${key}`)}
          </button>
        ))}
      </Reveal>

      {/* Grille vidéos */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          {t("data.achievements.empty")}
        </p>
      ) : (
        <Reveal
          duration={1.6}
          delay={0.6}
          distance={85}
          className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start"
        >
          {filtered.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveVideo(item)}
              className={`group relative w-full h-48 md:h-60 rounded-xl overflow-hidden shadow-md border-0 cursor-pointer p-0 ${getGridClass(
                index,
                filtered.length,
              )}`}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 shadow-lg">
                  <PlayIcon
                    size={26}
                    className="text-primary ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-left bg-linear-to-t from-black/70 to-transparent">
                <p className="text-white/70 text-xs uppercase tracking-wide mb-1">
                  {t(
                    `data.achievements.${CATEGORY_KEYS[ACHIEVEMENT_CATEGORIES.indexOf(item.category)]}`,
                  )}
                </p>
                <p className="text-white font-semibold text-sm drop-shadow-md">
                  {t(
                    `data.achievements.${ACHIEVEMENT_KEYS[Number(item.id) - 1]}`,
                  )}
                </p>
              </div>
            </button>
          ))}
        </Reveal>
      )}

      {/* Modal vidéo */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-9999 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            aria-label={t("common.close")}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border-0 cursor-pointer transition-colors duration-150"
          >
            <XIcon size={22} />
          </button>

          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`${activeVideo.videoUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-white text-center mt-4 font-medium">
              {t(
                `data.achievements.${ACHIEVEMENT_KEYS[Number(activeVideo.id) - 1]}`,
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
