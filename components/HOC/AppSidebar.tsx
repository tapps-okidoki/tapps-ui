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
  SidebarGroup,
  SidebarGroupContent,
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
    url: '#exchange',
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
  const { open } = useSidebar();
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
