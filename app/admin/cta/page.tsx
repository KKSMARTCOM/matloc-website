"use client";

import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import { useAdminCms } from "@/hooks/useAdminCms";

export default function AdminCtaPage() {
  const { fields, loading, status, handleChange, handleSave } = useAdminCms("cta");

  const textFields = fields.filter((f) => ["cta_title","cta_subtitle"].includes(f.key));
  const btnFields  = fields.filter((f) => f.key.startsWith("cta_btn"));

  return (
    <>
      <SaveBar title="Bannière CTA" description="Appel à l'action affiché en bas des pages." status={status} onSave={handleSave} />
      <div className="space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Textes</p>
          <FieldList fields={textFields} loading={loading} onChange={handleChange} multilineKeys={["cta_title","cta_subtitle"]} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Boutons</p>
          <FieldList fields={btnFields} loading={loading} onChange={handleChange} cols={2} />
        </div>
      </div>
    </>
  );
}
