"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PlayIcon, XIcon, Loader2, FolderOpen } from "lucide-react";
import Reveal from "./ui/Reveal";
import EmptyState from "./ui/EmptyState";
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
  const { t, language } = useI18n();
  const [achievements, setAchievements] = useState<DbAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVideo, setActiveVideo] = useState<DbAchievement | null>(null);

  useEffect(() => {
    fetch("/api/admin/achievements")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { items?: DbAchievement[] } | null) => {
        const pub = (d?.items ?? []).filter((a) => a.is_published);
        setAchievements(pub);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(achievements.map((a) => a.category).filter(Boolean)));
    return ["all", ...cats];
  }, [achievements]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return achievements;
    return achievements.filter((a) => a.category === activeCategory);
  }, [activeCategory, achievements]);

  /**
   * Traduit une catégorie DB → label affiché.
   * La catégorie en DB peut être un slug EN (aggregates) ou un label FR.
   * On essaie d'abord data.achievements.{slug}, sinon on retourne la valeur brute.
   */
  const translateCategory = (cat: string) => {
    if (cat === "all") return t("data.achievements.all");
    // Normaliser : "transport d'agrégats" → "aggregates" etc.
    const slug = cat.toLowerCase().replace(/[^a-z]/g, "");
    const SLUG_MAP: Record<string, string> = {
      // slugs EN
      aggregates: "aggregates",
      transport:  "aggregates",
      vessel:     "vessel",
      height:     "height",
      sanitation: "sanitation",
      earthworks: "earthworks",
      // slugs FR normalisés
      travaux:    "height",   // "travaux en hauteur"
      assainissement: "sanitation",
      terrassement:   "earthworks",
      navire:     "vessel",
      all:        "all",
    };
    const i18nSlug = SLUG_MAP[slug] ?? SLUG_MAP[cat] ?? null;
    if (i18nSlug) {
      const translated = t(`data.achievements.${i18nSlug}`);
      if (translated !== `data.achievements.${i18nSlug}`) return translated;
    }
    return cat;
  };

  /**
   * Traduit le titre d'une réalisation DB.
   * Les titres ont des clés i18n data.achievements.{key} en EN.
   * On compare le titre FR stocké en DB à la clé i18n correspondante.
   */
  const translateAchievementTitle = (item: DbAchievement) => {
    if (language !== "en") return item.title;
    // Essayer la clé construite depuis l'id du item
    const keyById = `data.achievements.${item.id}`;
    const byId = t(keyById);
    if (byId !== keyById) return byId;
    return item.title;
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm">{t("common.loading") || "Chargement…"}</span>
      </div>
    );
  }

  /* ── Aucune réalisation ── */
  if (achievements.length === 0) {
    return (
      <EmptyState
        icon={FolderOpen}
        title={t("data.achievements.emptyTitle") || "Aucune réalisation pour le moment"}
        description={t("data.achievements.emptyDesc") || "Nos réalisations seront bientôt disponibles. Revenez prochainement."}
      />
    );
  }

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
            {translateCategory(cat)}
          </button>
        ))}
      </Reveal>

      {/* Aucun résultat pour le filtre */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title={t("data.achievements.empty") || "Aucune réalisation dans cette catégorie"}
          description={t("data.achievements.emptyFilter") || "Essayez une autre catégorie."}
        />
      ) : (
        <Reveal duration={1.6} delay={0.6} distance={85}
          className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
          {filtered.map((item, index) => (
            <button key={item.id} onClick={() => setActiveVideo(item)}
              className={`group relative w-full h-48 md:h-60 rounded-xl overflow-hidden shadow-md border-0 cursor-pointer p-0 ${getGridClass(index, filtered.length)}`}>
              {item.thumbnail ? (
                <Image src={item.thumbnail} alt={item.title} fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
              ) : (
                <div className="absolute inset-0 bg-gray-200" />
              )}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 shadow-lg">
                  <PlayIcon size={26} className="text-primary ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left bg-linear-to-t from-black/70 to-transparent">
                {item.category && (
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">
                    {translateCategory(item.category)}
                  </p>
                )}
                <p className="text-white font-semibold text-sm drop-shadow-md">
                  {translateAchievementTitle(item)}
                </p>
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
            <p className="text-white text-center mt-4 font-medium">
              {translateAchievementTitle(activeVideo)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
