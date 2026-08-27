"use client";

import Image from "next/image";

const LANGS = [
  { code: "fr", label: "Français", icon: "/assets/icons/icon-france.png" },
  {
    code: "en",
    label: "English",
    icon: "/assets/icons/icon-kingdom-state.png",
  },
] as const;

interface Props {
  lang: "fr" | "en";
  onChange: (l: "fr" | "en") => void;
  className?: string;
}

export default function LangSwitcher({
  lang,
  onChange,
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label="Sélection de langue"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          aria-label={l.label}
          aria-pressed={lang === l.code}
          className={`p-1 rounded transition-opacity duration-150 border-0 bg-transparent cursor-pointer
            ${lang === l.code ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
        >
          <Image
            src={l.icon}
            alt={l.label}
            width={24}
            height={24}
            className="rounded-sm object-cover w-6 h-6"
          />
        </button>
      ))}
    </div>
  );
}
