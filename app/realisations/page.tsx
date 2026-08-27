"use client";

import AchievementGallery from "@/components/AchievementGallery";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/contexts/I18nContext";

const AchievementPage = () => {
  const { t } = useI18n();
  return (
    <>
      <PageHero title={t("pages.projects")} url="/assets/images/banner.jpg" />

      <div className="container-site py-16">
        <SectionHeader
          title={t("pages.projectTitle")}
          subtitle={t("home.partnersIntro")}
        />

        <AchievementGallery />
      </div>

      <CtaBanner />
    </>
  );
};

export default AchievementPage;
