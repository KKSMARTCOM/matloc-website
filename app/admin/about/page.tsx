"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import SaveBar from "@/components/admin/SaveBar";
import FieldList from "@/components/admin/FieldList";
import TabNav from "@/components/admin/TabNav";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageField from "@/components/admin/ImageField";
import { useCrud } from "@/hooks/useCrud";
import { useAdminCms } from "@/hooks/useAdminCms";
import type { DbMember, DbValue } from "@/lib/db";

const EMPTY_MEMBER: Omit<DbMember, "id"> = { name: "", role: "", image_url: "", sort_order: 0 };
const EMPTY_VALUE:  Omit<DbValue,  "id"> = { title: "", subtitle: "", sort_order: 0 };
const MULTILINE_HOME = ["about_intro", "about_fleet", "about_check1_sub", "about_check2_sub"];
const MULTILINE_PAGE = ["aboutpage_intro", "aboutpage_mission", "aboutpage_values_subtitle", "aboutpage_team_subtitle"];

const TABS = [
  { key: "home",    label: "Accueil — Expertise BTP" },
  { key: "page",    label: "Page À propos" },
  { key: "values",  label: "Valeurs fondamentales" },
  { key: "members", label: "Équipe" },
];

export default function AdminAboutPage() {
  const [tab, setTab] = useState("home");

  const homeText = useAdminCms("about");
  const pageText = useAdminCms("aboutpage");
  const members  = useCrud<DbMember>({ endpoint: "/api/admin/members" });
  const values   = useCrud<DbValue>({ endpoint: "/api/admin/values" });

  const [memberModal,  setMemberModal]  = useState<{ open: boolean; item: Partial<DbMember> & { id?: string } }>({ open: false, item: { ...EMPTY_MEMBER } });
  const [memberConfirm,setMemberConfirm] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const [valueModal,   setValueModal]   = useState<{ open: boolean; item: Partial<DbValue>  & { id?: string } }>({ open: false, item: { ...EMPTY_VALUE } });
  const [valueConfirm, setValueConfirm] = useState<{ open: boolean; id: string }>({ open: false, id: "" });

  const activeStatus = tab === "home" ? homeText.status : pageText.status;
  const activeSave   = tab === "home" ? homeText.handleSave : pageText.handleSave;

  const isTextTab = tab === "home" || tab === "page";

  return (
    <>
      <SaveBar
        title="À propos"
        description="Textes, valeurs fondamentales et membres de l'équipe."
        status={isTextTab ? activeStatus : "idle"}
        onSave={activeSave}
      />

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* ── Onglet Accueil ── */}
      {tab === "home" && (
        <FieldList fields={homeText.fields} loading={homeText.loading}
          onChange={homeText.handleChange} multilineKeys={MULTILINE_HOME} cols={2} />
      )}

      {/* ── Onglet Page À propos ── */}
      {tab === "page" && (
        <FieldList fields={pageText.fields} loading={pageText.loading}
          onChange={pageText.handleChange} multilineKeys={MULTILINE_PAGE} cols={2} />
      )}

      {/* ── Onglet Valeurs ── */}
      {tab === "values" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setValueModal({ open: true, item: { ...EMPTY_VALUE } })}
              className="flex items-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors">
              <Plus size={14} /> Ajouter une valeur
            </button>
          </div>
          {values.loading ? <div className="flex justify-center py-12"><Loader2 size={20} className="animate-spin text-gray-400" /></div> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              {values.items.map((v) => (
                <div key={v.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-orange-200 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900">{v.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{v.subtitle}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => setValueModal({ open: true, item: { ...v } })} className="p-1.5 rounded hover:bg-blue-50"><Pencil size={13} className="text-blue-500" /></button>
                      <button onClick={() => setValueConfirm({ open: true, id: v.id })} className="p-1.5 rounded hover:bg-red-50"><Trash2 size={13} className="text-red-500" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Onglet Équipe ── */}
      {tab === "members" && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={() => setMemberModal({ open: true, item: { ...EMPTY_MEMBER } })}
              className="flex items-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors">
              <Plus size={14} /> Ajouter un membre
            </button>
          </div>
          {members.loading ? <div className="flex justify-center py-12"><Loader2 size={20} className="animate-spin text-gray-400" /></div> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {members.items.map((m) => (
                <div key={m.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-3 hover:border-orange-200 transition-colors">
                  <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden bg-gray-100">
                    {m.image_url && <Image src={m.image_url} alt={m.name} fill className="object-cover" unoptimized />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{m.name}</p>
                    <p className="text-xs text-gray-500 truncate">{m.role}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => setMemberModal({ open: true, item: { ...m } })} className="p-1.5 rounded hover:bg-blue-50"><Pencil size={13} className="text-blue-500" /></button>
                    <button onClick={() => setMemberConfirm({ open: true, id: m.id })} className="p-1.5 rounded hover:bg-red-50"><Trash2 size={13} className="text-red-500" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals valeur */}
      <Modal open={valueModal.open} onClose={() => setValueModal({ open: false, item: { ...EMPTY_VALUE } })} title={valueModal.item.id ? "Modifier" : "Nouvelle valeur"} size="sm">
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-gray-600">Titre *
            <input type="text" value={valueModal.item.title ?? ""} onChange={(e) => setValueModal((m) => ({ ...m, item: { ...m.item, title: e.target.value } }))}
              className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition" />
          </label>
          <label className="block text-xs font-semibold text-gray-600">Description
            <textarea rows={3} value={valueModal.item.subtitle ?? ""} onChange={(e) => setValueModal((m) => ({ ...m, item: { ...m.item, subtitle: e.target.value } }))}
              className="mt-1 w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-orange-400 transition resize-none" />
          </label>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setValueModal({ open: false, item: { ...EMPTY_VALUE } })} className="flex-1 px-3 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50">Annuler</button>
            <button onClick={async () => { const ok = await values.save(valueModal.item); if (ok) setValueModal({ open: false, item: { ...EMPTY_VALUE } }); }} disabled={values.saving}
              className="flex-1 px-3 py-2 text-sm font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-60">
              {values.saving ? <Loader2 size={14} className="animate-spin mx-auto" /> : "Enregistrer"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={valueConfirm.open}
        title="Supprimer cette valeur ?"
        message="Cette action est irréversible. La valeur fondamentale sera supprimée définitivement."
        confirmLabel="Oui, supprimer"
        onConfirm={async () => { await values.remove(valueConfirm.id); setValueConfirm({ open: false, id: "" }); }}
        onCancel={() => setValueConfirm({ open: false, id: "" })} />

      {/* Modals membre */}
      <Modal open={memberModal.open} onClose={() => setMemberModal({ open: false, item: { ...EMPTY_MEMBER } })} title={memberModal.item.id ? "Modifier" : "Nouveau membre"} size="sm">
        <div className="space-y-4">
          {[{ k: "name", l: "Nom complet *" }, { k: "role", l: "Fonction" }].map(({ k, l }) => (
            <label key={k} className="block text-sm font-semibold text-gray-700">{l}
              <input type="text" value={(memberModal.item[k as keyof DbMember] as string) ?? ""} onChange={(e) => setMemberModal((m) => ({ ...m, item: { ...m.item, [k]: e.target.value } }))}
                className="mt-1.5 w-full px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition" />
            </label>
          ))}
          <ImageField
            label="Photo du membre"
            value={(memberModal.item.image_url as string) ?? ""}
            onChange={(url) => setMemberModal((m) => ({ ...m, item: { ...m.item, image_url: url } }))}
            hint="Photo portrait recommandée"
          />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setMemberModal({ open: false, item: { ...EMPTY_MEMBER } })} className="flex-1 px-3 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50">Annuler</button>
            <button onClick={async () => { const ok = await members.save(memberModal.item); if (ok) setMemberModal({ open: false, item: { ...EMPTY_MEMBER } }); }} disabled={members.saving}
              className="flex-1 px-3 py-2 text-sm font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-60">
              {members.saving ? <Loader2 size={14} className="animate-spin mx-auto" /> : "Enregistrer"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={memberConfirm.open}
        title="Supprimer ce membre ?"
        message="Cette action est irréversible. Le membre sera supprimé de l'équipe définitivement."
        confirmLabel="Oui, supprimer"
        onConfirm={async () => { await members.remove(memberConfirm.id); setMemberConfirm({ open: false, id: "" }); }}
        onCancel={() => setMemberConfirm({ open: false, id: "" })} />
    </>
  );
}
