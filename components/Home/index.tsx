'use client';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {
  faCartShopping,
  faHome,
  faWallet,
  faTableCellsLarge,
  faShop,
  faRobot,
  faTools,
  faDice,
  faUsers,
  faThumbsUp,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IShowSidebarStatus } from '@tapps/types';
import { HomePanel } from './parts/HomePanel';

export function HomeComponent() {
  const isShowSidebar =
    (localStorage.getItem('show-sidebar') as IShowSidebarStatus) ??
    IShowSidebarStatus.show;
  console.log('isShowSidebar: ', isShowSidebar);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get('tab');
  const [selectedIndex, setSelectedIndex] = useState(Number(currentTab) ?? 0);
  const getTabClasses = (selected: boolean) =>
    `${
      selected
        ? 'bg-white/10 text-tapps-blue focus:outline-none border-r-tapps-blue'
        : 'bg-transparent text-white hover:bg-gray-200 border-transparent focus:outline-none'
    } px-4 py-2 text-base border-r-4`;

  const onRenderTabs = () => {
    const tabList = [
      {
        name: 'Home',
        icon: <FontAwesomeIcon icon={faHome} />,
      },
      {
        name: 'Most Popular',
        icon: <FontAwesomeIcon icon={faUsers} />,
      },
      {
        name: 'Wallets',
        icon: <FontAwesomeIcon icon={faWallet} />,
      },
      {
        name: 'Exchanges',
        icon: <FontAwesomeIcon icon={faTableCellsLarge} />,
      },
      {
        name: 'Marketpaces',
        icon: <FontAwesomeIcon icon={faShop} />,
      },
      {
        name: 'Game',
        icon: <FontAwesomeIcon icon={faRobot} />,
      },
      {
        name: 'Staking',
        icon: <FontAwesomeIcon icon={faSackDollar} />,
      },
      {
        name: 'Social',
        icon: <FontAwesomeIcon icon={faThumbsUp} />,
      },
      {
        name: 'Gambling',
        icon: <FontAwesomeIcon icon={faDice} />,
      },
      {
        name: 'Tools',
        icon: <FontAwesomeIcon icon={faTools} />,
      },
      {
        name: 'Shopping',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
      },
    ];

    return tabList.map((tab) => (
      <Tab
        key={tab.name}
        className={({ selected }) =>
          `${getTabClasses(selected)} flex items-center gap-5 py-4 text-sm font-semibold hover:bg-white/10`
        }
      >
        {tab.icon}
        <p>{tab.name}</p>
      </Tab>
    ));
  };
  return (
    <div>
      <TabGroup
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          router.push(`?tab=${index}`);
        }}
        className="flex min-h-[calc(100dvh-60.5px)] w-full"
      >
        {isShowSidebar === IShowSidebarStatus.show ? (
          <TabList className="flex min-w-[17%] flex-col bg-tapps-light-black">
            {onRenderTabs()}
          </TabList>
        ) : (
          <></>
        )}

        <TabPanels className="w-full">
          <TabPanel>
            <HomePanel />
          </TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
          <TabPanel>Content 4</TabPanel>
          <TabPanel>Content 5</TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
