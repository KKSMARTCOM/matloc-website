"use client";

import {
  Wrench, Truck, HardHat, Cog, MoveVertical, Building2,
  Zap, ShieldCheck, Users, Package, Hammer, Layers,
  Settings, Drill, Construction, BrickWall, TreePine, Flame,
} from "lucide-react";

export const ICON_OPTIONS = [
  { key: "wrench",       label: "Clé",            Icon: Wrench },
  { key: "truck",        label: "Camion",          Icon: Truck },
  { key: "hardhat",      label: "Casque",          Icon: HardHat },
  { key: "cog",          label: "Engrenage",       Icon: Cog },
  { key: "moveVertical", label: "Élévation",       Icon: MoveVertical },
  { key: "building2",    label: "Bâtiment",        Icon: Building2 },
  { key: "zap",          label: "Électrique",      Icon: Zap },
  { key: "shieldCheck",  label: "Sécurité",        Icon: ShieldCheck },
  { key: "users",        label: "Équipe",          Icon: Users },
  { key: "package",      label: "Colis",           Icon: Package },
  { key: "hammer",       label: "Marteau",         Icon: Hammer },
  { key: "layers",       label: "Couches",         Icon: Layers },
  { key: "settings",     label: "Paramètres",      Icon: Settings },
  { key: "drill",        label: "Foreuse",         Icon: Drill },
  { key: "construction", label: "Construction",    Icon: Construction },
  { key: "brickWall",    label: "Mur",             Icon: BrickWall },
  { key: "treePine",     label: "Environnement",   Icon: TreePine },
  { key: "flame",        label: "Énergie",         Icon: Flame },
] as const;

export type IconKey = typeof ICON_OPTIONS[number]["key"];

export function getIconComponent(key: string): React.ElementType {
  return ICON_OPTIONS.find((o) => o.key === key)?.Icon ?? Wrench;
}

interface Props {
  value: string;
  onChange: (key: string) => void;
}

export default function IconPicker({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Icône du service</label>
      <div className="grid grid-cols-6 gap-2">
        {ICON_OPTIONS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            title={label}
            onClick={() => onChange(key)}
            className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-150 ${
              value === key
                ? "border-[#1a2540] bg-[#1a2540]/5 text-[#1a2540]"
                : "border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={20} />
            <span className="text-[9px] font-medium leading-tight text-center">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
