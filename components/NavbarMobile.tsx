"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import DrawerContent from "@/components/header/DrawerContent";
import { MenuIcon } from "lucide-react";

interface Props {
  lang: "fr" | "en";
  onLangChange: (l: "fr" | "en") => void;
}

function subscribe() {
  return () => {};
}
function getSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export default function NavbarMobile({ lang, onLangChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
      const timer = setTimeout(
        () =>
          drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus(),
        50,
      );
      return () => {
        clearTimeout(timer);
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        document.body.classList.remove("mobile-menu-open");
      };
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
        className="lg:hidden flex items-center justify-center p-2 rounded-md border-0 cursor-pointer bg-gray-100  hover:bg-gray-200 transition-colors duration-150"
      >
        <MenuIcon size={25} className="text-gray-700" />
      </button>

      {mounted &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/55 transition-opacity duration-300"
              style={{
                zIndex: 9998,
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
              }}
            />

            <div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              className="fixed top-0 right-0 bottom-0 bg-white shadow-2xl flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out"
              style={{
                zIndex: 9999,
                width: "300px",
                maxWidth: "90vw",
                transform: isOpen ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <DrawerContent
                pathname={pathname}
                lang={lang}
                onClose={() => setIsOpen(false)}
                onLangChange={onLangChange}
              />
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
