"use client";

import { useEffect, useState, useCallback } from "react";
import ImageField from "@/components/admin/ImageField";
import TabNav from "@/components/admin/TabNav";
import SaveBar, { type SaveStatus } from "@/components/admin/SaveBar";

type ImgKey = { key: string; label: string; hint?: string };

const GROUPS = [
  { tab: "home",  label: "Accueil", images: [
    { key:"img_hero_bg",    label:"Image de fond Hero",        hint:"Recommandé : 1920×1080px" },
    { key:"img_about_home", label:"Section Expertise BTP",     hint:"À côté des paragraphes" },
  ]},
  { tab: "pages", label: "Pages internes", images: [
    { key:"img_about_page",          label:"À propos — Photo principale",  hint:"Grande photo côté droit" },
    { key:"img_banner_apropos",      label:"À propos — Bannière hero" },
    { key:"img_banner_services",     label:"Services — Bannière hero",     hint:"1920×480px recommandé" },
    { key:"img_banner_realisations", label:"Réalisations — Bannière hero" },
    { key:"img_banner_contact",      label:"Contact — Bannière hero" },
  ]},
  { tab: "brand", label: "Identité", images: [
    { key:"img_logo",       label:"Logo principal",  hint:"Header — fond blanc" },
    { key:"img_logo_white", label:"Logo blanc",      hint:"Footer — fond sombre" },
  ]},
];

const TABS = GROUPS.map((g) => ({ key: g.tab, label: g.label }));

export default function AdminImagesPage() {
  const [tab,     setTab]     = useState("home");
  const [values,  setValues]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [status,  setStatus]  = useState<SaveStatus>("idle");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/cms/images");
      const d = await r.json() as { data?: Record<string, string> };
      if (d.data) setValues(d.data);
    } catch { /* silencieux */ } finally { setLoading(false); }
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
      <SaveBar
        title=""
        description="Upload ou URL externe pour chaque image du site."
        status={status}
        onSave={handleSave}
      />

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {loading ? (
        <div className="flex justify-center py-16 text-gray-600 gap-2">
          <span className="animate-spin">⟳</span> Chargement…
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {activeGroup.images.map(({ key, label, hint }: ImgKey) => (
            <div key={key} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
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
