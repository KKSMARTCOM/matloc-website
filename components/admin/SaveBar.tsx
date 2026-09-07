import { Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface Props {
  title: string;
  description?: string;
  status: SaveStatus;
  onSave: () => void;
  extra?: React.ReactNode;
}

export default function SaveBar({ title, description, status, onSave, extra }: Props) {
  return (
    <div className="sticky top-0 z-10 -mx-10 px-10 py-7 bg-[#f5f6fa]/95 backdrop-blur-sm border-b border-gray-200 mb-12 flex items-center justify-between gap-6">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 truncate">{title}</h1>
        {description && <p className="text-base text-gray-500 mt-1 truncate">{description}</p>}
      </div>
      <div className="flex items-center gap-4 shrink-0">
        {extra}
        <button
          onClick={onSave}
          disabled={status === "saving"}
          className="flex items-center gap-2.5 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-base font-semibold rounded-xl transition-colors duration-150 whitespace-nowrap"
        >
          {status === "saving"  ? <Loader2     size={18} className="animate-spin" />
           : status === "saved" ? <CheckCircle size={18} />
           : status === "error" ? <AlertCircle size={18} />
           : <Save size={18} />}
          {status === "saving" ? "Enregistrement…"
           : status === "saved" ? "Enregistré !"
           : status === "error" ? "Erreur"
           : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
