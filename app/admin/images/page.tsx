"use client";

import { useEffect, useState, useCallback } from "react";
import { Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import ImageField from "@/components/admin/ImageField";
import TabNav from "@/components/admin/TabNav";
import type { SaveStatus } from "@/components/admin/SaveBar";

type ImgKey = { key: string; label: string; hint?: string };

const GROUPS = [
  {
    tab: "home", label: "Accueil",
    images: [
      { key:"img_hero_bg",    label:"Image de fond Hero",          hint:"Recommandé : 1920×1080px" },
      { key:"img_about_home", label:"Section Expertise BTP",       hint:"À côté des paragraphes" },
    ],
  },
  {
    tab: "pages", label: "Pages internes",
    images: [
      { key:"img_about_page",          label:"À propos — Photo principale",    hint:"Grande photo côté droit" },
      { key:"img_banner_apropos",      label:"À propos — Bannière hero" },
      { key:"img_banner_services",     label:"Services — Bannière hero",       hint:"1920×480px recommandé" },
      { key:"img_banner_realisations", label:"Réalisations — Bannière hero" },
      { key:"img_banner_contact",      label:"Contact — Bannière hero" },
    ],
  },
  {
    tab: "brand", label: "Identité",
    images: [
      { key:"img_logo",       label:"Logo principal",  hint:"Header — fond blanc" },
      { key:"img_logo_white", label:"Logo blanc",      hint:"Footer — fond sombre" },
    ],
  },
];

const TABS = GROUPS.map((g) => ({ key: g.tab, label: g.label }));

export default function AdminImagesPage() {
  const [tab, setTab] = useState("home");
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus]   = useState<SaveStatus>("idle");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/cms/images");
      const d = await r.json() as { data?: Record<string, string> };
      if (d.data) setValues(d.data);
    } catch { /**/ } finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const handleSave = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/cms/images", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setStatus("idle"), 2500);
    } catch { setStatus("error"); }
  };

  const activeGroup = GROUPS.find((g) => g.tab === tab)!;

  return (
    <>
      {/* SaveBar */}
      <div className="sticky top-0 z-10 -mx-6 px-6 py-4 bg-[#f5f6fa]/95 backdrop-blur-sm border-b border-gray-200 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Images du site</h1>
          <p className="text-xs text-gray-500 mt-0.5">Upload ou URL externe — modifications enregistrées globalement.</p>
        </div>
        <button onClick={handleSave} disabled={status === "saving"}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors">
          {status === "saving"  ? <Loader2     size={14} className="animate-spin" />
           : status === "saved" ? <CheckCircle size={14} />
           : status === "error" ? <AlertCircle size={14} />
           : <Save size={14} />}
          {status === "saving" ? "Enregistrement…" : status === "saved" ? "Enregistré !" : status === "error" ? "Erreur" : "Enregistrer"}
        </button>
      </div>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {loading ? (
        <div className="flex justify-center py-16 text-gray-400"><Loader2 size={20} className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeGroup.images.map(({ key, label, hint }: ImgKey) => (
            <div key={key} className="bg-white rounded-xl border border-gray-200 p-4">
              <ImageField
                label={label}
                value={values[key] ?? ""}
                onChange={(url) => setValues((prev) => ({ ...prev, [key]: url }))}
                hint={hint}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
