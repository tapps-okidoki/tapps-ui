'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode, Keyboard } from 'swiper/modules';
import { IGameItem } from '@tapps/types';
import Image from 'next/image';
import { faApple, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faRobot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export function GamesSlider() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onRenderGames = () => {
    const gamesList: IGameItem[] = Array.from({ length: 20 }, () => ({
      id: crypto.randomUUID().slice(0, 5),
      image: `/game/game-1.png`,
      title: 'Hamsterdam',
      description:
        'Hyper realistic 5D simulator of startup CEO. Develop the project and collect money from hamsters!',
      links: {
        apple: '',
        android: '',
        telegram: '',
        web: '',
      },
    }));
    return gamesList?.map((game, index) => {
      return (
        <SwiperSlide title={game.description} key={game.id}>
          <div
            className={`relative ${
              index === activeIndex
                ? 'bg-gradient-custom rounded-2xl p-[1px]'
                : 'scale-75'
            } cursor-pointer transition-all duration-300`} // Special effect for center slide
          >
            <div className="overflow-hidden rounded-2xl bg-tapps-light-black">
              <Image
                className="h-auto w-full object-contain transition-all duration-300 hover:brightness-110"
                src={game.image}
                alt={game.description}
                width={90000000}
                height={90000000}
                loading="eager"
              />
              <div className="flex flex-col gap-3 p-3">
                <h3 className="font-bold">{game.title}</h3>
                <p className="line-clamp-2 text-xs text-tapps-gray">
                  {game.description}
                </p>
                <div className="mx-auto h-[0.5px] w-full rounded-full bg-tapps-lighter-black"></div>
                <div className="flex gap-4 text-tapps-gray">
                  <Link href={game.links.apple}>
                    <FontAwesomeIcon icon={faApple} />
                  </Link>
                  <Link href={game.links.android}>
                    <FontAwesomeIcon icon={faRobot} />
                  </Link>
                  <Link href={game.links.telegram}>
                    <FontAwesomeIcon icon={faTelegram} />
                  </Link>
                  <Link href={game.links.web}>
                    <FontAwesomeIcon icon={faGlobe} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="w-full">
      <div className="bg-firefly-radial relative py-14">
        <Swiper
          className=""
          modules={[FreeMode, Autoplay, Keyboard]}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={true}
          slidesPerView={3}
          loop
          freeMode
          style={{ zIndex: '0' }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex); // Set active index when slide changes
          }}
          centeredSlides={true}
        >
          {onRenderGames()}
        </Swiper>
      </div>
    </div>
  );
}
