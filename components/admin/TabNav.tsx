"use client";

interface Tab { key: string; label: string; }

interface Props {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
}

export default function TabNav({ tabs, active, onChange }: Props) {
  return (
    <div className="flex gap-2 border-b border-gray-200 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-8 py-4 text-base font-semibold rounded-t-xl transition-colors duration-150 -mb-px border-b-2 ${
            active === tab.key
              ? "text-orange-600 border-orange-500 bg-orange-50"
              : "text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
