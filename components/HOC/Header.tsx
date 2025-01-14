'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@tapps/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@tapps/components/ui/navigation-menu';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@tapps/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tapps/components/ui/popover';
import { SidebarTrigger } from '../ui/sidebar';
import { ModeToggle } from '../Home/ModeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-tapps-gray/30 bg-white dark:bg-[#121212]">
      <div className="mx-auto flex items-center justify-between px-4 py-2">
        <SidebarTrigger />

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="hidden space-x-6 sm:flex">
            <NavigationMenuItem>
              <Link
                href="/"
                className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                TON
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/"
                className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                Telegram
              </Link>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {/* User Avatar */}
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/images/user-avatar.png" alt="User Avatar" />
                <AvatarFallback>DN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-2">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/profile"
                    className="block rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button className="w-full rounded-md px-2 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                    Logout
                  </button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
