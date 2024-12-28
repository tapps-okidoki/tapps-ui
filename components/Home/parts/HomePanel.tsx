import {
  faChevronRight,
  faGlobe,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICardItem, IGetAllAppsResResultAppItem } from '@tapps/types';
import Image from 'next/image';
import React from 'react';
import { PopularSlider } from './PopularSlider';
import { Card } from './Card';
import { GamesSlider } from './GamesSlider';
import { useGetAppList } from '@tapps/hooks/useGetAppList';
import { PromoteAppsSlider } from './PromotedAppsSlider';
import TappsLoading from '@tapps/components/Loading';
import { ECategoryName } from '@tapps/types/enum';
import Link from 'next/link';
import { faApple, faTelegram } from '@fortawesome/free-brands-svg-icons';

export function HomePanel() {
  const { data, isLoading } = useGetAppList();
  const onRenderCards = (apps?: IGetAllAppsResResultAppItem[]) => {
    if (apps) {
      return (apps ?? [])
        .sort((a, b) => Number(a.app_position) - Number(b.app_position))
        .slice(0, 9)
        .map((card, index) => {
          return (
            <Card
              key={card._id + Math.random().toString()}
              card={card}
              index={index}
            />
          );
        });
    } else {
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
        return (
          <div
            key={card.id}
            className="flex flex-col justify-between gap-2 rounded-xl border border-tapps-gray bg-tapps-light-black p-3 lg:flex-row lg:gap-4"
          >
            <div className="flex-1">
              <Image
                src={card.image}
                alt={`Card ${index + 1}`}
                height={200}
                width={200}
                className="aspect-square w-full object-contain"
              />
            </div>
            <div className="flex flex-[2.5] flex-col justify-between gap-2 md:gap-1">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold md:text-base">
                  {card.title}
                </h3>
                <div className="grid h-5 w-5 place-items-center rounded-md bg-tapps-lighter-black text-tapps-gray">
                  <p className="text-xs">{card.count}</p>
                </div>
              </div>
              <p className="line-clamp-2 text-[11px] text-tapps-gray md:text-xs">
                {card.description}
              </p>
              <div className="flex gap-3 text-xs text-tapps-gray">
                <Link href={card.links.apple}>
                  <FontAwesomeIcon icon={faApple} />
                </Link>
                <Link href={card.links.android}>
                  <FontAwesomeIcon icon={faRobot} />
                </Link>
                <Link href={card.links.telegram}>
                  <FontAwesomeIcon icon={faTelegram} />
                </Link>
                <Link href={card.links.web}>
                  <FontAwesomeIcon icon={faGlobe} />
                </Link>
              </div>
            </div>
          </div>
        );
      });
    }
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
        content: (
          <PromoteAppsSlider
            appList={
              data?.find((i) => i.cateory.name === ECategoryName.EXCHANGE)
                ?.apps ?? []
            }
          />
        ),
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
            {onRenderCards(
              data.find((i) => i.cateory.name === ECategoryName.WALLET)?.apps,
            )}
          </div>
        ),
        subtitle: 'Store and manage your crypto assets',
      },
      {
        title: 'Exchanges DEX',
        content: (
          <div className="grid grid-flow-row grid-cols-2 gap-5 md:grid-cols-3">
            {onRenderCards(
              data.find((i) => i.cateory.name === ECategoryName.EXCHANGE)?.apps,
            )}
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
            {onRenderCards(
              data.find((i) => i.cateory.name === ECategoryName.STAKING)?.apps,
            )}
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
