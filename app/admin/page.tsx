"use client";

import { useEffect, useState } from "react";
import {
  FileText, Image as ImageLucide, LayoutGrid, Users,
  Wrench, FolderOpen, UserCog, Settings2,
  Clock, Loader2,
} from "lucide-react";
import DonutChart from "@/components/admin/DonutChart";

/* ── Types ── */
type Totals = {
  services: number; achievements: number; partners: number;
  members: number; users: number; settings: number;
};
type Activity = { type: string; label: string; updated_at: string };

/* ── Couleurs donut ── */
const DONUT_COLORS = ["#1a2540","#3b82f6","#10b981","#f97316","#8b5cf6","#ec4899"];

const TYPE_ICONS: Record<string, typeof Wrench> = {
  service:     Wrench,
  réalisation: FolderOpen,
  partenaire:  Users,
  membre:      UserCog,
  paramètre:   Settings2,
};

const TYPE_COLORS: Record<string, string> = {
  service:     "bg-blue-100 text-blue-600",
  réalisation: "bg-teal-100 text-teal-600",
  partenaire:  "bg-green-100 text-green-600",
  membre:      "bg-violet-100 text-violet-600",
  paramètre:   "bg-orange-100 text-orange-600",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m    = Math.floor(diff / 60000);
  if (m < 1)   return "À l'instant";
  if (m < 60)  return `Il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `Il y a ${h}h`;
  const d = Math.floor(h / 24);
  return `Il y a ${d}j`;
}

/* ── Stat cards config ── */
const STAT_CONFIG = [
  { key: "services",     label: "Services",     icon: Wrench,       bg: "bg-blue-50",   text: "text-blue-600",   color: "#3b82f6" },
  { key: "achievements", label: "Réalisations", icon: FolderOpen,   bg: "bg-teal-50",   text: "text-teal-600",   color: "#10b981" },
  { key: "partners",     label: "Partenaires",  icon: ImageLucide,  bg: "bg-green-50",  text: "text-green-600",  color: "#22c55e" },
  { key: "members",      label: "Équipe",       icon: Users,        bg: "bg-violet-50", text: "text-violet-600", color: "#8b5cf6" },
  { key: "settings",     label: "Paramètres",   icon: Settings2,    bg: "bg-orange-50", text: "text-orange-600", color: "#f97316" },
  { key: "users",        label: "Utilisateurs", icon: UserCog,      bg: "bg-slate-50",  text: "text-slate-600",  color: "#64748b" },
];

export default function AdminDashboard() {
  const [totals,   setTotals]   = useState<Totals | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { totals?: Totals; recent?: Activity[] } | null) => {
        if (d?.totals)  setTotals(d.totals);
        if (d?.recent)  setActivity(d.recent);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  /* Slices donut */
  const donutSlices = STAT_CONFIG.slice(0, 5).map((s, i) => ({
    label: s.label,
    value: totals ? (totals[s.key as keyof Totals] as number) : 1,
    color: DONUT_COLORS[i] ?? "#ccc",
  }));

  return (
    <div className="space-y-6">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
        {STAT_CONFIG.map(({ key, label, icon: Icon, bg, text }) => (
          <div key={key} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${bg}`}>
              <Icon size={16} className={text} />
            </div>
            {loading ? (
              <div className="h-7 w-8 bg-gray-100 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-2xl font-extrabold text-gray-900">
                {totals ? totals[key as keyof Totals] : "—"}
              </p>
            )}
            <p className="text-xs text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Ligne principale : Activités + Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Activités récentes — 3/5 */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Activités récentes</h2>
              <p className="text-xs text-gray-600 mt-0.5">Dernières modifications du contenu</p>
            </div>
            <Clock size={15} className="text-gray-500" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-gray-500">
              <Loader2 size={18} className="animate-spin" /> Chargement…
            </div>
          ) : activity.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-12">Aucune activité pour le moment.</p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {activity.map((a, i) => {
                const Icon = TYPE_ICONS[a.type] ?? FileText;
                const cls  = TYPE_COLORS[a.type] ?? "bg-gray-100 text-gray-500";
                return (
                  <li key={i} className="flex items-center gap-3.5 px-6 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cls}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{a.label}</p>
                      <p className="text-xs text-gray-600 capitalize">{a.type}</p>
                    </div>
                    <span className="text-xs text-gray-500 shrink-0 whitespace-nowrap">{timeAgo(a.updated_at)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Donut chart — 2/5 */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-gray-900">Statistiques du contenu</h2>
            <p className="text-xs text-gray-600 mt-0.5">Répartition par type</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10 text-gray-500">
              <Loader2 size={18} className="animate-spin" />
            </div>
          ) : (
            <>
              {/* Donut centré */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <DonutChart slices={donutSlices} size={160} thickness={30} />
                  {/* Texte central */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-extrabold text-gray-900">
                      {totals
                        ? totals.services + totals.achievements + totals.partners + totals.members
                        : "—"}
                    </p>
                    <p className="text-[10px] text-gray-600">éléments</p>
                  </div>
                </div>
              </div>

              {/* Légende */}
              <div className="space-y-2.5">
                {STAT_CONFIG.slice(0, 5).map(({ label, key, color }) => {
                  const total = totals
                    ? STAT_CONFIG.slice(0, 5).reduce((s, c) => s + (totals[c.key as keyof Totals] as number), 0)
                    : 1;
                  const val  = totals ? (totals[key as keyof Totals] as number) : 0;
                  const pct  = total > 0 ? Math.round((val / total) * 100) : 0;
                  return (
                    <div key={key} className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="flex-1 text-xs text-gray-600">{label}</span>
                      <span className="text-xs font-semibold text-gray-800">{val}</span>
                      <span className="text-[10px] text-gray-500 w-8 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        MATLOC CMS — Les modifications sont visibles immédiatement sur le site.
      </p>
    </div>
  );
}
