"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlayIcon, XIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import { useI18n } from "@/contexts/I18nContext";
import { DbAchievement } from "@/lib/db";


export default function VideoGallery() {
  const { t, language } = useI18n();
  const [videos, setVideos] = useState<DbAchievement[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/achievements")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { items?: DbAchievement[] } | null) => {
        const pub = (d?.items ?? []).filter((a) => a.is_published);
        if (pub.length) setVideos(pub.slice(0, 4));
      })
      .catch(() => undefined);
  }, []);

  return (
    <>
      <section className="container-site py-20">
        <SectionHeader
          title={t("pages.projects")}
          subtitle={t("home.partnersIntro")}
        />

        <Reveal
          duration={1.5}
          delay={0.5}
          distance={80}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {videos.map((video) => {
            /* Chercher la traduction EN du titre via l'id du item (clé i18n) */
            const i18nKey      = `data.achievements.${video.id}`;
            const displayTitle = (language === "en")
              ? (t(i18nKey) !== i18nKey ? t(i18nKey) : video.title)
              : video.title;
            /* Traduit aussi la catégorie affichée */
            const catKey = video.category
              ? `data.achievements.${video.category.toLowerCase().replace(/[^a-z]/g, "")}`
              : null;
            const displayCategory = (language === "en" && catKey)
              ? (t(catKey) !== catKey ? t(catKey) : video.category)
              : video.category;
            return (
            <button
              key={video.id}
              onClick={() => setActiveVideo(video.video_url)}
              className="group relative w-full h-64 rounded-xl overflow-hidden shadow-md border-0 cursor-pointer p-0"
            >
              <Image
                src={video.thumbnail}
                alt={displayTitle}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 shadow-lg">
                  <PlayIcon size={28} className="text-primary ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left bg-linear-to-t from-black/70 to-transparent">
                {displayCategory && (
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">{displayCategory}</p>
                )}
                <p className="text-white font-semibold text-sm drop-shadow-md">
                  {displayTitle}
                </p>
              </div>
            </button>
            );
          })}
        </Reveal>

        <Reveal
          duration={1.6}
          delay={0.6}
          distance={85}
          className="flex justify-center mt-10"
        >
          <Link
            href="/realisations"
            className="px-4 py-3 text-white bg-primary hover:bg-primary-hover rounded-md font-[600] inline-flex items-center gap-2"
          >
            {t("actions.seeMore")}
            <ArrowRightIcon size={18} />
          </Link>
        </Reveal>
      </section>

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
            className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full h-full object-cover"
            /> */}
            <iframe
              src={`${activeVideo}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
