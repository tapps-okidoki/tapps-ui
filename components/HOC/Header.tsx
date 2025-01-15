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
import { SidebarTrigger } from '../ui/sidebar';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-tapps-gray/30 bg-white dark:bg-[#121212]">
      <div className="mx-auto flex items-center justify-between px-4 py-2">
        <SidebarTrigger />

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6 text-sm font-medium">
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
          </NavigationMenuList>
        </NavigationMenu>
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
