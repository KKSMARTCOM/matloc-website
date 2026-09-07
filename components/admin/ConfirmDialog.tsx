"use client";

import { AlertTriangle, LogOut } from "lucide-react";

interface Props {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Supprimer",
  cancelLabel  = "Annuler",
  variant      = "danger",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  const isLogout    = variant === "warning";
  const iconBg      = isLogout ? "bg-orange-50"  : "bg-red-50";
  const iconColor   = isLogout ? "text-orange-500" : "text-red-500";
  const btnColor    = isLogout
    ? "bg-orange-500 hover:bg-orange-600"
    : "bg-red-500 hover:bg-red-600";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header coloré */}
        <div className={`px-6 pt-7 pb-5 flex flex-col items-center gap-4`}>
          <div className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center`}>
            {isLogout
              ? <LogOut     size={24} className={iconColor} />
              : <AlertTriangle size={24} className={iconColor} />}
          </div>
          {title && (
            <h3 className="text-lg font-bold text-gray-900 text-center">{title}</h3>
          )}
          <p className="text-sm text-gray-500 text-center leading-relaxed">{message}</p>
        </div>

        {/* Boutons */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 text-sm font-semibold text-white rounded-xl transition-colors ${btnColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
