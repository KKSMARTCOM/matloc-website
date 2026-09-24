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
      <SaveBar description="Informations indexées par les moteurs de recherche." status={status} onSave={handleSave} />
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-5">Identité du site</p>
          <FieldList fields={nameField} loading={loading} onChange={handleChange} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-5">Page d&apos;accueil</p>
          <FieldList fields={metaFields} loading={loading} onChange={handleChange} multilineKeys={["seo_home_description"]} />
        </div>
      </div>
    </>
  );
}
