import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Location d'échafaudages, transport de matériaux, engins de terrassement et services associés aux chantiers, partout au Bénin. Devis gratuit sous 24h.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Nos services BTP | MATLOC",
    description:
      "Un parc matériel de pointe : échafaudages, camions bennes, engins de terrassement et équipements de chantier en location au Bénin.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
