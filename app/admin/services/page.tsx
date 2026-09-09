"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2, ToggleRight, ToggleLeft } from "lucide-react";
import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import TabNav from "@/components/admin/TabNav";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageField from "@/components/admin/ImageField";
import { useCrud } from "@/hooks/useCrud";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { DbService } from "@/lib/db";

const EMPTY: Omit<DbService, "id"> = { title: "", subtitle: "", description: "", points: [], image_url: "", href: "", sort_order: 0, is_published: true };
const TABS = [{ key: "texts", label: "Textes de la page" }, { key: "list", label: "Fiches services" }];

export default function AdminServicesPage() {
  const [tab, setTab] = useState("texts");
  const cms  = useAdminCms("services");
  const crud = useCrud<DbService>({ endpoint: "/api/admin/services" });

  const [modal,   setModal]   = useState<{ open: boolean; item: Partial<DbService> & { id?: string } }>({ open: false, item: { ...EMPTY } });
  const [confirm, setConfirm] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const [pointInput, setPointInput] = useState("");

  const setField   = (k: keyof DbService, v: unknown) => setModal((m) => ({ ...m, item: { ...m.item, [k]: v } }));
  const addPoint   = () => { if (!pointInput.trim()) return; setField("points", [...(modal.item.points ?? []), pointInput.trim()]); setPointInput(""); };
  const rmPoint    = (i: number) => setField("points", (modal.item.points ?? []).filter((_, idx) => idx !== i));
  const closeModal = () => { setModal({ open: false, item: { ...EMPTY } }); setPointInput(""); };

  return (
    <>
      <SaveBar title="Services" description="Textes de la page et gestion des fiches services."
        status={tab === "texts" ? cms.status : "idle"} onSave={cms.handleSave} />

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* ── Onglet Textes ── */}
      {tab === "texts" && (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-3">Accueil — section &ldquo;Un parc matériel de pointe&rdquo;</p>
            <FieldList fields={cms.fields.filter((f) => ["services_title","services_subtitle"].includes(f.key))}
              loading={cms.loading} onChange={cms.handleChange} multilineKeys={["services_subtitle"]} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-3">Page /services — Titre hero</p>
            <FieldList fields={cms.fields.filter((f) => f.key === "services_hero_title")}
              loading={cms.loading} onChange={cms.handleChange} />
          </div>
        </div>
      )}

      {/* ── Onglet Fiches ── */}
      {tab === "list" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setModal({ open: true, item: { ...EMPTY } })}
              className="flex items-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors">
              <Plus size={16} /> Ajouter un service
            </button>
          </div>
          {crud.loading ? <div className="flex justify-center py-12"><Loader2 size={22} className="animate-spin text-gray-600" /></div> : (
            <div className="grid grid-cols-1 gap-4">
              {crud.items.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-orange-200 hover:shadow-sm transition-all">
                  <div className="flex gap-4">
                    {s.image_url && (
                      <Image src={s.image_url} alt={s.title} width={80} height={60}
                        className="w-20 h-16 object-cover rounded-xl shrink-0" unoptimized />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base text-gray-900">{s.title}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{s.subtitle}</p>
                    </div>
                  </div>

                  {/* Points clés */}
                  {s.points.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-3">
                      {s.points.map((p, i) => (
                        <span key={i} className="text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium">{p}</span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${s.is_published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {s.is_published ? "Publié" : "Masqué"}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => crud.save({ ...s, is_published: !s.is_published })} title={s.is_published ? "Masquer" : "Publier"}>
                        {s.is_published ? <ToggleRight size={22} className="text-green-500" /> : <ToggleLeft size={22} className="text-gray-500" />}
                      </button>
                      <button onClick={() => setModal({ open: true, item: { ...s } })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                        <Pencil size={15} /> Modifier
                      </button>
                      <button onClick={() => setConfirm({ open: true, id: s.id })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={15} /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal open={modal.open} onClose={closeModal} title={modal.item.id ? "Modifier le service" : "Nouveau service"} size="lg">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([{ key:"title",label:"Titre *" },{ key:"subtitle",label:"Sous-titre" },{ key:"href",label:"Lien (href)" }] as { key:keyof DbService; label:string }[]).map(({ key, label }) => (
              <label key={key} className="block text-sm font-semibold text-gray-700">{label}
                <input type="text" value={(modal.item[key] as string) ?? ""} onChange={(e) => setField(key, e.target.value)}
                  className="mt-1.5 w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition" />
              </label>
            ))}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea rows={3} value={(modal.item.description as string) ?? ""} onChange={(e) => setField("description", e.target.value)}
                className="w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition resize-none" />
            </div>
          </div>

          <ImageField
            label="Image du service"
            value={(modal.item.image_url as string) ?? ""}
            onChange={(url) => setField("image_url", url)}
            hint="Affichée dans les cartes service"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Points clés</label>
            <div className="space-y-1.5 mb-2">
              {(modal.item.points ?? []).map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="flex-1 text-sm bg-gray-50 px-2.5 py-2 rounded-lg border border-gray-100">{p}</span>
                  <button onClick={() => rmPoint(i)} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={pointInput} onChange={(e) => setPointInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addPoint(); } }}
                placeholder="Ajouter un point…"
                className="flex-1 px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition" />
              <button onClick={addPoint} className="px-3 bg-orange-100 text-orange-600 rounded-xl text-sm font-semibold hover:bg-orange-200">+</button>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={modal.item.is_published ?? true} onChange={(e) => setField("is_published", e.target.checked)} className="w-4 h-4 accent-orange-500" />
            <span className="text-sm font-medium text-gray-700">Publié (visible sur le site)</span>
          </label>
        </div>
        <div className="flex gap-2 pt-4 mt-4 border-t border-gray-100">
          <button onClick={closeModal} className="flex-1 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50">Annuler</button>
          <button onClick={async () => { const ok = await crud.save(modal.item); if (ok) closeModal(); }} disabled={crud.saving}
            className="flex-1 px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-60">
            {crud.saving ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Enregistrer"}
          </button>
        </div>
      </Modal>
      <ConfirmDialog open={confirm.open}
        title="Supprimer ce service ?"
        message="Cette action est irréversible. Le service sera supprimé définitivement."
        confirmLabel="Oui, supprimer"
        onConfirm={async () => { await crud.remove(confirm.id); setConfirm({ open: false, id: "" }); }}
        onCancel={() => setConfirm({ open: false, id: "" })} />
    </>
  );
}
