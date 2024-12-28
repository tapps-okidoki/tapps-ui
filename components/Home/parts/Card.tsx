import { faApple, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faRobot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IGetAllAppsResResultAppItem } from '@tapps/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  card: IGetAllAppsResResultAppItem;
  index: number;
}

export function Card({ card, index }: Props) {
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
        link:
          card.offcial_links !== '0'
            ? `https://t.me/${card.offcial_links.split('@')[1]}`
            : '',
        existed:
          card.is_telegram_mini_app !==
            'TON App is not responsible for any of the apps in the catalog. Using this app you take your own risks. Read our Disclaimer Terms and Privacy Policy' &&
          card.is_telegram_mini_app !== '0',
      },
      {
        name: 'Web',
        icon: <FontAwesomeIcon icon={faGlobe} />,
        link: card.app_link ?? '',
        existed: Boolean(card.app_link),
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
    <div className="flex flex-col justify-between gap-2 rounded-xl border border-tapps-gray bg-tapps-light-black p-3 lg:flex-row lg:gap-4">
      <div className="flex-1">
        <Image
          src={`/card/card-1.png`}
          alt={`Card ${index + 1}`}
          height={200}
          width={200}
          className="aspect-square w-full object-contain"
        />
      </div>
      <div className="flex flex-[2.5] flex-col justify-between gap-2 md:gap-1">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold md:text-base">
            {card.app_name}
          </h3>
          <div className="grid h-5 w-5 place-items-center rounded-md bg-tapps-lighter-black text-tapps-gray">
            <p className="text-xs">1</p>
          </div>
        </div>
        <p className="line-clamp-2 text-[11px] text-tapps-gray md:text-xs">
          {card.app_short_des !== '0'
            ? card.app_short_des
            : card.app_long_des !== '0'
              ? card.app_long_des
              : 'No description.'}
        </p>
        <div className="flex gap-3 text-xs text-tapps-gray">
          {onRenderOutBoundLinks()}
        </div>
      </div>
    </div>
  );
}
