'use client';

import { HomeComponent } from '@tapps/components/Home';
import { Navbar } from '@tapps/components/Navbar';
import { AppContext } from '@tapps/contexts/AppContext';
import { IShowSidebarStatus } from '@tapps/types';
import { Suspense, useState } from 'react';

export default function Home() {
  const [showSideBar, setShowSideBar] = useState<IShowSidebarStatus>(
    IShowSidebarStatus.show,
  );

  return (
    <Suspense>
      <AppContext.Provider value={{ showSideBar, setShowSideBar }}>
        <Navbar />
        <HomeComponent />;
      </AppContext.Provider>
    </Suspense>
  );
}
