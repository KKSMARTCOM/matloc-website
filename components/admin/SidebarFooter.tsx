"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
      <div className="px-3 pb-4 shrink-0">
        <button
          onClick={() => setConfirmLogout(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
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
