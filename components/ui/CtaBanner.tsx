"use client";

import Link from "next/link";
import React from "react";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/contexts/I18nContext";

interface Props {
  title?: React.ReactNode;
  subtitle?: string;
}

export default function CtaBanner({ title, subtitle }: Props) {
  const { t } = useI18n();
  const translatedTitle = title ?? t("cta.title");
  const translatedSubtitle = subtitle ?? t("cta.subtitle");

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-site">
        <div className="text-center mb-8 space-y-4 w-full max-w-2/3 mx-auto">
          <Reveal className="flex justify-center">
            <p className="py-2 px-3 text-primary text-sm rounded-lg bg-primary/20">
              {t("cta.eyebrow")}
            </p>
          </Reveal>

          <Reveal duration={1} delay={0.2}>
            <h1 className="section-title text-secondary">{translatedTitle}</h1>
          </Reveal>
          <Reveal duration={1} delay={0.2}>
            <p>{translatedSubtitle}</p>
          </Reveal>
          <Reveal
            duration={1.3}
            delay={0.3}
            distance={50}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link href="#" className="btn-primary">
              {t("actions.quote")}
            </Link>
            <Link href="/contact" className="btn-outline">
              {t("actions.contact")}
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
