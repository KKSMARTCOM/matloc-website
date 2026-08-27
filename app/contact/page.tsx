"use client";

import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_INFO, MAPS_QUERY } from "@/public/assets/assets";
import { ClockIcon } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const ContactPage = () => {
  const { t } = useI18n();
  return (
    <>
      {/* Section Hero */}
      <PageHero title={t("pages.contact")} url="/assets/images/banner.jpg" />

      <div className="container-site py-16">
        <div className="block md:flex items-start gap-10">
          <Reveal
            direction="right"
            className="w-full md:w-1/3 flex flex-col space-y-8 border-t-2 border-primary"
          >
            <div className="py-6 px-4 space-y-6">
              <h1 className="section-title text-secondary">
                {t("pages.coordinates")}
              </h1>
              <div className="space-y-2">
                {CONTACT_INFO.map((c, key) => (
                  <div key={key} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/20 flex justify-center items-center">
                      <c.icon
                        size={16}
                        className="text-secondary font-medium"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-[600]">{c.title}</h2>
                      <p>{c.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-68 border border-gray-100">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation MATLOC"
              />
            </div>
          </Reveal>
          <Reveal
            direction="left"
            duration={1.3}
            delay={0.3}
            distance={50}
            className="flex-1 flex flex-col space-y-8 mt-8 md:mt-0"
          >
            <ContactForm />
            <div className="space-y-4 p-6 bg-primary/20">
              <div className="flex items-center gap-2">
                <ClockIcon size={20} className="text-primary" />
                <p className="flex-1 font-[600] section-subtitle">
                  {t("pages.hours")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p>{t("pages.weekdays")}</p>
                <p>{t("pages.hoursValue")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
