"use client";

import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import TabNav from "@/components/admin/TabNav";
import { useAdminCms } from "@/hooks/useAdminCms";
import { useState } from "react";

const HOURS_KEYS = ["contact_hours_title","contact_weekdays","contact_hours_value"];
const TABS = [{ key:"coords", label:"Coordonnées" }, { key:"hours", label:"Horaires & Maps" }];

export default function AdminContactPage() {
  const [tab, setTab] = useState("coords");
  const { fields, loading, status, handleChange, handleSave } = useAdminCms("contact");

  const coordFields  = fields.filter((f) => !HOURS_KEYS.includes(f.key));
  const hoursFields  = fields.filter((f) =>  HOURS_KEYS.includes(f.key));

  return (
    <>
      <SaveBar title="Contact" description="Coordonnées, horaires et Google Maps de la page contact." status={status} onSave={handleSave} />
      <TabNav tabs={TABS} active={tab} onChange={setTab} />
      {tab === "coords" && <FieldList fields={coordFields} loading={loading} onChange={handleChange} cols={2} />}
      {tab === "hours"  && <FieldList fields={hoursFields} loading={loading} onChange={handleChange} cols={2} />}
    </>
  );
}
