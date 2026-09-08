import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Depuis sa création, MATLOC s'est imposé comme l'acteur de référence au Bénin dans le secteur du BTP et de la logistique industrielle. Découvrez notre équipe et nos valeurs.",
  alternates: { canonical: "/apropos" },
  openGraph: {
    title: "À propos de MATLOC",
    description:
      "Découvrez MATLOC, expert en location d'échafaudages, transport et équipements BTP au Bénin : notre mission, nos valeurs et notre équipe.",
    url: "/apropos",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
