import { Loader2 } from "lucide-react";

export type Field = { key: string; label: string; value: string };

interface Props {
  fields: Field[];
  loading: boolean;
  onChange: (key: string, value: string) => void;
  multilineKeys?: string[];
  urlKeys?: string[];
  sectionTitle?: string;
  cols?: 1 | 2;
}

export default function FieldList({ fields, loading, onChange, multilineKeys = [], urlKeys = [], sectionTitle, cols = 1 }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400 gap-3">
        <Loader2 size={22} className="animate-spin" /> Chargement…
      </div>
    );
  }

  const inlineFields   = fields.filter((f) => !multilineKeys.includes(f.key));
  const textareaFields = fields.filter((f) =>  multilineKeys.includes(f.key));

  const inputCls = "w-full px-4 py-3 text-gray-900 text-sm bg-white border border-gray-300 rounded-xl outline-none focus:border-[#1a2540] focus:ring-2 focus:ring-[#1a2540]/10 transition placeholder-gray-400";

  return (
    <div className="space-y-7">
      {sectionTitle && (
        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">{sectionTitle}</p>
      )}

      {inlineFields.length > 0 && (
        <div className={`grid gap-5 ${cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
          {inlineFields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-semibold text-gray-800 mb-2">{f.label}</label>
              <input
                type={urlKeys.includes(f.key) ? "url" : "text"}
                value={f.value}
                onChange={(e) => onChange(f.key, e.target.value)}
                className={`${inputCls} ${urlKeys.includes(f.key) ? "font-mono text-xs" : ""}`}
              />
            </div>
          ))}
        </div>
      )}

      {textareaFields.map((f) => (
        <div key={f.key}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>
          <textarea
            rows={5}
            value={f.value}
            onChange={(e) => onChange(f.key, e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </div>
      ))}
    </div>
  );
}
