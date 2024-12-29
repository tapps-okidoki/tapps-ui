'use client';

import localFont from 'next/font/local';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Navbar } from '@tapps/components/Navbar';
import { Suspense, useEffect, useState } from 'react';
import { AppContext } from '@tapps/contexts/AppContext';
import { IShowSidebarStatus, ITelegramUserInfo } from '@tapps/types';
import { useDeviceScreen } from '@tapps/hooks/useMobileScreen';
import { ReactQueryProvider } from './ReactQuery/ReactQueryProvider';

config.autoAddCss = false;

// Extend the Window interface to include onTelegramAuth as optional
declare global {
  interface Window {
    onTelegramAuth?: (user: ITelegramUserInfo) => void; // Marking as optional
  }
}

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
    // Cleanup function to reset state on unmount or when isMobile changes
    return () => setShowSideBar(IShowSidebarStatus.show);
  }, [isMobile]);

  // Make onTelegramAuth globally accessible
  useEffect(() => {
    const onTelegramAuth = (user: ITelegramUserInfo) => {
      alert(
        'Logged in as ' +
          user.first_name +
          ' ' +
          user.last_name +
          ' (' +
          user.id +
          (user.username ? ', @' + user.username : '') +
          ')',
      );
    };

    // Attach onTelegramAuth to window object
    window.onTelegramAuth = onTelegramAuth;

    // Cleanup function to remove it when the component is unmounted
    return () => {
      delete window.onTelegramAuth; // No TypeScript error now
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Tapps Okidoki</title>
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="TappsOkiBot"
          data-size="large"
          data-onauth="onTelegramAuth(user)"
          data-request-access="write"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-[100dvh] w-[100dvw] bg-tapps-black text-tapps-white antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ReactQueryProvider>
            <AppContext.Provider value={{ showSideBar, setShowSideBar }}>
              <Navbar />
              {children}
            </AppContext.Provider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
