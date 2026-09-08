"use client";

import { ReactGoogleReviews } from "react-google-reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FEATURABLE_WIDGET_ID = "8a7b4795-c64f-412e-b2a4-817c59e7e5a9";
const PLACE_ID = "ChIJHQlm3AFVIxART-bzHBee1PY";
const GOOGLE_REVIEWS_URL = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

export default function CustomGoogleReviews() {
  return (
    <div className="space-y-8">
      <ReactGoogleReviews
        layout="custom"
        featurableId={FEATURABLE_WIDGET_ID}
        widgetVersion="v2"
        renderer={(reviews) => (
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            loop
            slidesPerView={1.2}
            centeredSlides
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 3, centeredSlides: false },
            }}
            className="pb-12! w-full reviews-slider"
          >
            {reviews.map(({ reviewId, reviewer, comment, starRating }) => (
              <SwiperSlide key={reviewId} className="h-auto">
                <div className="bg-white p-6 rounded-lg shadow-md h-60 flex flex-col gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        className={
                          i < starRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-md text-gray-600 line-clamp-5 flex-1">
                    {comment}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    {reviewer.profilePhotoUrl && (
                      <Image
                        width={32}
                        height={32}
                        src={reviewer.profilePhotoUrl}
                        alt={reviewer.displayName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span className="font-[600]">{reviewer.displayName}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      />

      <div className="text-center">
        <Link
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 rounded-md border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors duration-200"
        >
          Voir plus d&apos;avis sur Google
        </Link>
      </div>
    </div>
  );
}
