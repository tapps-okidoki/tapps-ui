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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

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
            <p className="text-xs text-tapps-gray">{popular.description}</p>
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
        slidesPerView={4}
        loop
        freeMode
        style={{ zIndex: '0' }}
      >
        {onRenderMostPopular()}
      </Swiper>
      <button
        id="prevButton"
        ref={navigationPrevRef}
        className="absolute left-0 top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-tapps-gray bg-tapps-lighter-black opacity-80 hover:opacity-100"
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <button
        id="nextButton"
        className="absolute right-0 top-1/2 z-10 h-7 w-7 -translate-y-1/2 translate-x-1/2 rounded-full border-[1px] border-tapps-gray bg-tapps-lighter-black opacity-80 hover:opacity-100"
        ref={navigationNextRef}
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
}
