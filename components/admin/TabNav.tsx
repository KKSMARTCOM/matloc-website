"use client";

interface Tab { key: string; label: string; }
interface Props { tabs: Tab[]; active: string; onChange: (key: string) => void; }

export default function TabNav({ tabs, active, onChange }: Props) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1.5 rounded-xl mb-10 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-6 py-2.5 text-[15px] font-semibold rounded-lg transition-all duration-150 ${
            active === tab.key
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
