"use client";

import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import TabNav from "@/components/admin/TabNav";
import { useAdminCms } from "@/hooks/useAdminCms";
import { useState } from "react";

const URL_KEYS = ["footer_whatsapp","footer_facebook","footer_instagram","footer_linkedin","footer_tiktok"];
const TABS = [{ key:"info", label:"Informations" }, { key:"social", label:"Réseaux sociaux" }];

export default function AdminFooterPage() {
  const [tab, setTab] = useState("info");
  const { fields, loading, status, handleChange, handleSave } = useAdminCms("footer");

  const infoFields   = fields.filter((f) => !URL_KEYS.includes(f.key));
  const socialFields = fields.filter((f) =>  URL_KEYS.includes(f.key));

  return (
    <>
      <SaveBar title="Footer" description="Pied de page : informations et réseaux sociaux." status={status} onSave={handleSave} />
      <TabNav tabs={TABS} active={tab} onChange={setTab} />
      {tab === "info"   && <FieldList fields={infoFields}   loading={loading} onChange={handleChange} multilineKeys={["footer_description"]} cols={2} />}
      {tab === "social" && <FieldList fields={socialFields} loading={loading} onChange={handleChange} urlKeys={URL_KEYS} />}
    </>
  );
}
