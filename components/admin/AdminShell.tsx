"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, ImageIcon, Info, Wrench,
  FolderOpen, Users, Phone, AlignLeft, Globe,
  Megaphone, GalleryHorizontal, UserCog,
} from "lucide-react";
import SidebarFooter from "@/components/admin/SidebarFooter";
import type { JwtPayload } from "@/lib/auth";

const NAV_BASE = [
  { label: "CONTENU", items: [
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
  { label: "MÉDIAS & SEO", items: [
    { href: "/admin/images",       label: "Images",          icon: GalleryHorizontal },
    { href: "/admin/seo",          label: "SEO",             icon: Globe },
  ]},
];

const NAV_ADMIN_ONLY = {
  label: "ADMINISTRATION",
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
        if (d?.role) setSession({
          role:    d.role as JwtPayload["role"],
          name:    d.name ?? "",
          isOwner: d.isOwner ?? false,
        });
      })
      .catch(() => undefined);
  }, [isLogin]);

  /* ── Page login : pas de sidebar ── */
  if (isLogin) {
    return <div className="min-h-screen bg-[#f5f6fa]">{children}</div>;
  }

  const nav = session?.role === "admin"
    ? [...NAV_BASE, NAV_ADMIN_ONLY]
    : NAV_BASE;

  /* ── Pages admin : avec sidebar fixe ── */
  return (
    <div className="h-screen overflow-hidden flex bg-[#f5f6fa]">

      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#1a2540] flex flex-col fixed inset-y-0 left-0 z-20">
        <div className="px-6 py-6 border-b border-white/10 shrink-0">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/assets/images/logo-matloc.jpg" alt="MATLOC" width={100} height={34}
              className="h-9 w-auto object-contain rounded" />
            <span className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.2em]">CMS</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          {nav.map(({ label, items }) => (
            <div key={label}>
              <p className="px-3 mb-2.5 text-[10px] font-bold text-white/25 uppercase tracking-[0.2em]">{label}</p>
              <div className="space-y-1">
                {items.map(({ href, label: lbl, icon: Icon }) => {
                  const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                  return (
                    <Link key={href} href={href}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "text-white bg-white/15"
                          : "text-white/60 hover:text-white hover:bg-white/10"
                      }`}>
                      <Icon size={17} className="shrink-0" />
                      {lbl}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Nom + rôle de l'utilisateur connecté */}
        {session && (
          <div className="px-6 py-3 border-t border-white/10 shrink-0">
            <p className="text-xs text-white/60 font-medium truncate">{session.name}</p>
            <p className="text-[10px] text-white/30 capitalize mt-0.5">{session.role}</p>
          </div>
        )}

        <SidebarFooter />
      </aside>

      {/* Zone principale — seule zone scrollable */}
      <div className="flex-1 ml-64 overflow-y-auto h-screen">
        <main className="p-10 lg:p-12">{children}</main>
      </div>
    </div>
  );
}
