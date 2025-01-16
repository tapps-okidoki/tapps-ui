import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function Footer() {
  const onRenderFooterList = () => {
    const linkList = [
      {
        title: 'For Developers',
        links: [
          { name: 'Submit your dApp', link: '#' },
          { name: 'Support', link: '#' },
          { name: 'App promotion', link: '#' },
        ],
      },
      {
        title: 'Discover',
        links: [
          { name: 'Home', link: '/' },
          { name: 'Categories', link: '#' },
        ],
      },
      {
        title: 'Social',
        links: [
          { name: 'Telegram', link: '#' },
          { name: 'News', link: '#' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { name: 'Disclaim', link: '#' },
          { name: 'Terms', link: '#' },
          { name: 'Privacy', link: '#' },
        ],
      },
    ];
    return linkList.map((item) => {
      return (
        <div key={JSON.stringify(item)} className="flex flex-col gap-5">
          <h3 className="font-semibold md:text-lg">{item.title}</h3>
          <div className="flex flex-col gap-2 text-sm md:gap-4 md:text-base">
            {item.links.map((iLink) => {
              return (
                <Link
                  href={iLink.link ?? ''}
                  key={iLink.name}
                  className="text-tapps-gray hover:text-black dark:hover:text-tapps-white"
                >
                  {iLink.name}
                </Link>
              );
            })}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full px-5 pb-3 pt-8 md:mt-0 md:px-16 md:pb-3 md:pt-20">
      <div className="flex w-full flex-wrap items-start justify-between gap-5 md:gap-16">
        <Image
          src="/logo/logo.png"
          alt="Frame 2"
          width={20000}
          height={20000}
          className="aspect-square w-16 rounded-full bg-black object-contain p-2 dark:bg-transparent"
        />
        <div className="grid grid-flow-row grid-cols-2 gap-14 md:flex md:gap-20">
          {onRenderFooterList()}
        </div>
      </div>
      <div className="mx-auto mb-3 mt-8 h-[0.5px] w-full rounded-full bg-tapps-gray"></div>
      <div className="flex w-full flex-wrap justify-between gap-3 text-sm font-medium text-tapps-white/80 md:text-base">
        <p>Developing for TON</p>
        <p>© 2024 TON App</p>
      </div>
    </div>
  );
}
