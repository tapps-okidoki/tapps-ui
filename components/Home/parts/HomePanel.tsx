import Image from 'next/image';
import React from 'react';

export function HomePanel() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="bg-home-frame-1 h-[60dvh] px-40">
        <div className="mt-32 flex flex-col items-center gap-32">
          <h1 className="text-4xl font-black text-tapps-purple">
            Explore 1079 apps in TON Ecosystem
          </h1>
          <div className="flex gap-6">
            <Image
              src="/frames/frame-2.png"
              alt="Frame 2"
              width={20000}
              height={20000}
              className="w-1/2"
            />
            <Image
              src="/frames/frame-3.png"
              alt="Frame 3"
              width={20000}
              height={20000}
              className="w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
