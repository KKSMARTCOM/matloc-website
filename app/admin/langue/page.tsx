"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Save, Loader2, CheckCircle, AlertCircle, Languages,
  Globe, Home, Info, Wrench, Film, Phone, LayoutGrid,
  RefreshCw,
} from "lucide-react";
import type { SaveStatus } from "@/components/admin/SaveBar";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type TransRow = { key: string; value: string };

/* ─────────────────────────────────────────────
   Définition des onglets et de leurs préfixes
───────────────────────────────────────────── */
interface PageTab {
  key: string;
  label: string;
  icon: React.ElementType;
  /** Sections dans l'onglet : { titre affiché, préfixes i18n inclus } */
  sections: { title: string; prefixes: string[] }[];
}

const PAGE_TABS: PageTab[] = [
  {
    key: "global",
    label: "Global",
    icon: Globe,
    sections: [
      { title: "Navigation",       prefixes: ["nav."] },
      { title: "Actions / Boutons",prefixes: ["actions.", "service."] },
      { title: "Appel à l'action", prefixes: ["cta."] },
      { title: "Pied de page",     prefixes: ["footer."] },
      { title: "Commun",           prefixes: ["common."] },
      { title: "Formulaires",      prefixes: ["forms."] },
    ],
  },
  {
    key: "accueil",
    label: "Accueil",
    icon: Home,
    sections: [
      { title: "Textes de la page Accueil", prefixes: ["home.", "pages."] },
    ],
  },
  {
    key: "apropos",
    label: "À propos",
    icon: Info,
    sections: [
      { title: "Textes À propos",           prefixes: ["about."] },
      { title: "Valeur — Fiabilité",         prefixes: ["data.values.reliability."] },
      { title: "Valeur — Innovation",        prefixes: ["data.values.innovation."] },
      { title: "Valeur — Sécurité",          prefixes: ["data.values.safety."] },
      { title: "Valeur — Professionnalisme", prefixes: ["data.values.professionalism."] },
    ],
  },
  {
    key: "services",
    label: "Services",
    icon: Wrench,
    sections: [
      { title: "Service — Échafaudages",   prefixes: ["data.services.echafaudages."] },
      { title: "Service — Transport",      prefixes: ["data.services.transport."] },
      { title: "Service — Engins BTP",     prefixes: ["data.services.engins."] },
      { title: "Service — Services associés", prefixes: ["data.services.associes."] },
    ],
  },
  {
    key: "realisations",
    label: "Réalisations",
    icon: Film,
    sections: [
      { title: "Catégories & labels",    prefixes: ["data.achievements.all", "data.achievements.aggregates", "data.achievements.vessel", "data.achievements.height", "data.achievements.sanitation", "data.achievements.earthworks", "data.achievements.empty"] },
      { title: "Titres des réalisations", prefixes: [
          "data.achievements.scaffoldingMadone",
          "data.achievements.aggregatesSedegbe",
          "data.achievements.portExtension",
          "data.achievements.aggregatesSedegbeSecond",
          "data.achievements.aggregatesSedegbeThird",
          "data.achievements.aggregatesSedegbeFourth",
          "data.achievements.scaffoldingMadoneSite",
          "data.achievements.nacelleSofitel",
          "data.achievements.nacelleSofitelSecond",
          "data.achievements.sanitationAkpakpa",
          "data.achievements.sanitationAkpakpaSecond",
          "data.achievements.earthworksGrandPopo",
        ]},
    ],
  },
  {
    key: "contact",
    label: "Contact",
    icon: Phone,
    sections: [
      { title: "Formulaire de contact", prefixes: ["forms."] },
      { title: "Labels de la page",     prefixes: ["pages.contact", "pages.coordinates", "pages.hours", "pages.weekdays", "pages.hoursValue"] },
    ],
  },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function rowMatchesSection(key: string, prefixes: string[]): boolean {
  return prefixes.some((p) =>
    p.endsWith(".")
      ? key.startsWith(p)
      : key === p
  );
}

function labelFor(key: string): string {
  const parts = key.split(".");
  // Afficher les 2 derniers segments pour les clés profondes
  if (parts.length > 2) return parts.slice(-2).join(".");
  return parts[parts.length - 1];
}

function isLong(value: string): boolean {
  return value.length > 80;
}

/** Retourne le label lisible d'une section pour affichage dans le tableau */
function sectionRows(rows: TransRow[], prefixes: string[]): TransRow[] {
  return rows.filter((r) => rowMatchesSection(r.key, prefixes));
}

/* ─────────────────────────────────────────────
   Composant principal
───────────────────────────────────────────── */
export default function AdminLanguePage() {
  const [frRows,    setFrRows]    = useState<TransRow[]>([]);
  const [enRows,    setEnRows]    = useState<TransRow[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [populating,setPopulating]= useState(false);
  const [status,    setStatus]    = useState<SaveStatus>("idle");
  const [activeTab, setActiveTab] = useState(PAGE_TABS[0].key);

  /* ── Chargement ── */
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [rFr, rEn] = await Promise.all([
        fetch("/api/cms/translations?lang=fr").then((r) => r.json()) as Promise<{ rows: TransRow[] }>,
        fetch("/api/cms/translations?lang=en").then((r) => r.json()) as Promise<{ rows: TransRow[] }>,
      ]);
      setFrRows(rFr.rows ?? []);
      setEnRows(rEn.rows ?? []);
    } catch { /* silencieux */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  /* ── Pré-remplir depuis i18n.ts si la DB est vide ── */
  const handlePopulate = async () => {
    setPopulating(true);
    try {
      await fetch("/api/cms/translations/populate", { method: "POST" });
      await load();
    } finally { setPopulating(false); }
  };

  /* ── Mise à jour locale ── */
  const updateRow = (lang: "fr" | "en", key: string, value: string) => {
    if (lang === "fr") setFrRows((prev) => prev.map((r) => r.key === key ? { ...r, value } : r));
    else               setEnRows((prev) => prev.map((r) => r.key === key ? { ...r, value } : r));
  };

  /* ── Sauvegarde ── */
  const handleSave = async () => {
    setStatus("saving");
    try {
      const [rFr, rEn] = await Promise.all([
        fetch("/api/cms/translations", {
          method: "PATCH", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lang: "fr", updates: frRows }),
        }),
        fetch("/api/cms/translations", {
          method: "PATCH", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lang: "en", updates: enRows }),
        }),
      ]);
      setStatus(rFr.ok && rEn.ok ? "saved" : "error");
      if (rFr.ok && rEn.ok) setTimeout(() => setStatus("idle"), 2500);
    } catch { setStatus("error"); }
  };

  /* ── Styles bouton sauvegarde ── */
  const btnStyle =
    status === "saved"  ? "bg-emerald-500 hover:bg-emerald-600" :
    status === "error"  ? "bg-red-500 hover:bg-red-600" :
    "bg-[#1a2540] hover:bg-[#243357]";

  const currentTab = PAGE_TABS.find((t) => t.key === activeTab) ?? PAGE_TABS[0];

  /* ── Vérifier si la DB est vide ── */
  const isEmpty = !loading && frRows.length === 0;

  /* ── Style input/textarea commun ── */
  const inputCls = "w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#1a2540] focus:ring-2 focus:ring-[#1a2540]/10 transition resize-none";

  return (
    <>
      {/* ── En-tête ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1a2540]/10 flex items-center justify-center shrink-0">
            <Languages size={22} className="text-[#1a2540]" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">Traductions FR / EN</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Éditez les textes de chaque page côte à côte — <span className="font-semibold text-gray-700">Français</span> et <span className="font-semibold text-gray-700">Anglais</span>.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Bouton pré-remplir */}
          <button
            onClick={handlePopulate}
            disabled={populating || loading}
            title="Importer les textes par défaut depuis i18n.ts"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
          >
            {populating ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
            Importer défauts
          </button>
          {/* Bouton sauvegarder */}
          <button
            onClick={handleSave}
            disabled={status === "saving" || loading}
            className={`flex items-center gap-2 px-6 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 ${btnStyle}`}
          >
            {status === "saving"  ? <Loader2     size={16} className="animate-spin" />
             : status === "saved" ? <CheckCircle size={16} />
             : status === "error" ? <AlertCircle size={16} />
             : <Save size={16} />}
            {status === "saving" ? "Enregistrement…"
             : status === "saved" ? "Enregistré !"
             : status === "error" ? "Erreur"
             : "Enregistrer tout"}
          </button>
        </div>
      </div>

      {/* ── Onglets pages ── */}
      <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1.5 rounded-2xl mb-8 w-fit max-w-full">
        {PAGE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Contenu ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-500">
          <Loader2 size={22} className="animate-spin" />
          <span>Chargement des traductions…</span>
        </div>
      ) : isEmpty ? (
        /* ── DB vide : inviter à importer ── */
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
            <LayoutGrid size={28} className="text-gray-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">Aucune traduction en base</p>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              Cliquez sur <strong>Importer défauts</strong> pour pré-remplir toutes les clés depuis les textes statiques.
            </p>
          </div>
          <button
            onClick={handlePopulate}
            disabled={populating}
            className="flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold bg-[#1a2540] hover:bg-[#243357] rounded-xl transition"
          >
            {populating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Importer les textes par défaut
          </button>
        </div>
      ) : (
        /* ── Sections de l'onglet actif ── */
        <div className="flex flex-col gap-8">
          {currentTab.sections.map((section) => {
            const visibleFr = sectionRows(frRows, section.prefixes);
            if (visibleFr.length === 0) return null;
            return (
              <div key={section.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* En-tête section */}
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1a2540]/50" />
                  <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                    {section.title}
                  </h2>
                  <span className="ml-auto text-xs text-gray-400 font-mono">{visibleFr.length} clé{visibleFr.length > 1 ? "s" : ""}</span>
                </div>

                {/* En-tête colonnes */}
                <div className="grid grid-cols-[180px_1fr_1fr] gap-4 px-6 py-3 border-b border-gray-50 bg-gray-50/50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Clé</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    🇫🇷 Français
                  </p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    🇬🇧 Anglais
                  </p>
                </div>

                {/* Lignes */}
                <div className="divide-y divide-gray-50">
                  {visibleFr.map((fr) => {
                    const en         = enRows.find((r) => r.key === fr.key);
                    const multiline  = isLong(fr.value) || isLong(en?.value ?? "");
                    const rows       = multiline ? 3 : 1;
                    return (
                      <div
                        key={fr.key}
                        className="grid grid-cols-[180px_1fr_1fr] gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors items-start"
                      >
                        {/* Clé */}
                        <div className="flex items-start pt-1.5">
                          <code className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-mono break-all leading-relaxed max-w-full">
                            {labelFor(fr.key)}
                          </code>
                        </div>

                        {/* FR */}
                        <textarea
                          rows={rows}
                          value={fr.value}
                          onChange={(e) => updateRow("fr", fr.key, e.target.value)}
                          className={inputCls}
                          style={{ minHeight: multiline ? "80px" : "40px" }}
                        />

                        {/* EN */}
                        <textarea
                          rows={rows}
                          value={en?.value ?? ""}
                          placeholder="Traduction anglaise…"
                          onChange={(e) => updateRow("en", fr.key, e.target.value)}
                          className={`${inputCls} placeholder:text-gray-300`}
                          style={{ minHeight: multiline ? "80px" : "40px" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
