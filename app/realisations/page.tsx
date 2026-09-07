"use client";

import AchievementGallery from "@/components/AchievementGallery";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/contexts/I18nContext";
import { useCmsSettings } from "@/hooks/useCmsSettings";

const AchievementPage = () => {
  const { t } = useI18n();
  const cms    = useCmsSettings("realisations");
  const images = useCmsSettings("images");
  return (
    <>
      <PageHero title={cms.get("realisations_hero_title", t("pages.projects"))} url={images.get("img_banner_realisations", "/assets/images/banner.jpg")} />
      <div className="container-site py-16">
        <SectionHeader
          title={cms.get("realisations_title", t("pages.projectTitle"))}
          subtitle={cms.get("realisations_subtitle", t("home.partnersIntro"))}
        />

        <AchievementGallery />
      </div>

      <CtaBanner />
    </>
  );
};

export default AchievementPage;
