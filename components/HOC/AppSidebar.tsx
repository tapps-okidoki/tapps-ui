'use client';
import {
  AppWindow,
  Dices,
  Gamepad2,
  HandCoins,
  Home,
  Layers,
  LayoutGrid,
  ShoppingCart,
  Store,
  Users,
  Wallet,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@tapps/components/ui/sidebar';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@tapps/components/ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { NavUser } from './NavUser';
import { ModeToggle } from '../Home/ModeToggle';
import { ITelegramUserInfoFromBrowser } from '@tapps/types';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCloseOnOutsideClickOrEsc } from '@tapps/hooks/useCloseOnOutsideClickOrEsc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../ui/button';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Most Popular',
    url: '#popular',
    icon: Users,
  },
  {
    title: 'Wallets',
    url: '#wallet',
    icon: Wallet,
  },
  {
    title: 'Exchanges',
    url: '#exchanges',
    icon: LayoutGrid,
  },
  {
    title: 'Marketplaces',
    url: '#marketplaces',
    icon: Store,
  },
  {
    title: 'Game',
    url: '#games',
    icon: Gamepad2,
  },
  {
    title: 'Staking',
    url: '#staking',
    icon: HandCoins,
  },
  {
    title: 'Social',
    url: '#social',
    icon: AppWindow,
  },
  {
    title: 'Gambling',
    url: '#gambling',
    icon: Dices,
  },
  {
    title: 'Tools',
    url: '#tools',
    icon: Layers,
  },
  {
    title: 'Shopping',
    url: '#shopping',
    icon: ShoppingCart,
  },
];

export function AppSidebar() {
  const { open, isMobile, setOpenMobile } = useSidebar();
  const handleSideBarMobile = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get all query parameters
  const id = searchParams.get('id');
  const firstName = searchParams.get('first_name');
  const lastName = searchParams.get('last_name');
  const username = searchParams.get('username');
  const photoUrl = searchParams.get('photo_url');
  const authDate = searchParams.get('authDate');
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
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader>
          <ModeToggle />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild onClick={handleSideBarMobile}>
                      <Link href={item.url}>
                        <Tooltip delayDuration={300} disableHoverableContent>
                          <TooltipTrigger>
                            <item.icon className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent
                            hidden={open}
                            side="right"
                            sideOffset={5}
                          >
                            <span>{item.title}</span>
                            <TooltipArrow />
                          </TooltipContent>
                        </Tooltip>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {userLoginData.username ? (
            <NavUser user={userLoginData} />
          ) : (
            <Button onClick={() => setIsOpenLoginDialog(true)}>
              <FontAwesomeIcon icon={faTelegram} /> Login with Telegram
            </Button>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
