"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, FOOTER_SERVICES } from "@/constants/menu";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/constants/footer";
import BackToTop from "@/components/BackToTop";
import { useI18n } from "@/contexts/I18nContext";

const CONTACT_ICONS = {
  address: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 mt-0.5"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  ),
  email: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

export default function Footer() {
  const { t } = useI18n();
  const navKeys = [
    "nav.home",
    "nav.about",
    "nav.services",
    "nav.projects",
    "nav.contact",
  ];
  return (
    <footer
      className="bg-[var(--color-bg-footer)] text-[var(--color-text-inverse)]"
      role="contentinfo"
    >
      <div className="container-site py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne 1 — Marque */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label={t("common.home")}>
              <Image
                src="/assets/images/logo_white.png"
                alt="MATLOC"
                width={200}
                height={100}
                className="object-cover h-14 w-40 -ml-12"
              />
            </Link>
            <p className="text-md text-white/70 leading-relaxed max-w-55">
              {t("footer.description")}
            </p>
            <div
              className="flex items-center gap-2 flex-wrap"
              aria-label={t("common.social")}
            >
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-md bg-white/10 text-white/80 hover:bg-primary hover:text-white transition-colors duration-150"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Liens rapides */}
          <div>
            <h3 className="text-md font-semibold uppercase tracking-widest text-white mb-5">
              {t("footer.quickLinks")}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[var(--color-primary)] transition-colors duration-150"
                  >
                    {t(navKeys[NAV_LINKS.indexOf(link)])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Services */}
          <div>
            <h3 className="text-md font-semibold uppercase tracking-widest text-white mb-5">
              {t("footer.services")}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/70 hover:text-[var(--color-primary)] transition-colors duration-150"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h3 className="text-md font-semibold uppercase tracking-widest text-white mb-5">
              {t("footer.contact")}
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              {CONTACT_INFO.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-2.5 text-sm text-white/70"
                >
                  <span className="text-[var(--color-primary)]">
                    {CONTACT_ICONS[item.type]}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[var(--color-primary)] transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-bg-footer-bottom)] border-t border-white/10">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} MATLOC BTP. {t("common.allRights")}
          </p>
          <p className="text-xs text-white/40">
            {t("common.madeBy")}{" "}
            <a
              href="https://kasmartcom.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors duration-150"
            >
              KASMARTCOM
            </a>
          </p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
