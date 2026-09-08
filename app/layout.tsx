import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import I18nProvider from "@/providers/I18nProvider";
import { SITE_URL } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_NAME = "MATLOC";
const DEFAULT_TITLE =
  "MATLOC — Expert en location d'échafaudages, transport et équipements BTP";
const DEFAULT_DESCRIPTION =
  "MATLOC est votre partenaire en solutions d'élévation, de transport et d'équipements BTP au Bénin. Devis gratuit sous 24h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | MATLOC",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "location échafaudages Bénin",
    "transport BTP",
    "équipements chantier",
    "MATLOC",
    "Cotonou",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/assets/images/banner.jpg",
        width: 1080,
        height: 1851,
        alt: "MATLOC — Location d'échafaudages, transport et équipements BTP au Bénin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/assets/images/banner.jpg"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/assets/images/banner.jpg`,
  telephone: "+22901283102",
  email: "info.matloc@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1ère Rue à droite après la SBEE Kpondéhou",
    addressLocality: "Cotonou",
    addressCountry: "BJ",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "08:00",
    closes: "18:30",
  },
  sameAs: [
    "https://wa.me/22901283102",
    "https://www.facebook.com/profile.php?id=61568070177659",
    "https://www.instagram.com/matloc_bj/",
    "https://linkedin.com/in/matloc_bj/",
    "https://vm.tiktok.com/ZMAXbL9TJ/",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
