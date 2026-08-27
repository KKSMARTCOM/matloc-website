"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DesktopNav from "@/components/header/DesktopNav";
import LangSwitcher from "@/components/header/LangSwitcher";
import NavbarMobile from "@/components/NavbarMobile";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { language: lang, t, changeLanguage } = useI18n();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-30 bg-white transition-shadow duration-200
          ${isScrolled ? "shadow-header" : "shadow-[0_1px_4px_0_rgba(0,0,0,0.06)]"}`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center shrink-0"
                aria-label={t("common.home")}
              >
                <Image
                  src="/assets/images/logo-matloc.jpg"
                  alt="MATLOC"
                  width={140}
                  height={44}
                  className="object-contain h-10 lg:h-11 w-auto rounded-lg"
                  priority
                />
              </Link>

              <DesktopNav pathname={pathname} />
            </div>

            <div className="flex items-center gap-4">
              <LangSwitcher
                lang={lang}
                onChange={changeLanguage}
                className="hidden lg:flex"
              />
              <Link
                href="/contact#devis"
                className="hidden lg:inline-flex py-2 px-5 bg-primary hover:bg-primary-hover text-white rounded-lg text-md font-bold"
              >
                {t("actions.quote")}
              </Link>
              <NavbarMobile lang={lang} onLangChange={changeLanguage} />
            </div>
          </div>
        </div>
      </header>
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
}
