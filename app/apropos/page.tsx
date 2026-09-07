"use client";

import TeamSlider from "@/components/TeamSlider";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { VALUES } from "@/public/assets/assets";
import Image from "next/image";
import { useI18n } from "@/contexts/I18nContext";
import { useCmsSettings } from "@/hooks/useCmsSettings";
import { useEffect, useState } from "react";
import type { DbValue } from "@/lib/db";

const VALUE_KEYS = ["reliability", "innovation", "safety", "professionalism"];

const AboutPage = () => {
  const { t } = useI18n();
  const cms    = useCmsSettings("aboutpage");
  const images = useCmsSettings("images");

  /* Valeurs depuis la DB avec fallback statique */
  const [values, setValues] = useState<DbValue[]>(
    VALUES.map((v, i) => ({ id: `value-${i}`, title: t(`data.values.${VALUE_KEYS[i]}.title`), subtitle: t(`data.values.${VALUE_KEYS[i]}.subtitle`), sort_order: i }))
  );
  useEffect(() => {
    fetch("/api/admin/values")
      .then((r) => r.ok ? r.json() : null)
      .then((d: { items?: DbValue[] } | null) => {
        if (d?.items?.length) setValues(d.items);
      })
      .catch(() => undefined);
  }, []);
  return (
    <>
      <PageHero title={t("pages.about")} url={images.get("img_banner_apropos", "/assets/images/banner.jpg")} />

      {/* Section About */}
      <div className="container-site block md:flex items-center gap-12 py-20">
        <Reveal direction="right" className="w-full md:w-1/2 space-y-6 text-md text-dark">
          <h1 className="section-title text-secondary">
            {cms.get("aboutpage_title", t("pages.aboutTitle"))}
          </h1>
          <p>{cms.get("aboutpage_intro", t("about.intro"))}</p>
          <p>{cms.get("aboutpage_mission", t("about.mission"))}</p>
          <div className="block sm:flex gap-6 items-center">
            <div className="py-1 pl-4 border-l-4 border-primary">
              <h2 className="section-title text-secondary font-extrabold">
                {cms.get("aboutpage_stat1_value", "15+")}
              </h2>
              <p className="text-sm uppercase">{cms.get("aboutpage_stat1_label", t("about.experience"))}</p>
            </div>
            <div className="py-1 pl-4 border-l-4 border-primary">
              <h2 className="section-title text-secondary font-extrabold">
                {cms.get("aboutpage_stat2_value", "50+")}
              </h2>
              <p className="text-sm uppercase">{cms.get("aboutpage_stat2_label", t("about.equipment"))}</p>
            </div>
          </div>
        </Reveal>
        <Reveal
          direction="left"
          duration={1.3}
          delay={0.3}
          distance={50}
          className="relative w-full md:w-1/2 h-125 p-5 mt-10 md:mt-0"
        >
          <div className="border-6 border-white bg-gray-300 w-full h-full shadow-xl rounded-md overflow-hidden">
            <Image
              src={images.get("img_about_page", "/assets/images/jpg/About.jpeg")}
              alt="About Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </Reveal>
      </div>

      {/* Section Values */}
      <div className="py-20 bg-gray-50">
        <div className="container-site relative">
          <SectionHeader
            title={cms.get("aboutpage_values_title", t("pages.values"))}
            subtitle={cms.get("aboutpage_values_subtitle", t("about.valuesIntro"))}
          />
          <Reveal
            duration={1.5}
            delay={0.5}
            distance={80}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {values.map((v, key) => (
              <div key={v.id} className="bg-white p-5 space-y-4">
                <div className="w-10 h-10 flex justify-center items-center bg-primary text-white font-extrabold">
                  {VALUES[key]?.icon && (() => { const Icon = VALUES[key].icon; return <Icon size={24} />; })()}
                </div>
                <h2 className="font-[600]">{v.title}</h2>
                <p>{v.subtitle}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Section Members */}
      <div className="container-site py-20">
        <div className="block md:flex items-start gap-6">
          <Reveal direction="right" className="w-full space-y-3 md:w-1/3">
            <h1 className="section-title text-secondary">
              {cms.get("aboutpage_team_title", t("pages.team"))}
            </h1>
            <p>{cms.get("aboutpage_team_subtitle", t("home.quoteText"))}</p>
          </Reveal>
          <Reveal
            direction="left"
            duration={1.3}
            delay={0.3}
            distance={50}
            className="w-full max-h-100 md:w-2/3 mt-10 md:mt-0"
          >
            <TeamSlider />
          </Reveal>
        </div>
      </div>

      {/* Section CTA */}
      <CtaBanner />
    </>
  );
};

export default AboutPage;
