import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
// import { PopularSlider } from './Sliders/PopularSlider';
import { GamesSlider } from './Sliders/GamesSlider';
import { PromoteAppsSlider } from './Sliders/PromotedAppsSlider';
import { ECategoryName } from '@tapps/types/enum';
import { BaseAppSectionCard } from './BaseAppSectionCard/BaseAppSectionCard';
import { useSidebar } from '@tapps/components/ui/sidebar';
import { PopularSlider } from './Sliders/PopularSlider';
import { Footer } from './Footer/Footer';

export function HomePanel() {
  const { open } = useSidebar();
  const onRenderSections = () => {
    const sectionList = [
      {
        title: 'Promoted App',
        content: <PromoteAppsSlider cate={ECategoryName.EXCHANGE} />,
        subtitle: '',
        id: 'promote-app',
      },
      {
        title: 'Most Popular',
        content: <PopularSlider />,
        subtitle: '',
        id: 'popular',
      },
      {
        title: 'Wallet',
        content: <BaseAppSectionCard cate={ECategoryName.WALLETS} />,
        subtitle: 'Store and manage your crypto assets',
        id: 'wallet',
      },
      {
        title: 'Exchanges DEX',
        content: <BaseAppSectionCard cate={ECategoryName.EXCHANGE_DEX} />,
        subtitle: 'Buy, sell and swap TON or wTON',
        id: 'exchanges',
      },
      {
        title: 'Marketplaces',
        content: <BaseAppSectionCard cate={ECategoryName.SHOPPING} />,
        subtitle: 'Store and manage your crypto assets',
        id: 'marketplaces',
      },
      {
        title: 'Games',
        content: <GamesSlider />,
        subtitle: 'Buy, sell and swap TON or wTON',
        id: 'games',
      },
      {
        title: 'Staking',
        content: <BaseAppSectionCard cate={ECategoryName.STAKING} />,
        subtitle: 'Experience social networks powered by TON Blockchain',
        id: 'staking',
      },
      {
        title: 'Social',
        content: <BaseAppSectionCard cate={ECategoryName.SOCIAL} />,
        subtitle: 'Experience social networks powered by TON Blockchain',
        id: 'social',
      },
      {
        title: 'Gambling',
        content: <BaseAppSectionCard cate={ECategoryName.GAMBLING} />,
        subtitle: '',
        id: 'gambling',
      },
      {
        title: 'Tools',
        content: <BaseAppSectionCard cate={ECategoryName.DEV_TOOLS} />,
        subtitle: 'Experience social networks powered by TON Blockchain',
        id: 'tools',
      },
      {
        title: 'Shopping',
        content: <BaseAppSectionCard cate={ECategoryName.SHOPPING} />,
        subtitle: '',
        id: 'shopping',
      },
    ];

    return sectionList.map((section) => {
      return (
        <section
          id={section.id}
          key={section.title}
          className="flex w-full flex-col gap-5"
        >
          <div className="flex items-center justify-between gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold md:text-3xl">{section.title}</h2>
              <p className="text-sm text-tapps-gray md:text-base">
                {section.subtitle}
              </p>
            </div>
            <button className="flex items-center gap-4 whitespace-nowrap text-sm hover:underline hover:brightness-125 md:text-base">
              See All
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          {section.content}
        </section>
      );
    });
  };

  return (
    <div
      className={`${open ? 'md:w-[calc(100svw-18rem)]' : 'md:w-[calc(100svw-4rem)]'} flex flex-col items-center gap-5 md:gap-16`}
    >
      <section className="bg-home-frame-1 px-5 text-center md:px-16">
        <div className="mt-12 flex flex-col items-center gap-20 lg:mt-32 lg:gap-32">
          <h1 className="text-2xl font-black dark:text-tapps-purple md:text-4xl">
            Explore 1079 apps in TON Ecosystem
          </h1>
          <div className="flex flex-wrap gap-6">
            <div className="w-full md:flex-1">
              <Image
                src="/frames/frame-2.png"
                alt="Frame 2"
                width={600}
                height={400}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="w-full md:flex-1">
              <Image
                src="/frames/frame-3.png"
                alt="Frame 3"
                width={600}
                height={400}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex w-full flex-col items-center gap-5 px-5 md:mt-0 md:gap-16 md:px-16">
        {onRenderSections()}
      </div>
      <Footer />
    </div>
  );
}
