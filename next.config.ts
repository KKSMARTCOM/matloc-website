import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.19.112.1"],
  images: {
    /* Dossier uploads local — servi par Next.js comme ressource statique */
    localPatterns: [
      { pathname: "/uploads/**" },
      { pathname: "/assets/**" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      /* Autoriser n'importe quel hostname HTTPS pour les URLs externes CMS */
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
