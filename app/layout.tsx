import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import { Navbar } from '@tapps/components/Navbar';

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

export const metadata: Metadata = {
  title: 'Tapps Okidoki',
  description: 'Telegram Apps',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-[100dvh] w-[100dvw] bg-tapps-black text-tapps-white antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
