"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/constants/menu";

interface Props {
  pathname: string;
}
import { useI18n } from "@/contexts/I18nContext";

export default function DesktopNav({ pathname }: Props) {
  const { t } = useI18n();
  const labels = [
    "nav.home",
    "nav.about",
    "nav.services",
    "nav.projects",
    "nav.contact",
  ];
  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      aria-label="Navigation principale"
    >
      <ul className="flex items-center gap-1" role="list">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-4 py-2 text-md font-medium rounded-md transition-colors duration-150
                  ${
                    isActive
                      ? "text-primary font-extrabold"
                      : "text-text-primary hover:text-primary"
                  }`}
              >
                {t(labels[NAV_LINKS.indexOf(link)])}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
