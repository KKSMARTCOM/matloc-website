"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, Crown, ShieldCheck, User } from "lucide-react";
import SaveBar from "@/components/admin/SaveBar";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "collaborator";
  is_owner: boolean;
  created_at: string;
};

type FormState = { name: string; email: string; password: string; role: "admin" | "collaborator" };
const EMPTY: FormState = { name: "", email: "", password: "", role: "collaborator" };

export default function AdminUsersPage() {
  const [users,   setUsers]   = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [form,    setForm]    = useState<FormState>(EMPTY);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: "", name: "" });

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/users");
      const d = await r.json() as { users?: AdminUser[] };
      setUsers(d.users ?? []);
    } catch { /* silencieux */ } finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, []);

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) { setError("Tous les champs sont requis."); return; }
    setSaving(true); setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const d = await res.json() as { success?: boolean; error?: string };
      if (!res.ok) { setError(d.error ?? "Erreur."); return; }
      setModal(false); setForm(EMPTY); await load();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    await fetch("/api/admin/users", {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id: confirm.id }),
    });
    setConfirm({ open: false, id: "", name: "" });
    await load();
  };

  const roleIcon  = (u: AdminUser) =>
    u.is_owner  ? <Crown       size={16} className="text-yellow-500" /> :
    u.role === "admin" ? <ShieldCheck size={16} className="text-blue-500" /> :
    <User size={16} className="text-gray-600" />;

  const roleLabel = (u: AdminUser) =>
    u.is_owner ? "Propriétaire" : u.role === "admin" ? "Admin" : "Collaborateur";

  return (
    <>
      <SaveBar
        title="Utilisateurs"
        description="Gérez les accès à l'espace d'administration. Seul l'admin peut ajouter ou supprimer des comptes."
        status="idle"
        onSave={() => {}}
        extra={
          <button onClick={() => { setForm(EMPTY); setError(null); setModal(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1a2540] text-white text-sm font-semibold rounded-xl hover:bg-[#243357] transition-colors">
            <Plus size={15} /> Ajouter un utilisateur
          </button>
        }
      />

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-gray-500" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {users.length === 0 && (
            <p className="text-center text-sm text-gray-600 py-12">Aucun utilisateur.</p>
          )}
          {users.map((u, idx) => (
            <div key={u.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${idx > 0 ? "border-t border-gray-50" : ""}`}>
              <div className="w-10 h-10 rounded-xl bg-[#1a2540] flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">{u.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm text-gray-900">{u.name}</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    u.is_owner         ? "bg-yellow-50 text-yellow-700" :
                    u.role === "admin" ? "bg-blue-50 text-blue-700" :
                                        "bg-gray-100 text-gray-500"
                  }`}>
                    {roleIcon(u)} {roleLabel(u)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{u.email}</p>
              </div>
              <p className="text-sm text-gray-500 shrink-0 hidden sm:block">
                {new Date(u.created_at).toLocaleDateString("fr-FR")}
              </p>
              {!u.is_owner && (
                <button onClick={() => setConfirm({ open: true, id: u.id, name: u.name })}
                  className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal création */}
      <Modal open={modal} onClose={() => setModal(false)} title="Ajouter un utilisateur" size="sm">
        <div className="space-y-4">
          {[
            { key: "name",     label: "Nom complet *",   type: "text",     ph: "Jean Dupont" },
            { key: "email",    label: "Email *",          type: "email",    ph: "jean@matloc.bj" },
            { key: "password", label: "Mot de passe *",   type: "password", ph: "••••••••" },
          ].map(({ key, label, type, ph }) => (
            <label key={key} className="block">
              <span className="text-sm font-semibold text-gray-700">{label}</span>
              <input type={type} placeholder={ph} value={form[key as keyof FormState]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="mt-1.5 w-full px-4 py-3 text-base border border-gray-200 rounded-xl outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition" />
            </label>
          ))}

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Rôle</span>
            <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as FormState["role"] }))}
              className="mt-1.5 w-full px-4 py-3 text-base border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition bg-white">
              <option value="collaborator">Collaborateur — lecture/modification</option>
              <option value="admin">Admin — accès complet + gestion utilisateurs</option>
            </select>
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={() => setModal(false)} className="flex-1 px-4 py-3 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">Annuler</button>
            <button onClick={handleCreate} disabled={saving}
              className="flex-1 px-4 py-3 text-sm font-semibold bg-[#1a2540] text-white rounded-xl hover:bg-[#243357] disabled:opacity-60">
              {saving ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Créer le compte"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={confirm.open}
        title="Supprimer cet utilisateur ?"
        message={`Le compte de "${confirm.name}" sera supprimé définitivement. Cette action est irréversible.`}
        confirmLabel="Oui, supprimer"
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, id: "", name: "" })}
      />
    </>
  );
}
