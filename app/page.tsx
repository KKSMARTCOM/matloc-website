"use client";

import DevisForm from "@/components/DevisForm";
import PartnersSlider from "@/components/PartnerSlider";
import ServicesSlider from "@/components/ServiceSlider";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import VideoGallery from "@/components/VideoGallery";
import { CONTACT_INFO } from "@/public/assets/assets";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      {/* Section Hero */}
      <div className="relative w-full flex justify-center items-center h-150 md:h-200">
        <Image
          src="/assets/images/jpg/Hero.jpeg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          alt="Hero"
        />
        <div className="absolute top-0 right-0 w-full h-full bg-linear-to-r from-secondary-hover from-10% via-secondary via-30% to-dark opacity-70" />
        <div className="p-6 space-y-6 absolute text-white text-center w-full md:w-[60%]">
          <h1 className="section-title">{t("home.heroTitle")}</h1>
          <p className="section-subtitle text-white/80">
            {t("home.heroSubtitle")}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/#devis" className="btn-primary text-nowrap">
              {t("actions.quote")}
              <ArrowRightIcon size={20} />
            </Link>

            <Link
              href="/services"
              className="btn-outline-white block text-nowrap"
            >
              {t("nav.services")}
            </Link>
          </div>
        </div>
      </div>

      {/* Section About */}
      <div className="container-site block md:flex items-center gap-12 py-20">
        <Reveal
          direction="right"
          className="relative w-full md:w-1/2 h-60 md:h-100 p-5"
        >
          <div className="absolute -top-3 -left-3 bg-primary/20 w-20 h-20 rounded-md blur-xl" />
          <div className="absolute -bottom-3 -right-3 bg-secondary w-40 h-20 rounded-sm" />
          <div className="absolute inset-0 border-6 border-white bg-gray-300 w-full h-full shadow-xl rounded-md overflow-hidden">
            <Image
              src="/assets/images/jpg/AboutHome.jpeg"
              alt="About Image"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </Reveal>
        <Reveal
          direction="left"
          distance={50}
          duration={1.3}
          delay={0.3}
          className="w-full md:w-1/2 space-y-6 text-md mt-10 md:mt-0 text-dark"
        >
          <h1 className="section-title text-secondary">
            {t("home.expertise")}
          </h1>
          <p>{t("home.welcome")}</p>
          <p>{t("home.fleet")}</p>
          <div className="block sm:flex justify-between items-center">
            <div className="flex items-start gap-3">
              <CheckCircleIcon size={20} className="text-primary" />
              <div>
                <h2 className="font-extrabold">{t("home.maintenance")}</h2>
                <p className="text-sm">{t("home.certified")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-6 sm:mt-0">
              <CheckCircleIcon size={20} className="text-primary" />
              <div>
                <h2 className="font-extrabold">{t("home.flexibility")}</h2>
                <p className="text-sm">{t("home.duration")}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Section Service */}
      <div className="py-20 bg-gray-50">
        <div className="container-site relative">
          <Image
            width={200}
            height={200}
            className="object-cover absolute -top-18 right-0 grayscale opacity-10"
            src="/assets/images/Icon.png"
            alt="Icone"
          />
          <SectionHeader
            title={t("home.services")}
            subtitle={t("home.servicesIntro")}
          />
          <Reveal
            duration={1.5}
            delay={0.5}
            distance={80}
            className="flex flex-wrap justify-center gap-6"
          >
            <ServicesSlider />
          </Reveal>
        </div>
      </div>

      {/* Section Achievement */}
      <VideoGallery />

      {/* Section Partner */}
      <div className="container-site py-20">
        <SectionHeader
          title={t("home.partners")}
          subtitle={t("home.partnersIntro")}
        />
        <Reveal
          duration={1.5}
          delay={0.5}
          distance={80}
          className="flex flex-wrap justify-center gap-6"
        >
          <PartnersSlider />
        </Reveal>
      </div>

      {/* Section Devis */}
      <div id="devis" />
      <div className="py-20 bg-gray-50">
        <div className="container-site">
          <Reveal>
            <h1 className="section-title text-secondary mb-3">
              {t("home.quote")}
            </h1>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal
              direction="right"
              duration={1.3}
              delay={0.3}
              distance={50}
              className="space-y-3"
            >
              <p>{t("home.quoteIntro")}</p>
              <p>{t("home.quoteText")}</p>
              <div className="space-y-3">
                {CONTACT_INFO.map((c, key) => (
                  <div key={key} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-secondary rounded-lg flex justify-center items-center">
                      <c.icon size={16} className="text-white font-medium" />
                    </div>

                    <p className="flex-1">{c.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="left" duration={1.5} delay={0.5} distance={80}>
              <DevisForm />
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
