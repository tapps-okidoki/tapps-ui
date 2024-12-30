'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode, Keyboard } from 'swiper/modules';
import Image from 'next/image';
import { faApple, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faRobot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useGetAppByCategory } from '@tapps/hooks/useGetAppByCategory';
import { ECategoryName } from '@tapps/types/enum';
import TappsLoading from '@tapps/components/Loading';

export function GamesSlider() {
  const { data, isLoading } = useGetAppByCategory({
    category: ECategoryName.GAMES,
  });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onRenderGames = () => {
    return (data?.apps ?? [])?.map((game, index) => {
      const onRenderOutBoundLinks = () => {
        const linkArray = [
          {
            name: 'Apple',
            icon: <FontAwesomeIcon icon={faApple} />,
            link: '',
            existed: Boolean(''),
          },
          {
            name: 'Android',
            icon: <FontAwesomeIcon icon={faRobot} />,
            link: '',
            existed: Boolean(''),
          },
          {
            name: 'Telegram',
            icon: <FontAwesomeIcon icon={faTelegram} />,
            link: game.offcial_links
              ? `https://t.me/${game.offcial_links?.split('@')[1]}`
              : '',
            existed:
              game.is_telegram_mini_app !==
                'TON App is not responsible for any of the apps in the catalog. Using this app you take your own risks. Read our Disclaimer Terms and Privacy Policy' &&
              game.is_telegram_mini_app,
          },
          {
            name: 'Web',
            icon: <FontAwesomeIcon icon={faGlobe} />,
            link: game.app_link ?? '',
            existed: Boolean(game.app_link),
          },
        ];
        return linkArray.map((i, linkIndex) => {
          return i.existed ? (
            <Link
              target="_blank"
              href={i.link}
              key={i.name + (Math.random() * linkIndex).toString()}
            >
              {i.icon}
            </Link>
          ) : null;
        });
      };
      return (
        <SwiperSlide title={game.app_long_des} key={game._id}>
          <div
            className={`relative ${
              index === activeIndex
                ? 'rounded-2xl bg-gradient-custom p-[1px]'
                : 'scale-75'
            } cursor-pointer transition-all duration-300`} // Special effect for center slide
          >
            <div className="overflow-hidden rounded-2xl bg-tapps-light-black">
              <Image
                className="h-auto w-full object-contain transition-all duration-300 hover:brightness-110"
                src={`/game/game-1.png`}
                alt={game.app_long_des}
                width={90000000}
                height={90000000}
                loading="eager"
              />
              <div className="flex flex-col gap-3 p-3">
                <h3 className="text-sm font-bold md:text-base">
                  {game.app_name}
                </h3>
                <p className="line-clamp-2 text-[11px] text-tapps-gray md:text-xs">
                  {game.app_short_des !== '0'
                    ? game.app_short_des
                    : game.app_long_des !== '0'
                      ? game.app_long_des
                      : 'No description.'}
                </p>
                <div className="mx-auto h-[0.5px] w-full rounded-full bg-tapps-lighter-black"></div>
                <div className="flex gap-4 text-tapps-gray">
                  {onRenderOutBoundLinks()}
                </div>
              </div>
            </div>
          </div>
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
    <div className="w-full">
      <div className="relative bg-firefly-radial py-14">
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
          breakpoints={{
            375: {
              slidesPerView: 1.8,
            },
            768: {
              slidesPerView: 3,
            },
          }}
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
