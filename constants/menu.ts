export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/apropos" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_SERVICES: NavLink[] = [
  { label: "Location d'échafaudages", href: "/services#echafaudages" },
  { label: "Les solutions d'élévation", href: "/services#elevation" },
  { label: "Transport", href: "/services#transport" },
  { label: "Location d'engins et d'équipements BTP", href: "/services#engins" },
  {
    label: "Services associés aux travaux et chantiers",
    href: "/services#associes",
  },
];
