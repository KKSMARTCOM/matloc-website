"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2, ToggleLeft, ToggleRight } from "lucide-react";
import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import TabNav from "@/components/admin/TabNav";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageField from "@/components/admin/ImageField";
import { useCrud } from "@/hooks/useCrud";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { DbPartner } from "@/lib/db";

const EMPTY: Omit<DbPartner,"id"> = { name:"", logo_url:"", website_url:"", sort_order:0, is_published:true };
const TABS = [{ key:"texts", label:"Textes de la section" }, { key:"logos", label:"Logos partenaires" }];

export default function AdminPartenairesPage() {
  const [tab, setTab] = useState("texts");
  const cms  = useAdminCms("partners");
  const crud = useCrud<DbPartner>({ endpoint: "/api/admin/partners" });
  const [modal,   setModal]   = useState<{ open: boolean; item: Partial<DbPartner> & { id?: string } }>({ open: false, item: { ...EMPTY } });
  const [confirm, setConfirm] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const setField = (k: keyof DbPartner, v: unknown) => setModal((m) => ({ ...m, item: { ...m.item, [k]: v } }));
  const close = () => setModal({ open: false, item: { ...EMPTY } });

  return (
    <>
      <SaveBar title="Partenaires" description="Textes et logos des partenaires."
        status={tab === "texts" ? cms.status : "idle"} onSave={cms.handleSave} />
      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {tab === "texts" && (
        <FieldList fields={cms.fields} loading={cms.loading} onChange={cms.handleChange}
          multilineKeys={["partners_subtitle"]} cols={2} />
      )}

      {tab === "logos" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setModal({ open: true, item: { ...EMPTY } })}
              className="flex items-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors">
              <Plus size={14} /> Ajouter un partenaire
            </button>
          </div>
          {crud.loading ? <div className="flex justify-center py-12"><Loader2 size={20} className="animate-spin text-gray-400" /></div> : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {crud.items.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-orange-200 transition-colors">
                  <div className="relative h-16 bg-gray-50 flex items-center justify-center">
                    {p.logo_url
                      ? <Image src={p.logo_url} alt={p.name} fill className="object-contain p-2" unoptimized sizes="120px" />
                      : <span className="text-xl font-bold text-gray-200">{p.name.slice(0,2).toUpperCase()}</span>}
                  </div>
                  <div className="px-2.5 py-2 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 truncate">{p.name}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <button onClick={() => crud.save({ ...p, is_published: !p.is_published })}>
                        {p.is_published ? <ToggleRight size={14} className="text-green-500" /> : <ToggleLeft size={14} className="text-gray-400" />}
                      </button>
                      <button onClick={() => setModal({ open: true, item: { ...p } })} className="p-0.5 hover:bg-blue-50 rounded"><Pencil size={12} className="text-blue-500" /></button>
                      <button onClick={() => setConfirm({ open: true, id: p.id })} className="p-0.5 hover:bg-red-50 rounded"><Trash2 size={12} className="text-red-500" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal open={modal.open} onClose={close} title={modal.item.id ? "Modifier" : "Nouveau partenaire"} size="sm">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Nom *
            <input type="text" value={(modal.item.name as string) ?? ""} onChange={(e) => setField("name", e.target.value)}
              className="mt-1.5 w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition" />
          </label>
          <ImageField
            label="Logo du partenaire"
            value={(modal.item.logo_url as string) ?? ""}
            onChange={(url) => setField("logo_url", url)}
            hint="Fond transparent recommandé (PNG)"
          />
          <label className="block text-sm font-semibold text-gray-700">Site web (URL)
            <input type="url" value={(modal.item.website_url as string) ?? ""} onChange={(e) => setField("website_url", e.target.value)}
              className="mt-1.5 w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition font-mono" />
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={modal.item.is_published ?? true} onChange={(e) => setField("is_published", e.target.checked)} className="w-4 h-4 accent-orange-500" />
            <span className="text-sm font-medium text-gray-700">Publié</span>
          </label>
        </div>
        <div className="flex gap-2 pt-4 mt-3 border-t border-gray-100">
          <button onClick={close} className="flex-1 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50">Annuler</button>
          <button onClick={async () => { const ok = await crud.save(modal.item); if (ok) close(); }} disabled={crud.saving}
            className="flex-1 px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-60">
            {crud.saving ? <Loader2 size={14} className="animate-spin mx-auto" /> : "Enregistrer"}
          </button>
        </div>
      </Modal>
      <ConfirmDialog open={confirm.open}
        title="Supprimer ce partenaire ?"
        message="Cette action est irréversible. Le partenaire sera supprimé définitivement."
        confirmLabel="Oui, supprimer"
        onConfirm={async () => { await crud.remove(confirm.id); setConfirm({ open: false, id: "" }); }}
        onCancel={() => setConfirm({ open: false, id: "" })} />
    </>
  );
}
