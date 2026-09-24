"use client";

import { useRef, useState } from "react";
import { Upload, Link2, Loader2, X, Play } from "lucide-react";

interface Props {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}

export default function VideoField({ label = "Vidéo", value, onChange, hint }: Props) {
  const [tab, setTab]           = useState<"url" | "upload">("url");
  const [urlInput, setUrlInput] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const applyUrl = () => { onChange(urlInput.trim()); setError(null); };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok || !data.url) { setError(data.error ?? "Erreur d'upload."); return; }
      onChange(data.url);
      setUrlInput(data.url);
    } catch { setError("Erreur réseau."); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  return (
    <div className="space-y-3">
      {label && <span className="block text-sm font-semibold text-gray-700">{label}</span>}

      {/* Aperçu vidéo */}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black group">
          <video
            src={value}
            controls
            preload="metadata"
            className="w-full max-h-48 object-contain"
          />
          <button
            onClick={() => { onChange(""); setUrlInput(""); }}
            className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
          >
            <X size={15} className="text-red-500" />
          </button>
        </div>
      ) : (
        <div className="h-24 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
          <Play size={28} className="text-gray-500" />
        </div>
      )}

      {/* Onglets */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
        {(["url", "upload"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 font-medium transition-colors ${
              tab === t ? "bg-orange-50 text-orange-600" : "text-gray-500 hover:bg-gray-50"
            }`}>
            {t === "url" ? <Link2 size={16} /> : <Upload size={16} />}
            {t === "url" ? "URL externe" : "Importer une vidéo"}
          </button>
        ))}
      </div>

      {tab === "url" ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") applyUrl(); }}
            placeholder="https://exemple.com/video.mp4"
            className="flex-1 px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition font-mono"
          />
          <button onClick={applyUrl}
            className="px-4 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap">
            Appliquer
          </button>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center gap-2 h-24 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
          uploading ? "border-orange-300 bg-orange-50" : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
        }`}>
          {uploading ? (
            <Loader2 size={22} className="animate-spin text-orange-500" />
          ) : (
            <>
              <Upload size={22} className="text-gray-600" />
              <span className="text-sm text-gray-500">MP4, WEBM — max 100 Mo</span>
            </>
          )}
          <input ref={fileRef} type="file" accept="video/mp4,video/webm,video/ogg"
            onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      )}

      {error && <p className="text-xs text-red-500 flex items-center gap-1"><X size={14} />{error}</p>}
      {hint  && <p className="text-sm text-gray-600">{hint}</p>}
    </div>
  );
}
