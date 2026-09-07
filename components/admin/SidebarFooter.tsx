"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function SidebarFooter() {
  const router = useRouter();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      <div className="px-4 py-5 border-t border-white/10 space-y-1 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white/40 hover:text-white hover:bg-white/10 transition-all duration-150"
        >
          <ExternalLink size={16} className="shrink-0" />
          Voir le site
        </Link>

        <button
          onClick={() => setConfirmLogout(true)}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white/40 hover:text-red-400 hover:bg-white/10 transition-all duration-150"
        >
          <LogOut size={16} className="shrink-0" />
          Déconnexion
        </button>
      </div>

      <ConfirmDialog
        open={confirmLogout}
        variant="warning"
        title="Se déconnecter ?"
        message="Vous allez quitter l'espace d'administration. Assurez-vous d'avoir enregistré vos modifications."
        confirmLabel="Déconnexion"
        cancelLabel="Rester"
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogout(false)}
      />
    </>
  );
}
