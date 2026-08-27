import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/menu";
import { XIcon } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const LANGS = [
  { code: "fr", label: "Français", icon: "/assets/icons/icon-france.png" },
  {
    code: "en",
    label: "English",
    icon: "/assets/icons/icon-kingdom-state.png",
  },
] as const;

interface Props {
  pathname: string;
  lang: "fr" | "en";
  onClose: () => void;
  onLangChange: (l: "fr" | "en") => void;
}

export default function DrawerContent({
  pathname,
  lang,
  onClose,
  onLangChange,
}: Props) {
  const { t } = useI18n();
  const labels = [
    "nav.home",
    "nav.about",
    "nav.services",
    "nav.projects",
    "nav.contact",
  ];
  return (
    <>
      {/* En-tête */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
        <Link href="/" onClick={onClose} className="flex">
          <Image
            src="/assets/images/logo-matloc.jpg"
            alt="MATLOC"
            width={110}
            height={36}
            className="h-9 w-auto object-contain rounded-lg"
            priority
          />
        </Link>
        <button
          onClick={onClose}
          aria-label={t("common.closeMenu")}
          className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-100 hover:bg-gray-200 border-0 cursor-pointer transition-colors duration-150"
        >
          <XIcon size={25} className="text-gray-700" />
        </button>
      </div>

      {/* Liens */}
      <nav className="flex-1 p-4">
        <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "flex items-center gap-2.5 px-4 py-3 rounded-lg text-[15px] font-semibold no-underline text-[#F97316] bg-[#FEF3E8]"
                      : "flex items-center gap-2.5 px-4 py-3 rounded-lg text-[15px] font-medium no-underline text-gray-900 hover:bg-gray-50 hover:text-[#F97316] transition-colors duration-150"
                  }
                >
                  {isActive && (
                    <span
                      className="w-1 h-[18px] rounded-full bg-[#F97316] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {t(labels[NAV_LINKS.indexOf(link)])}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pied */}
      <div className="px-6 py-5 border-t border-gray-200 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-gray-500 font-medium shrink-0">
            {t("common.language")}
          </span>
          <div className="flex gap-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => onLangChange(l.code)}
                aria-label={l.label}
                aria-pressed={lang === l.code}
                className={
                  lang === l.code
                    ? "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-semibold border-0 cursor-pointer bg-[#F97316] text-white"
                    : "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-semibold border-0 cursor-pointer bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors duration-150"
                }
              >
                <Image
                  src={l.icon}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4 rounded-sm object-cover"
                  aria-hidden="true"
                />
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <Link
          href="/contact#devis"
          onClick={onClose}
          className="flex items-center justify-center px-6 py-3 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold text-sm rounded-md no-underline transition-colors duration-150"
        >
          {t("actions.quote")}
        </Link>
      </div>
    </>
  );
}
