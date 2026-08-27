"use client";

import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import CtaBanner from "@/components/ui/CtaBanner";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/public/assets/assets";
import { useI18n } from "@/contexts/I18nContext";

export default function ServicesPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("pages.services")} url="/assets/images/banner.jpg" />

      <div className="container-site py-16">
        <SectionHeader
          title={t("pages.serviceTitle")}
          subtitle={t("home.servicesIntro")}
        />
        <Reveal
          duration={1.5}
          delay={0.5}
          distance={80}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              title={t(`data.services.${s.id}.title`)}
              subtitle={t(`data.services.${s.id}.subtitle`)}
              url={s.url}
              description={t(`data.services.${s.id}.description`)}
              points={s.points?.map((_, index) =>
                t(`data.services.${s.id}.points.${index}`),
              )}
              icon={<s.icon size={18} className="text-primary shrink-0" />}
              iconLarge={<s.icon size={20} className="text-primary" />}
            />
          ))}
        </Reveal>
      </div>

      <CtaBanner />
    </>
  );
}
