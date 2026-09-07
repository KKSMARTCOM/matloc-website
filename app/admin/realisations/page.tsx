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
import VideoField from "@/components/admin/VideoField";
import { useCrud } from "@/hooks/useCrud";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { DbAchievement } from "@/lib/db";

const CATEGORIES = ["Infrastructures routières","Zones industrielles","Ports","Assainissement urbain"];
const EMPTY: Omit<DbAchievement,"id"> = { title:"", category:CATEGORIES[0], thumbnail:"", video_url:"", sort_order:0, is_published:true };
const TABS = [{ key:"texts", label:"Textes de la page" }, { key:"gallery", label:"Galerie" }];

export default function AdminRealisationsPage() {
  const [tab, setTab] = useState("texts");
  const cms  = useAdminCms("realisations");
  const crud = useCrud<DbAchievement>({ endpoint: "/api/admin/achievements" });
  const [modal,   setModal]   = useState<{ open: boolean; item: Partial<DbAchievement> & { id?: string } }>({ open: false, item: { ...EMPTY } });
  const [confirm, setConfirm] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const setField = (k: keyof DbAchievement, v: unknown) => setModal((m) => ({ ...m, item: { ...m.item, [k]: v } }));
  const close = () => setModal({ open: false, item: { ...EMPTY } });

  return (
    <>
      <SaveBar title="Réalisations" description="Textes de la page et galerie des réalisations."
        status={tab === "texts" ? cms.status : "idle"} onSave={cms.handleSave} />
      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* ── Textes ── */}
      {tab === "texts" && (
        <FieldList fields={cms.fields} loading={cms.loading} onChange={cms.handleChange}
          multilineKeys={["realisations_subtitle"]} cols={2} />
      )}

      {/* ── Galerie ── */}
      {tab === "gallery" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setModal({ open: true, item: { ...EMPTY } })}
              className="flex items-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors">
              <Plus size={14} /> Ajouter
            </button>
          </div>
          {crud.loading ? <div className="flex justify-center py-12"><Loader2 size={20} className="animate-spin text-gray-400" /></div> : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {crud.items.map((a) => (
                <div key={a.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-orange-200 transition-colors">
                  <div className="relative h-24 bg-gray-100">
                    {a.thumbnail && <Image src={a.thumbnail} alt={a.title} fill className="object-cover" unoptimized />}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-1.5 right-1.5 flex gap-1">
                      <button onClick={() => crud.save({ ...a, is_published: !a.is_published })} className="p-0.5 bg-white/90 rounded">
                        {a.is_published ? <ToggleRight size={14} className="text-green-500" /> : <ToggleLeft size={14} className="text-gray-400" />}
                      </button>
                      <button onClick={() => setModal({ open: true, item: { ...a } })} className="p-0.5 bg-white/90 rounded"><Pencil size={12} className="text-blue-500" /></button>
                      <button onClick={() => setConfirm({ open: true, id: a.id })} className="p-0.5 bg-white/90 rounded"><Trash2 size={12} className="text-red-500" /></button>
                    </div>
                  </div>
                  <div className="px-2.5 py-2">
                    <p className="text-xs font-semibold text-gray-800 truncate">{a.title}</p>
                    <span className="text-[10px] text-gray-400">{a.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal open={modal.open} onClose={close} title={modal.item.id ? "Modifier" : "Nouvelle réalisation"} size="md">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Titre *
            <input type="text" value={modal.item.title ?? ""} onChange={(e) => setField("title", e.target.value)}
              className="mt-1.5 w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition" />
          </label>
          <label className="block text-sm font-semibold text-gray-700">Catégorie
            <select value={modal.item.category ?? CATEGORIES[0]} onChange={(e) => setField("category", e.target.value)}
              className="mt-1.5 w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <ImageField
            label="Thumbnail (vignette)"
            value={modal.item.thumbnail ?? ""}
            onChange={(url) => setField("thumbnail", url)}
            hint="Image affichée dans la galerie"
          />
          <VideoField
            label="Vidéo"
            value={modal.item.video_url ?? ""}
            onChange={(url) => setField("video_url", url)}
            hint="MP4, WEBM ou URL Cloudinary"
          />
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
        title="Supprimer cette réalisation ?"
        message="Cette action est irréversible. La réalisation sera supprimée définitivement."
        confirmLabel="Oui, supprimer"
        onConfirm={async () => { await crud.remove(confirm.id); setConfirm({ open: false, id: "" }); }}
        onCancel={() => setConfirm({ open: false, id: "" })} />
    </>
  );
}
