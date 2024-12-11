import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function Navbar() {
  const onRenderNavItems = () => {
    const navItems = [
      { id: 'ton', name: 'Ton', link: '#' },
      { id: 'telegram', name: 'Telegram', link: '#' },
    ];

    return navItems.map((i) => {
      return (
        <Link key={i.id} href={i.link} className="font-bold hover:underline">
          {i.name}
        </Link>
      );
    });
  };
  return (
    <section className="bg-tapps-light-black flex w-full items-center justify-between gap-3 border-b-[0.5px] border-b-tapps-white/20 px-6 py-3 transition-all duration-300 hover:brightness-110">
      <FontAwesomeIcon icon={faBars} size="xl" />
      <nav className="flex items-center gap-3">{onRenderNavItems()}</nav>
      <div className="flex items-center gap-5 text-sm font-bold">
        <Image
          src="/google.svg"
          alt="Google Icon"
          width={20000}
          height={20000}
          className="h-6 w-6"
        />
        <button className="rounded-full bg-tapps-blue px-3 py-2">
          Sign up
        </button>
        <button>Log in</button>
      </div>
    </section>
  );
}
