"use client";

import { ReactGoogleReviews } from "react-google-reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { StarIcon } from "lucide-react";
import Image from "next/image";

const FEATURABLE_WIDGET_ID = "8a7b4795-c64f-412e-b2a4-817c59e7e5a9";

export default function GoogleReviews() {
  return (
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
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12! w-full reviews-slider"
        >
          {reviews.map(({ reviewId, reviewer, comment, starRating }) => (
            <SwiperSlide key={reviewId} className="h-auto">
              <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col gap-3">
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
                <p className="text-sm text-gray-600 line-clamp-5 flex-1">
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
                  <span className="font-semibold text-sm">
                    {reviewer.displayName}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    />
  );
}
