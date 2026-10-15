"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import { MEMBERS, type MemberSocials } from "@/public/assets/assets";
import { useI18n } from "@/contexts/I18nContext";

interface TeamMemberModalProps {
  /** Index du membre affiché dans MEMBERS, ou null si fermé */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

// LinkedIn n'est plus fourni par simple-icons ni lucide : SVG officiel en local
function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 4.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIALS: {
  key: keyof MemberSocials;
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon },
  { key: "x", label: "X", icon: SiX },
  { key: "instagram", label: "Instagram", icon: SiInstagram },
];

const noopSubscribe = () => () => {};

export default function TeamMemberModal({
  index,
  onClose,
  onNavigate,
}: TeamMemberModalProps) {
  const { t } = useI18n();
  // false côté serveur et à l'hydratation, true ensuite : portail sans mismatch
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;
  const total = MEMBERS.length;

  const goTo = (offset: number) => {
    if (index === null) return;
    onNavigate((index + offset + total) % total);
  };

  // Verrouillage du scroll + focus + restitution du focus à la fermeture
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  // Raccourcis clavier : Échap pour fermer, flèches pour naviguer
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (!isClient) return null;

  const member = index !== null ? MEMBERS[index] : null;

  return createPortal(
    <AnimatePresence>
      {member && index !== null && (
        <motion.div
          key="team-modal"
          className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Fond */}
          <div
            className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-name"
            className="relative w-full sm:max-w-4xl max-h-[92dvh] sm:max-h-[85vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label={t("common.close")}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 md:bg-gray-100 hover:bg-primary hover:text-white text-secondary flex items-center justify-center border-0 cursor-pointer shadow-md md:shadow-none transition-colors duration-150"
            >
              <XIcon size={20} />
            </button>

            <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row custom-scrollbar">
              {/* Photo */}
              <div className="relative shrink-0 w-full h-72 sm:h-80 md:h-auto md:w-2/5 bg-primary/10 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={member.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-linear-to-t from-secondary/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute left-0 bottom-0 h-1.5 w-1/3 bg-primary" />
                <span className="absolute bottom-4 left-4 text-white/90 text-xs font-semibold tracking-[0.2em]">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Contenu */}
              <div className="md:flex-1 md:min-h-0 flex flex-col">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={member.id}
                    className="md:flex-1 md:min-h-0 flex flex-col px-6 pt-6 pb-4 sm:px-8 md:px-10 md:pt-10"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="self-start px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-wider">
                      {t(`data.members.${member.id}.role`)}
                    </span>
                    <h2
                      id="team-modal-name"
                      className="mt-3 pr-10 text-2xl md:text-3xl font-bold text-secondary leading-tight"
                    >
                      {member.name}
                    </h2>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-0.5 w-8 bg-primary rounded-full" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        {t("team.role")}
                      </h3>
                    </div>
                    <p className="mt-3 md:flex-1 md:min-h-0 md:overflow-y-auto md:pr-2 custom-scrollbar text-gray-700 leading-relaxed md:text-justify hyphens-auto">
                      {t(`data.members.${member.id}.bio`)}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Pied : réseaux sociaux + navigation */}
                <div className="sticky bottom-0 md:static z-10 bg-white shrink-0 mx-6 sm:mx-8 md:mx-10 py-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-secondary">
                      {t("team.follow")}
                    </span>
                    <div className="flex gap-2">
                      {SOCIALS.map(({ key, label, icon: Icon }) => {
                        const href = member.socials[key];
                        if (!href) return null;
                        return (
                          <a
                            key={key}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${label} — ${member.name}`}
                            className="w-9 h-9 rounded-full border border-border text-secondary flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors duration-150"
                          >
                            <Icon size={16} />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => goTo(-1)}
                      aria-label={t("team.previous")}
                      className="w-10 h-10 rounded-full bg-secondary text-white hover:bg-primary flex items-center justify-center border-0 cursor-pointer transition-colors duration-150"
                    >
                      <ChevronLeftIcon size={20} />
                    </button>
                    <button
                      onClick={() => goTo(1)}
                      aria-label={t("team.next")}
                      className="w-10 h-10 rounded-full bg-secondary text-white hover:bg-primary flex items-center justify-center border-0 cursor-pointer transition-colors duration-150"
                    >
                      <ChevronRightIcon size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
