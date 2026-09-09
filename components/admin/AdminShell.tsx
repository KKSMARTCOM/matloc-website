"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, ImageIcon, Info, Wrench,
  FolderOpen, Users, Phone, AlignLeft, Globe,
  Megaphone, GalleryHorizontal, UserCog, ChevronRight,
} from "lucide-react";
import SidebarFooter from "@/components/admin/SidebarFooter";
import AdminTopBar from "@/components/admin/AdminTopBar";
import type { JwtPayload } from "@/lib/auth";

const NAV_BASE = [
  { label: "MENU", items: [
    { href: "/admin",              label: "Dashboard",       icon: LayoutDashboard },
    { href: "/admin/hero",         label: "Hero accueil",    icon: ImageIcon },
    { href: "/admin/about",        label: "À propos",        icon: Info },
    { href: "/admin/services",     label: "Services",        icon: Wrench },
    { href: "/admin/realisations", label: "Réalisations",    icon: FolderOpen },
    { href: "/admin/partenaires",  label: "Partenaires",     icon: Users },
    { href: "/admin/cta",          label: "Bannière CTA",    icon: Megaphone },
  ]},
  { label: "PAGES", items: [
    { href: "/admin/contact",      label: "Contact",         icon: Phone },
    { href: "/admin/footer",       label: "Footer",          icon: AlignLeft },
  ]},
  { label: "MÉDIAS", items: [
    { href: "/admin/images",       label: "Images",          icon: GalleryHorizontal },
    { href: "/admin/seo",          label: "SEO",             icon: Globe },
  ]},
];

const NAV_ADMIN_ONLY = {
  label: "ADMIN",
  items: [{ href: "/admin/users", label: "Utilisateurs", icon: UserCog }],
};

type SessionInfo = Pick<JwtPayload, "role" | "name" | "isOwner">;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin  = pathname === "/admin/login";
  const [session, setSession] = useState<SessionInfo | null>(null);

  useEffect(() => {
    if (isLogin) return;
    fetch("/api/admin/me")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { role?: string; name?: string; isOwner?: boolean } | null) => {
        if (d?.role) setSession({ role: d.role as JwtPayload["role"], name: d.name ?? "", isOwner: d.isOwner ?? false });
      })
      .catch(() => undefined);
  }, [isLogin]);

  if (isLogin) {
    return <div className="min-h-screen bg-[#f4f6f9]">{children}</div>;
  }

  const nav = session?.role === "admin" ? [...NAV_BASE, NAV_ADMIN_ONLY] : NAV_BASE;

  return (
    <div className="h-screen overflow-hidden flex bg-[#f4f6f9] admin-shell">

      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-20 shadow-sm">

        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100 shrink-0">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1a2540] flex items-center justify-center shrink-0">
              <Image src="/assets/images/logo-matloc.jpg" alt="M" width={28} height={28}
                className="w-7 h-7 object-contain rounded-lg" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-900 leading-tight">MATLOC</p>
              <p className="text-[10px] text-gray-400 font-medium">Administration</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {nav.map(({ label, items }) => (
            <div key={label}>
              <p className="px-3 mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-[0.12em]">{label}</p>
              <div className="space-y-1">
                {items.map(({ href, label: lbl, icon: Icon }) => {
                  const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                  return (
                    <Link key={href} href={href}
                      className={`group flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-[#1a2540] text-white shadow-sm"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}>
                      <Icon size={16} className={`shrink-0 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`} />
                      <span className="flex-1">{lbl}</span>
                      {isActive && <ChevronRight size={13} className="text-white/50" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Infos utilisateur */}
        {session && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-gray-50 border border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a2540] flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">{session.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{session.name}</p>
                <p className="text-xs text-gray-600 capitalize">{session.isOwner ? "Propriétaire" : session.role}</p>
              </div>
            </div>
          </div>
        )}

        <SidebarFooter />
      </aside>

      {/* ── Zone principale ── */}
      <div className="flex-1 ml-60 flex flex-col h-screen overflow-hidden">
        <AdminTopBar session={session} pathname={pathname} />
        <div className="flex-1 overflow-y-auto">
          <main className="p-7 lg:p-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
