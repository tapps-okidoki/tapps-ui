'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/keyboard';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { useDeviceScreen } from '@tapps/hooks/useMobileScreen';
import { useGetAppByCategory } from '@tapps/hooks/useGetAppByCategory';
import { ECategoryName } from '@tapps/types/enum';
import TappsLoading from '@tapps/components/Loading';

interface Props {
  cate: ECategoryName;
}

export function PromoteAppsSlider({ cate }: Props) {
  const { data, isLoading } = useGetAppByCategory({ category: cate });
  const isMobile = useDeviceScreen('768px');
  const isTablet = useDeviceScreen('1024px');
  const visibleSlides = isTablet ? 10 : isMobile ? 5 : 15;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onRenderMostPopular = () => {
    return data?.apps?.map((app, index) => {
      const distanceFromCenter = Math.abs(activeIndex - index);
      const maxDistance = Math.ceil(visibleSlides / 2);
      const opacity = 1 - distanceFromCenter / maxDistance;
      return (
        <SwiperSlide title={app.app_name} key={app._id}>
          <Link
            href={`/apps/${app._id}`}
            className="flex-1 cursor-pointer transition-transform"
          >
            <Image
              className="h-auto w-full rounded-full border border-transparent object-contain hover:border-tapps-white"
              src={app.app_image}
              alt={app.app_name ?? `app ${index}`}
              width={90000000}
              height={90000000}
              loading="eager"
              style={{ opacity }}
            />
          </Link>
        </SwiperSlide>
      );
    });
  };
  if (isLoading) {
    return <TappsLoading />;
  }

  if (!data) {
    return <></>;
  }
  return (
    <div className="relative w-full">
      <Swiper
        className=""
        initialSlide={Math.floor(visibleSlides / 2)}
        modules={[FreeMode, Autoplay]}
        spaceBetween={20}
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
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 10,
          },
          1024: {
            slidesPerView: 15,
          },
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex); // Set active index when slide changes
        }}
        centeredSlides={true}
      >
        {onRenderMostPopular()}
      </Swiper>
    </div>
  );
}
