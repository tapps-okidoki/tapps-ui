'use client';
import React from 'react';
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

export function PopularSlider() {
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
            <p className="text-tapps-gray text-xs">{popular.description}</p>
          </div>
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, FreeMode, Autoplay]}
        spaceBetween={20}
        navigation={true}
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
    </div>
  );
}
