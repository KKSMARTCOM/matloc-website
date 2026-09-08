import type { Metadata } from "next";
import RealisationsPageClient from "./RealisationsPageClient";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description:
    "Découvrez les projets emblématiques réalisés par MATLOC : ponts, zones industrielles, ports et assainissement urbain au Bénin.",
  alternates: { canonical: "/realisations" },
  openGraph: {
    title: "Nos réalisations | MATLOC",
    description:
      "Projets emblématiques de terrassement, transport et location d'engins réalisés par MATLOC sur des chantiers au Bénin.",
    url: "/realisations",
  },
};

export default function RealisationsPage() {
  return <RealisationsPageClient />;
}
