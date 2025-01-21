'use client';

import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@tapps/components/ui/card';
import { Separator } from '@tapps/components/ui/separator';
// import TappsLoading from '@tapps/components/Loading';
import { useGetAppList } from '@tapps/hooks/useGetAppList';
import { IGetAllAppsResResultAppItem } from '@tapps/types';
import { Languages, MonitorSmartphone } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

function AppPage() {
  const params = useParams<{ appId: string }>();
  const { data, isLoading } = useGetAppList();
  console.debug('isLoading: ', isLoading);
  const allAppsFromData = data?.flatMap((i) => i.apps);
  const appInformation: IGetAllAppsResResultAppItem = allAppsFromData?.find(
    (i) => i._id === params.appId,
  ) as IGetAllAppsResResultAppItem;
  console.log('appInformation: ', appInformation);

  // if (isLoading) {
  //   return <TappsLoading />;
  // }
  // if (appInformation) {
  //   return <p>App Not Found</p>;
  // }

  const appInformationList = [
    {
      name: 'platforms',
      title: 'Platforms',
      content: appInformation?.app_platform ?? 'No Platforms',
      icon: <MonitorSmartphone />,
    },
    {
      name: 'languages',
      title: 'Languages',
      content: appInformation?.app_languages ?? 'No Languages',
      icon: <Languages />,
    },
    {
      name: 'telegram',
      title: 'Telegram',
      content: appInformation?.offcial_links ?? 'No Telegram',
      icon: <FontAwesomeIcon icon={faTelegram} size="xl" />,
    },
  ];

  return (
    <div className="mt-5">
      <div className="flex items-center gap-5">
        <Image
          src={appInformation?.app_image ?? '/apps/app-1.png'}
          alt={appInformation?.app_name ?? 'name'}
          height={200}
          width={200}
          className="aspect-square w-28 rounded-lg object-contain"
        />
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-semibold">
            {appInformation?.app_name ?? 'App Name'}
          </h3>
          <p>{appInformation?.app_short_des ?? 'Short description'}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex items-start space-x-4 text-sm">
        <div className="flex-[2]">
          <h3 className="text-xl font-semibold">Description</h3>
          <p>{appInformation?.app_long_des ?? 'No Description'}</p>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>More Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {appInformationList.map((info) => (
                  <div
                    key={info.name}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0"
                  >
                    <div className="flex translate-y-1">{info.icon}</div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {info.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {info.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* <div>
            <h3 className="text-xl font-semibold">Platform</h3>
            <p>{appInformation?.app_platform ?? 'No Platforms'}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Languages</h3>
            <p>{appInformation?.app_languages ?? 'No Languages'}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Telegram</h3>
            <p>{appInformation?.offcial_links ?? 'No Telegram Links'}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AppPage;
