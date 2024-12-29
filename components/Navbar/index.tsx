'use client';
import { faArrowDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IShowSidebarStatus, ITelegramUserInfo } from '@tapps/types';
import { UrlObject } from 'url';
import { AppContext } from '@tapps/contexts/AppContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserBtn } from './UserBtn';

export function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get all query parameters
  const id = searchParams.get('id');
  const firstName = searchParams.get('first_name');
  const lastName = searchParams.get('last_name');
  const username = searchParams.get('username');
  const photoUrl = searchParams.get('photo_url');
  const authDate = searchParams.get('auth_date');
  const hash = searchParams.get('hash');
  const [isClient, setIsClient] = useState(false);
  const localUserData =
    isClient && localStorage.getItem('T_USER')
      ? JSON.parse(localStorage.getItem('T_USER') ?? '')
      : undefined;
  const userLoginData = useMemo<ITelegramUserInfo>(
    () =>
      localUserData ?? {
        id,
        firstName,
        lastName,
        username,
        photoUrl,
        authDate,
        hash,
      },
    [
      authDate,
      firstName,
      hash,
      id,
      lastName,
      localUserData,
      photoUrl,
      username,
    ],
  );

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

  const telegramWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://telegram.org/js/telegram-widget.js?22';
    scriptElement.async = true;
    scriptElement.setAttribute('data-telegram-login', 'TappsOkiBot');
    scriptElement.setAttribute('data-size', 'large');
    scriptElement.setAttribute(
      'data-auth-url',
      'https://tapps-okidoki.vercel.app',
    );

    scriptElement.setAttribute('data-request-access', 'write');

    telegramWrapperRef?.current?.appendChild(scriptElement);
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (userLoginData.username) {
      if (localStorage.getItem('T_USER')) {
        localStorage.setItem('T_USER', JSON.stringify(userLoginData));
      } else {
        localStorage.setItem('T_USER', JSON.stringify(userLoginData));
        router.push('/');
      }
    }
  }, [userLoginData, router]);

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
        {userLoginData.username ? (
          <UserBtn username={`@${userLoginData.username}`} />
        ) : (
          <>
            <button popoverTarget="my-popover" className="py-2">
              Log in
            </button>

            <div
              popover="auto"
              id="my-popover"
              className="z-30 bg-transparent backdrop-blur-sm"
            >
              <div className="flex h-full items-center justify-center">
                <div className="flex w-fit flex-col gap-7 rounded-xl border border-tapps-gray bg-tapps-black p-5 text-tapps-white">
                  <h2 className="text-left text-2xl font-bold">Log in</h2>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-3">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="text-xl text-tapps-blue"
                      />
                      <p>Get notified about app moderation</p>
                    </div>
                    <div className="flex gap-3">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-xl text-tapps-blue"
                      />
                      <p>Leave reviews on applications</p>
                    </div>
                    <div className="flex gap-3">
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className="text-xl text-tapps-blue"
                      />
                      <p>Receive catalog updates</p>
                    </div>
                    <div
                      ref={telegramWrapperRef}
                      className="flex justify-center"
                    ></div>
                  </div>
                  <div className="flex gap-1 text-base">
                    <p>No Telegram? Install the app from the official</p>
                    <Link
                      href={'https://telegram.org/'}
                      className="text-tapps-blue hover:underline"
                    >
                      website
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
