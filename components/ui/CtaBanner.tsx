"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { useI18n } from "@/contexts/I18nContext";
import { useCmsSettings } from "@/hooks/useCmsSettings";

interface Props {
  title?: string;
  subtitle?: string;
}

export default function CtaBanner({ title, subtitle }: Props) {
  const { t } = useI18n();
  const cms = useCmsSettings("cta");

  const finalTitle    = title    ?? cms.get("cta_title",         t("cta.title"));
  const finalSubtitle = subtitle ?? cms.get("cta_subtitle",      t("cta.subtitle"));
  const btnPrimary    = cms.get("cta_btn_primary",   t("actions.quote"));
  const btnSecondary  = cms.get("cta_btn_secondary", t("actions.contact"));

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
            <h1 className="section-title text-secondary">{finalTitle}</h1>
          </Reveal>
          <Reveal duration={1} delay={0.2}>
            <p>{finalSubtitle}</p>
          </Reveal>
          <Reveal duration={1.3} delay={0.3} distance={50}
            className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/#devis" className="btn-primary">{btnPrimary}</Link>
            <Link href="/contact" className="btn-outline">{btnSecondary}</Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
