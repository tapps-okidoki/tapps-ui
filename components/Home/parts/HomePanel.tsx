import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import { PopularSlider } from './PopularSlider';
import { GamesSlider } from './GamesSlider';
import { PromoteAppsSlider } from './PromotedAppsSlider';
import { ECategoryName } from '@tapps/types/enum';
import { BaseAppSectionCard } from './BaseAppSectionCard';

export function HomePanel() {
  const onRenderSections = () => {
    const sectionList = [
      {
        title: 'Promoted App',
        content: <PromoteAppsSlider cate={ECategoryName.EXCHANGE} />,
        subtitle: '',
      },
      {
        title: 'Most Popular',
        content: <PopularSlider />,
        subtitle: '',
      },
      {
        title: 'Wallet',
        content: <BaseAppSectionCard cate={ECategoryName.WALLETS} />,
        subtitle: 'Store and manage your crypto assets',
      },
      {
        title: 'Exchanges DEX',
        content: <BaseAppSectionCard cate={ECategoryName.EXCHANGE_DEX} />,
        subtitle: 'Buy, sell and swap TON or wTON',
      },
      {
        title: 'Marketplaces',
        content: <BaseAppSectionCard cate={ECategoryName.SHOPPING} />,
        subtitle: 'Store and manage your crypto assets',
      },
      {
        title: 'Games',
        content: <GamesSlider />,
        subtitle: 'Buy, sell and swap TON or wTON',
      },
      {
        title: 'Staking',
        content: <BaseAppSectionCard cate={ECategoryName.STAKING} />,
        subtitle: 'Experience social networks powered by TON Blockchain',
      },
      {
        title: 'Social',
        content: <BaseAppSectionCard cate={ECategoryName.SOCIAL} />,
        subtitle: 'Experience social networks powered by TON Blockchain',
      },
      {
        title: 'Tools',
        content: <BaseAppSectionCard cate={ECategoryName.DEV_TOOLS} />,
        subtitle: 'Experience social networks powered by TON Blockchain',
      },
    ];

    return sectionList.map((section) => {
      return (
        <section key={section.title} className="flex w-full flex-col gap-5">
          <div className="flex items-center justify-between gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold md:text-3xl">{section.title}</h2>
              <p className="text-sm text-tapps-gray md:text-base">
                {section.subtitle}
              </p>
            </div>
            <button className="flex items-center gap-4 whitespace-nowrap text-sm text-tapps-blue hover:underline hover:brightness-125 md:text-base">
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
    <div className="flex w-full flex-col items-center gap-5 md:gap-16">
      <section className="bg-home-frame-1 h-[40dvh] px-5 text-center md:h-[35dvh] md:px-16 lg:h-[60dvh]">
        <div className="mt-12 flex flex-col items-center gap-20 lg:mt-32 lg:gap-32">
          <h1 className="text-2xl font-black text-tapps-purple md:text-4xl">
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
      <div className="mt-64 flex w-full flex-col items-center gap-5 px-5 md:mt-0 md:gap-16 md:px-16">
        {onRenderSections()}
      </div>
    </div>
  );
}
