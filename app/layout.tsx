import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import I18nProvider from "@/providers/I18nProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "MATLOC — Expert en location d'échafaudages, transport et équipements BTP",
  description:
    "MATLOC est votre partenaire en solutions d'élévation, de transport et d'équipements BTP au Bénin. Devis gratuit sous 24h.",
  keywords: [
    "location échafaudages Bénin",
    "transport BTP",
    "équipements chantier",
    "MATLOC",
    "Cotonou",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
