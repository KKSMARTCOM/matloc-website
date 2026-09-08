"use client";

import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { ArrowRightIcon } from "lucide-react";

const FEATURABLE_WIDGET_ID = "8a7b4795-c64f-412e-b2a4-817c59e7e5a9";
const PLACE_ID = "ChIJHQlm3AFVIxART-bzHBee1PY";
const GOOGLE_REVIEWS_URL = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

export function GoogleReviews() {
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      <ReactGoogleReviews
        layout="carousel"
        widgetVersion="v2"
        carouselBtnLeftClassName="hidden"
        featurableId={FEATURABLE_WIDGET_ID}
      />
      <div className="text-center">
        <Link
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 text-white bg-primary hover:bg-primary-hover rounded-md font-[600] inline-flex items-center gap-2"
        >
          {t("actions.seeMore")}
          <ArrowRightIcon size={18} />
        </Link>
      </div>
    </div>
  );
}
