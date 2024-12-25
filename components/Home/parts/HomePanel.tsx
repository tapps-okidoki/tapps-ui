import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICardItem } from '@tapps/types';
import Image from 'next/image';
import React from 'react';
import { PopularSlider } from './PopularSlider';
import { Card } from './Card';
import { GamesSlider } from './GamesSlider';
import { useGetAppList } from '@tapps/hooks/useGetAppList';
import { PromoteAppsSlider } from './PromotedAppsSlider';
import TappsLoading from '@tapps/components/Loading';

export function HomePanel() {
  const { data, isLoading } = useGetAppList();
  console.log('data: ', data?.apps);
  // const isMobile = useDeviceScreen('768px');
  // const onRenderPromotedApps = () => {
  //   const promotedAppList: IPromotedAppItem[] = Array.from(
  //     { length: isMobile ? 5 : 15 },
  //     () => ({
  //       id: crypto.randomUUID().slice(0, 5),
  //       image: `/promoteapps/promote-1.png`,
  //     }),
  //   );
  //   const centerIndex = Math.floor(promotedAppList.length / 2);

  //   return promotedAppList.map((app, index) => {
  //     // Calculate opacity based on the distance from the center
  //     const distanceFromCenter = Math.abs(centerIndex - index);
  //     const maxDistance = Math.ceil(promotedAppList.length / 2);
  //     const opacity = 1 - distanceFromCenter / maxDistance;

  //     return (
  //       <div
  //         key={app.id}
  //         className="flex-1 cursor-pointer transition-transform hover:scale-110"
  //         style={{ opacity }}
  //       >
  //         <Image
  //           src={app.image}
  //           alt={`App ${index + 1}`}
  //           height={200}
  //           width={200}
  //           className="h-auto w-full object-contain"
  //         />
  //       </div>
  //     );
  //   });
  // };

  const onRenderCards = () => {
    const cardList: ICardItem[] = Array.from({ length: 9 }, (_, index) => ({
      id: crypto.randomUUID().slice(0, 5),
      image: `/card/card-1.png`,
      title: `Swapter ${index}`,
      description:
        'The most feature-rich wallet and browser extension for TON – with multi-accounts, the most profitable staking and swaps, Ledger, tokens (jettons), NFT, TON DNS, TON Sites, TON Proxy, and TON Magic.',
      links: {
        apple: '',
        android: '',
        telegram: '',
        web: '',
      },
      count: index,
    }));
    return cardList.map((card, index) => {
      return <Card key={card.id} card={card} index={index} />;
    });
  };

  if (isLoading) {
    return <TappsLoading />;
  }

  if (!data) {
    return <></>;
  }

  const onRenderSections = () => {
    const sectionList = [
      {
        title: 'Promoted App',
        content: <PromoteAppsSlider appList={data?.apps} />,
        subtitle: '',
      },
      {
        title: 'Most Popular',
        content: <PopularSlider />,
        subtitle: '',
      },
      {
        title: 'Wallet',
        content: (
          <div className="grid grid-flow-row grid-cols-2 gap-5 md:grid-cols-3">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Store and manage your crypto assets',
      },
      {
        title: 'Exchanges DEX',
        content: (
          <div className="grid grid-flow-row grid-cols-2 gap-5 md:grid-cols-3">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Buy, sell and swap TON or wTON',
      },
      {
        title: 'Marketplaces',
        content: (
          <div className="grid grid-flow-row grid-cols-2 gap-5 md:grid-cols-3">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Store and manage your crypto assets',
      },
      {
        title: 'Games',
        content: <GamesSlider />,
        subtitle: 'Buy, sell and swap TON or wTON',
      },
      {
        title: 'Staking',
        content: (
          <div className="grid grid-flow-row grid-cols-2 gap-5 md:grid-cols-3">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Experience social networks powered by TON Blockchain',
      },
      {
        title: 'Social',
        content: (
          <div className="grid grid-flow-row grid-cols-2 gap-5 md:grid-cols-3">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Experience social networks powered by TON Blockchain',
      },
      {
        title: 'Tools',
        content: (
          <div className="grid grid-flow-row grid-cols-2 gap-5 md:grid-cols-3">
            {onRenderCards()}
          </div>
        ),
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
