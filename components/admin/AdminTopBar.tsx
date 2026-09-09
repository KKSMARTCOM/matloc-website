"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, ExternalLink, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { JwtPayload } from "@/lib/auth";

const PAGE_TITLES: Record<string, string> = {
  "/admin":              "Tableau de bord",
  "/admin/hero":         "Hero accueil",
  "/admin/about":        "À propos",
  "/admin/services":     "Services",
  "/admin/realisations": "Réalisations",
  "/admin/partenaires":  "Partenaires",
  "/admin/cta":          "Bannière CTA",
  "/admin/contact":      "Contact",
  "/admin/footer":       "Footer",
  "/admin/images":       "Images",
  "/admin/seo":          "SEO",
  "/admin/users":        "Utilisateurs",
};

const SEARCH_ITEMS = [
  { href: "/admin",              label: "Tableau de bord",   desc: "Vue d'ensemble et statistiques" },
  { href: "/admin/hero",         label: "Hero accueil",      desc: "Titre, sous-titre, boutons du bandeau" },
  { href: "/admin/about",        label: "À propos",          desc: "Textes, équipe, valeurs fondamentales" },
  { href: "/admin/services",     label: "Services",          desc: "Fiches services, titres et images" },
  { href: "/admin/realisations", label: "Réalisations",      desc: "Galerie vidéo, catégories, thumbnails" },
  { href: "/admin/partenaires",  label: "Partenaires",       desc: "Logos et liens partenaires" },
  { href: "/admin/cta",          label: "Bannière CTA",      desc: "Appel à l'action, boutons" },
  { href: "/admin/contact",      label: "Contact",           desc: "Adresse, téléphone, email, horaires" },
  { href: "/admin/footer",       label: "Footer",            desc: "Description, réseaux sociaux" },
  { href: "/admin/images",       label: "Images",            desc: "Images hero, bannières, logos" },
  { href: "/admin/seo",          label: "SEO",               desc: "Titre et description pour Google" },
  { href: "/admin/users",        label: "Utilisateurs",      desc: "Comptes administrateurs et collaborateurs" },
];

interface Props {
  session: Pick<JwtPayload, "role" | "name" | "isOwner"> | null;
  pathname: string;
}

export default function AdminTopBar({ session, pathname }: Props) {
  const router   = useRouter();
  const title    = PAGE_TITLES[pathname] ?? "Administration";
  const today    = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todayStr = today.charAt(0).toUpperCase() + today.slice(1);

  const [searchOpen,  setSearchOpen]  = useState(false);
  const [query,       setQuery]       = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS;

  /* Ouvrir la recherche */
  const openSearch = () => { setSearchOpen(true); setQuery(""); setHighlighted(0); };
  const closeSearch = () => { setSearchOpen(false); setQuery(""); };

  /* Focus automatique */
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  /* Fermer avec Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
      if (!searchOpen) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((h) => Math.min(h + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setHighlighted((h) => Math.max(h - 1, 0)); }
      if (e.key === "Enter" && filtered[highlighted]) { router.push(filtered[highlighted].href); closeSearch(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen, filtered, highlighted, router]);

  /* Raccourci Ctrl+K */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openSearch(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="shrink-0 bg-white border-b border-gray-100 px-7 lg:px-9 py-5 flex items-center justify-between gap-4">
        {/* Titre + date */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600 mt-0.5">{todayStr}</p>
        </div>

        {/* Actions droite */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Barre de recherche */}
          <button
            onClick={openSearch}
            className="flex items-center gap-3 pl-4 pr-3 h-10 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors min-w-[200px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Search size={16} />
              <span className="text-sm">Rechercher…</span>
            </div>
            <span className="text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded font-mono">Ctrl K</span>
          </button>

          <button className="relative w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full" />
          </button>

          <Link href="/" target="_blank"
            className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <ExternalLink size={16} />
          </Link>

          <div className="h-8 w-px bg-gray-200" />

          {session && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1a2540] flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">{session.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[15px] font-semibold text-gray-900 leading-tight">{session.name}</p>
                <p className="text-sm text-gray-600 capitalize">{session.isOwner ? "Propriétaire" : session.role}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Modal de recherche ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeSearch} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <Search size={20} className="text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setHighlighted(0); }}
                placeholder="Rechercher une section…"
                className="flex-1 text-base text-gray-900 outline-none placeholder-gray-400 bg-transparent"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              )}
              <kbd className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded font-mono">Esc</kbd>
            </div>

            {/* Résultats */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-8">Aucun résultat pour &ldquo;{query}&rdquo;</p>
              ) : (
                filtered.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSearch}
                    onMouseEnter={() => setHighlighted(i)}
                    className={`flex items-center gap-4 px-5 py-3 transition-colors ${
                      i === highlighted ? "bg-[#1a2540] text-white" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
                      i === highlighted ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.label.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${i === highlighted ? "text-white" : "text-gray-900"}`}>
                        {item.label}
                      </p>
                      <p className={`text-xs truncate ${i === highlighted ? "text-white/70" : "text-gray-500"}`}>
                        {item.desc}
                      </p>
                    </div>
                    <span className={`text-xs font-mono shrink-0 ${i === highlighted ? "text-white/50" : "text-gray-400"}`}>
                      ↵
                    </span>
                  </Link>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
              <span><kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">↑↓</kbd> Naviguer</span>
              <span><kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">↵</kbd> Ouvrir</span>
              <span><kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">Esc</kbd> Fermer</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
