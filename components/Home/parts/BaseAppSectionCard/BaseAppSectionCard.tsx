import TappsLoading from '@tapps/components/Loading';
import { useGetAppByCategory } from '@tapps/hooks/useGetAppByCategory';
import { ECategoryName } from '@tapps/types/enum';
import React from 'react';
import { Card } from './Card';

interface Props {
  cate: ECategoryName;
}

export function BaseAppSectionCard({ cate }: Props) {
  const { data, isLoading } = useGetAppByCategory({ category: cate });
  if (isLoading) {
    return <TappsLoading />;
  }

  if (!data) {
    return <></>;
  }
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-5 md:grid-cols-3">
      {(data.apps ?? [])
        .sort((a, b) => Number(a.app_position) - Number(b.app_position))
        .slice(0, 9)
        .map((card, index) => {
          return (
            <Card
              key={card._id + Math.random().toString()}
              card={card}
              index={index}
            />
          );
        })}
    </div>
  );
}
