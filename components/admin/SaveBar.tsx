import { Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface Props {
  title?: string;
  description?: string;
  status: SaveStatus;
  onSave: () => void;
  extra?: React.ReactNode;
}

export default function SaveBar({ title, description, status, onSave, extra }: Props) {
  const btnStyle =
    status === "saved"  ? "bg-emerald-500 hover:bg-emerald-600" :
    status === "error"  ? "bg-red-500 hover:bg-red-600" :
    "bg-[#1a2540] hover:bg-[#243357]";

  return (
    <div className="flex items-center justify-between gap-6 mb-10">
      <div className="min-w-0">
        {description && <p className="text-base text-gray-600 mb-0.5">{description}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {extra}
        <button
          onClick={onSave}
          disabled={status === "saving"}
          className={`flex items-center gap-2.5 px-7 py-3 text-white text-base font-semibold rounded-xl transition-colors duration-150 whitespace-nowrap disabled:opacity-60 ${btnStyle}`}
        >
          {status === "saving"  ? <Loader2     size={16} className="animate-spin" />
           : status === "saved" ? <CheckCircle size={16} />
           : status === "error" ? <AlertCircle size={16} />
           : <Save size={16} />}
          {status === "saving" ? "Enregistrement…"
           : status === "saved" ? "Enregistré !"
           : status === "error" ? "Erreur"
           : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
