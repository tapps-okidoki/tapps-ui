import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICardItem, IPromotedAppItem } from '@tapps/types';
import Image from 'next/image';
import React from 'react';
import { PopularSlider } from './PopularSlider';
import { Card } from './Card';
import { GamesSlider } from './GamesSlider';

export function HomePanel() {
  const onRenderPromotedApps = () => {
    const promotedAppList: IPromotedAppItem[] = Array.from(
      { length: 15 },
      () => ({
        id: crypto.randomUUID().slice(0, 5),
        image: `/promoteapps/promote-1.png`,
      }),
    );
    const centerIndex = Math.floor(promotedAppList.length / 2);

    return promotedAppList.map((app, index) => {
      // Calculate opacity based on the distance from the center
      const distanceFromCenter = Math.abs(centerIndex - index);
      const maxDistance = Math.ceil(promotedAppList.length / 2);
      const opacity = 1 - distanceFromCenter / maxDistance;

      return (
        <div
          key={app.id}
          className="flex-1 cursor-pointer transition-transform hover:scale-110"
          style={{ opacity }}
        >
          <Image
            src={app.image}
            alt={`App ${index + 1}`}
            height={200}
            width={200}
            className="h-auto w-full object-contain"
          />
        </div>
      );
    });
  };

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

  const onRenderSections = () => {
    const sectionList = [
      {
        title: 'Promoted App',
        content: <div className="flex gap-6">{onRenderPromotedApps()}</div>,
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
          <div className="grid grid-flow-row grid-cols-3 gap-5">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Store and manage your crypto assets',
      },
      {
        title: 'Exchanges DEX',
        content: (
          <div className="grid grid-flow-row grid-cols-3 gap-5">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Buy, sell and swap TON or wTON',
      },
      {
        title: 'Marketplaces',
        content: (
          <div className="grid grid-flow-row grid-cols-3 gap-5">
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
          <div className="grid grid-flow-row grid-cols-3 gap-5">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Experience social networks powered by TON Blockchain',
      },
      {
        title: 'Social',
        content: (
          <div className="grid grid-flow-row grid-cols-3 gap-5">
            {onRenderCards()}
          </div>
        ),
        subtitle: 'Experience social networks powered by TON Blockchain',
      },
      {
        title: 'Tools',
        content: (
          <div className="grid grid-flow-row grid-cols-3 gap-5">
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
              <h2 className="text-3xl font-bold">{section.title}</h2>
              <p className="text-tapps-gray">{section.subtitle}</p>
            </div>
            <button className="flex items-center gap-4 text-tapps-blue hover:underline hover:brightness-125">
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
    <div className="flex w-full flex-col items-center gap-16">
      <section className="bg-home-frame-1 h-[60dvh] px-16">
        <div className="mt-32 flex flex-col items-center gap-32">
          <h1 className="text-4xl font-black text-tapps-purple">
            Explore 1079 apps in TON Ecosystem
          </h1>
          <div className="flex gap-6">
            <div className="flex-1">
              <Image
                src="/frames/frame-2.png"
                alt="Frame 2"
                width={600}
                height={400}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="flex-1">
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
      <div className="flex w-full flex-col items-center gap-16 px-16">
        {onRenderSections()}
      </div>
    </div>
  );
}
