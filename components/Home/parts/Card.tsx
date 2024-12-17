import { faApple, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faRobot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICardItem } from '@tapps/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  card: ICardItem;
  index: number;
}

export function Card({ card, index }: Props) {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border border-tapps-gray bg-tapps-light-black p-3 md:flex-row md:gap-4">
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
          <h3 className="text-sm font-semibold md:text-base">{card.title}</h3>
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
}
