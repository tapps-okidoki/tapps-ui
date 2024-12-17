'use client';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { IShowSidebarStatus } from '@tapps/types';
import { UrlObject } from 'url';
import { AppContext } from '@tapps/contexts/AppContext';

export function Navbar() {
  const { showSideBar, setShowSideBar } = useContext(AppContext);
  const onRenderNavItems = () => {
    const navItems = [
      { id: 'ton', name: 'Ton', link: '#' },
      { id: 'telegram', name: 'Telegram', link: '#' },
    ];

    return navItems.map((i) => {
      return (
        <Link
          key={i.id}
          href={i.link as unknown as UrlObject}
          className="font-bold hover:underline"
        >
          {i.name}
        </Link>
      );
    });
  };

  const onHandleShowSideBar = () => {
    if (setShowSideBar)
      setShowSideBar(
        showSideBar === IShowSidebarStatus.show
          ? IShowSidebarStatus.hide
          : IShowSidebarStatus.show,
      );
  };

  return (
    <section className="sticky top-0 z-20 flex w-full items-center justify-between gap-3 border-b-[0.5px] border-b-tapps-white/20 bg-tapps-light-black px-6 py-3 transition-all duration-300 hover:brightness-110">
      <FontAwesomeIcon
        icon={faBars}
        size="xl"
        className="cursor-pointer"
        onClick={onHandleShowSideBar}
      />
      <nav className="flex items-center gap-3">{onRenderNavItems()}</nav>
      <div className="flex items-center gap-5 text-sm font-bold">
        <Image
          src="/google.svg"
          alt="Google Icon"
          width={20000}
          height={20000}
          className="hidden h-6 w-6 md:block"
        />
        <button className="hidden rounded-full bg-tapps-blue px-3 py-2 md:block">
          Sign up
        </button>
        <button className="py-2">Log in</button>
      </div>
    </section>
  );
}
