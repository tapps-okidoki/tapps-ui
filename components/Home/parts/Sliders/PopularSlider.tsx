'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { IMostPopularItem } from '@tapps/types';
import Image from 'next/image';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

export function PopularSlider() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const onRenderMostPopular = () => {
    const mostPopularList: IMostPopularItem[] = Array.from(
      { length: 20 },
      () => ({
        id: crypto.randomUUID().slice(0, 5),
        image: `/popular/popular-1.png`,
        title: 'Just Update: Weekly Race',
        description:
          'Uncover hidden treasures with Sherbet’s all-new Scavenger Hunt promotion.',
      }),
    );
    return mostPopularList?.map((popular) => {
      return (
        <SwiperSlide title={popular.description} key={popular.id}>
          <Image
            className="h-auto w-full rounded-2xl object-contain transition-all duration-300 hover:brightness-110"
            src={popular.image}
            alt={popular.description}
            width={90000000}
            height={90000000}
            loading="eager"
          />
          <div className="mt-3 flex flex-col gap-3">
            <h3 className="text-sm font-bold">{popular.title}</h3>
            <p className="line-clamp-2 text-xs text-tapps-gray">
              {popular.description}
            </p>
          </div>
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="relative w-full">
      <Swiper
        className=""
        modules={[Navigation, FreeMode, Autoplay]}
        spaceBetween={20}
        navigation={{
          prevEl: navigationPrevRef.current ?? '#prevButton',
          nextEl: navigationNextRef.current ?? '#nextButton',
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        freeMode
        style={{ zIndex: '0' }}
        breakpoints={{
          375: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {onRenderMostPopular()}
      </Swiper>
      <button
        id="prevButton"
        ref={navigationPrevRef}
        className="absolute left-0 top-1/2 z-10 -translate-x-[150%] -translate-y-1/2 opacity-60 transition-transform duration-300 hover:opacity-100"
      >
        <CircleArrowLeft />
      </button>
      <button
        id="nextButton"
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-[150%] opacity-60 transition-transform duration-300 hover:opacity-100"
        ref={navigationNextRef}
      >
        <CircleArrowRight />
      </button>
    </div>
  );
}
