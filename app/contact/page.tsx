import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez MATLOC à Cotonou, Bénin pour vos besoins en location d'échafaudages, transport et engins BTP. Devis gratuit sous 24h.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contactez MATLOC",
    description:
      "Nos coordonnées, notre localisation et notre formulaire de contact pour toute demande de devis ou de renseignement.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
