"use client";

import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminHeroPage() {
  const { fields, loading, status, handleChange, handleSave } = useAdminCms("hero");

  const titleFields  = fields.filter((f) => !["hero_subtitle"].includes(f.key));
  const subtitleField = fields.filter((f) => f.key === "hero_subtitle");
  const btnFields    = fields.filter((f) => f.key.startsWith("hero_btn"));

  return (
    <>
      <SaveBar title="Hero — Accueil" description="Bandeau principal de la page d'accueil." status={status} onSave={handleSave} />

      <div className="space-y-6">
        {/* Titre + sous-titre */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Textes principaux</p>
          <FieldList fields={[...titleFields.filter(f => f.key === "hero_title"), ...subtitleField]}
            loading={loading} onChange={handleChange} multilineKeys={["hero_subtitle"]} />
        </div>

        {/* Boutons CTA */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Boutons d&apos;action</p>
          <FieldList fields={btnFields} loading={loading} onChange={handleChange} cols={2} />
        </div>
      </div>
    </>
  );
}
