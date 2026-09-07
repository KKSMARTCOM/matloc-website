"use client";

import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminSeoPage() {
  const { fields, loading, status, handleChange, handleSave } = useAdminCms("seo");

  const nameField  = fields.filter((f) => f.key === "seo_site_name");
  const metaFields = fields.filter((f) => f.key !== "seo_site_name");

  return (
    <>
      <SaveBar title="SEO & Métadonnées" description="Informations indexées par les moteurs de recherche." status={status} onSave={handleSave} />
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Identité</p>
          <FieldList fields={nameField} loading={loading} onChange={handleChange} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Page d&apos;accueil</p>
          <FieldList fields={metaFields} loading={loading} onChange={handleChange} multilineKeys={["seo_home_description"]} />
        </div>
      </div>
    </>
  );
}
