export interface ServiceOptions {
  key: string;
  label: string;
}

export const SERVICE_OPTIONS: ServiceOptions[] = [
  {
    key: "hauteur",
    label: "Solutions de travail en hauteur",
  },
  {
    key: "transport",
    label: "Solution de transport",
  },
  {
    key: "equipment",
    label: "Location d'engins et d'équipements BTP",
  },
  {
    key: "travaux",
    label: "Services associés aux travaux et chantiers",
  },
  {
    key: "others",
    label: "Autres",
  },
];
