"use client";

import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminHeroPage() {
  const { fields, loading, status, handleChange, handleSave } = useAdminCms("hero");

  const titleFields   = fields.filter((f) => f.key === "hero_title");
  const subtitleField = fields.filter((f) => f.key === "hero_subtitle");
  const btnFields     = fields.filter((f) => f.key.startsWith("hero_btn"));

  return (
    <>
      <SaveBar description="Bandeau principal de la page d'accueil." status={status} onSave={handleSave} />

      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-1">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-5">Textes principaux</p>
          <FieldList fields={[...titleFields, ...subtitleField]} loading={loading}
            onChange={handleChange} multilineKeys={["hero_subtitle"]} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-5">Boutons d&apos;action</p>
          <FieldList fields={btnFields} loading={loading} onChange={handleChange} cols={2} />
        </div>
      </div>
    </>
  );
}
