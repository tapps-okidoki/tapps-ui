'use client';

import localFont from 'next/font/local';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Navbar } from '@tapps/components/Navbar';
import { Suspense, useEffect, useState } from 'react';
import { AppContext } from '@tapps/contexts/AppContext';
import { IShowSidebarStatus } from '@tapps/types';
import { useDeviceScreen } from '@tapps/hooks/useMobileScreen';
config.autoAddCss = false;

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useDeviceScreen('768px');
  const [showSideBar, setShowSideBar] = useState<IShowSidebarStatus>(
    IShowSidebarStatus.show,
  );
  useEffect(() => {
    setShowSideBar(
      isMobile ? IShowSidebarStatus.hide : IShowSidebarStatus.show,
    );
  }, [isMobile]);
  return (
    <html lang="en">
      <head>
        <title>Tapps Okidoki</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-[100dvh] w-[100dvw] bg-tapps-black text-tapps-white antialiased`}
      >
        <Suspense>
          <AppContext.Provider value={{ showSideBar, setShowSideBar }}>
            <Navbar />
            {children}
          </AppContext.Provider>
        </Suspense>
      </body>
    </html>
  );
}
