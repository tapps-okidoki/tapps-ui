'use client';

import { ReactQueryProvider } from '@tapps/app/ReactQuery/ReactQueryProvider';
import { LargeFooter } from '@tapps/components/Home/parts/Footer/LargeFooter';
import { Navbar } from '@tapps/components/Navbar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@tapps/components/ui/breadcrumb';
import { SidebarProvider } from '@tapps/components/ui/sidebar';
import { ThemeProvider } from 'next-themes';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ appId: string }>();
  return (
    <html lang="en">
      <body>
        <main>
          <Suspense>
            <ReactQueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SidebarProvider>
                  <div className="flex w-full flex-col justify-between">
                    <div>
                      <Navbar />
                      <div className="container mx-auto my-5">
                        <Breadcrumb>
                          <BreadcrumbList>
                            <BreadcrumbItem>
                              <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>Apps</BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                              <BreadcrumbPage>{params.appId}</BreadcrumbPage>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
                        {children}
                      </div>
                    </div>
                    <LargeFooter />
                  </div>
                </SidebarProvider>
              </ThemeProvider>
            </ReactQueryProvider>
          </Suspense>
        </main>
      </body>
    </html>
  );
}
