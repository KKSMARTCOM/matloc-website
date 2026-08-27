"use client";

import { CheckCircle, XIcon } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useState } from "react";

interface Props {
  icon: ReactNode;
  iconLarge: ReactNode;
  title: string;
  subtitle: string;
  url?: string;
  description: string;
  points?: string[];
}

export default function ServiceCard({
  icon,
  iconLarge,
  title,
  subtitle,
  url,
  description,
  points,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col border-t-4 border-[var(--color-primary)] shadow-sm hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden rounded-sm">
        <Image
          src={url ?? ""}
          alt={title}
          width={500}
          height={400}
          className="w-full h-52 object-cover bg-gray-300"
        />

        <div className="flex-1 flex flex-col justify-between gap-3 p-5">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-sm font-[600] uppercase tracking-wide text-[var(--color-text-primary)]">
              {title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed">{subtitle}</p>
          <ul className="flex flex-col gap-1.5">
            {points?.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <CheckCircle
                  size={14}
                  className="text-[var(--color-primary)] shrink-0 mt-0.5"
                />
                {p}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-2 inline-flex items-center justify-center px-5 py-2 border border-[var(--color-text-primary)] text-xs font-bold tracking-widest rounded-sm hover:bg-[var(--color-text-primary)] hover:text-white transition-colors duration-150 uppercase"
          >
            En savoir plus
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fermer la description"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border-0 cursor-pointer transition-colors duration-150"
          >
            <XIcon size={22} />
          </button>

          <div
            className="w-full max-w-4xl max-h-[85vh] bg-white rounded-xl overflow-y-auto custom-scrollbar shadow-2xl grid grid-cols-1 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image à gauche */}
            <div className="relative w-full h-full">
              <Image
                src={url ?? ""}
                alt={title}
                width={500}
                height={500}
                className="object-cover h-full w-full"
              />
            </div>

            {/* Texte à droite */}
            <div className="p-6 md:p-8 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  {iconLarge}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wide text-[var(--color-text-primary)]">
                  {title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                {description}
              </p>

              {points && points.length > 0 && (
                <ul className="flex flex-col gap-2.5 mt-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle
                        size={16}
                        className="text-[var(--color-primary)] shrink-0 mt-0.5"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
