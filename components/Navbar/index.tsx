'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ITelegramUserInfoFromBrowser } from '@tapps/types';
import { UrlObject } from 'url';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCloseOnOutsideClickOrEsc } from '@tapps/hooks/useCloseOnOutsideClickOrEsc';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { NavUser } from '../HOC/NavUser';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';
import Image from 'next/image';

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
  const userLoginData = useMemo<ITelegramUserInfoFromBrowser>(
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

  const onRenderNavItems = () => {
    const navItems = [
      { id: 'ton', name: 'Ton', link: '#' },
      { id: 'telegram', name: 'Telegram', link: '#' },
    ];

    return navItems.map((i) => {
      return (
        <Link
          key={i.id}
          href={(i.link as unknown as UrlObject) ?? ''}
          className="font-bold hover:underline"
        >
          {i.name}
        </Link>
      );
    });
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
  const [isOpenLoginDialog, setIsOpenLoginDialog] = useState(false);
  const closeLoginDialog = () => {
    setIsOpenLoginDialog(false);
  };

  const loginContentRef =
    useCloseOnOutsideClickOrEsc<HTMLDivElement>(closeLoginDialog);

  const notifications = [
    {
      title: 'Get notified about app moderation.',
    },
    {
      title: 'You have a new message!',
    },
    {
      title: 'Your subscription is expiring soon!',
    },
  ];
  return (
    <>
      <dialog
        open={isOpenLoginDialog}
        className="fixed inset-0 z-50 mx-auto h-full w-full bg-transparent"
      >
        <div className="flex h-full items-center justify-center bg-[#121212]/40">
          <Card className="w-[380px]" ref={loginContentRef}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-5">
              <div
                ref={telegramWrapperRef}
                className="flex justify-center"
              ></div>
              <div className="flex gap-1 text-sm">
                <p>No Telegram? Install the app from the official</p>
                <Link
                  href={'https://telegram.org/'}
                  className="text-tapps-blue hover:underline"
                >
                  website
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </dialog>
      <section className="sticky inset-x-0 top-0 z-20 w-full gap-3 border-b-[0.5px] bg-white dark:bg-black">
        <div className="container mx-auto flex items-center justify-between">
          <Link href={'/'} className="rounded-full bg-black">
            <Image
              src="/logo/logo.png"
              alt="Frame 2"
              width={20000}
              height={20000}
              className="m-1 aspect-square w-8 rounded-full object-contain dark:bg-transparent"
            />
          </Link>
          <nav className="flex items-center gap-3">{onRenderNavItems()}</nav>
          {userLoginData.username ? (
            <NavUser user={userLoginData} className="w-fit" />
          ) : (
            <Button onClick={() => setIsOpenLoginDialog(true)}>
              <FontAwesomeIcon icon={faTelegram} /> Login with Telegram
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
