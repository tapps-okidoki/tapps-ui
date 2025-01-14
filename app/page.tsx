'use client';

import { AppSidebar } from '@tapps/components/HOC/AppSidebar';
import { Header } from '@tapps/components/HOC/Header';
import { HomeComponent } from '@tapps/components/Home';
import { SidebarProvider } from '@tapps/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header />
        <HomeComponent />
      </div>
    </SidebarProvider>
  );
}
