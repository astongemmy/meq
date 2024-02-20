import { Rethink_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import type { Viewport } from 'next';

import AntDesignThemeProvider from '@/components/shared/theme/provider';
import ThemeSwitcher from '@/components/shared/theme/switcher';
import { Footer, Header } from 'antd/es/layout/layout';
import ReduxProvider from '../store/provider';
import '../public/css/globals.css';
import colors from '../lib/colors';
import { Layout } from 'antd';

const rethinkSans = Rethink_Sans({
  variable: '--font-rethink-sans',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: 'rgb(15 23 42/1)' },
    { media: '(prefers-color-scheme: light)', color: 'white' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  keywords: ['Mega Quest', 'Research', 'Data analysis'],
  metadataBase: new URL('http://localhost:3000'),
  applicationName: 'Mega Quest Admin Console',
  description: 'Data analysis for Africa',
  referrer: 'origin-when-cross-origin',
  publisher: 'Dobande Technologies',
  creator: 'Dobande Technologies',
  manifest: '/app.webmanifest',
  openGraph: {
    description: 'Data analysis for Africa',
    siteName: 'Mega Quest Admin Console',
    title: 'Mega Quest Admin Console',
    url: 'http://localhost:3000',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/logos/mega-quest-logo-white.svg',
        height: 600,
        width: 800,
      },
      {
        url: '/images/logos/mega-quest-logo-white.svg',
        height: 1600,
        width: 1800,
      },
    ]
  },
  icons: {
    apple: '/images/favicons/apple-touch-icon.png',
    shortcut: '/images/favicons/favicon.ico',
    icon: '/images/favicons/favicon.ico',
    other: [
      {
        url: '/images/favicons/safari-pinned-tab.svg',
        color: colors.theme.primary,
        rel: 'mask-icon'
      },
      {
        url: '/images/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        rel: 'icon',
      },
      {
        url: '/images/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        rel: 'icon',
      },
      {
        url: '/images/favicon/favicon-32x32.png',
        sizes: '32x32',
        rel: 'icon',
      },
      {
        url: '/images/favicon/favicon-16x16.png',
        sizes: '16x16',
        rel: 'icon',
      },
    ]
  },
  title: {
    template: '%s | Mega Quest Admin Console',
    default: 'Mega Quest Admin Console'
  }
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode;} >) => {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${rethinkSans.variable} ${rethinkSans.className}`}>
          <AntDesignThemeProvider>
            <Layout>
              <ThemeSwitcher />
              <Header>
                Header side
              </Header>
              
              {children}

              <Footer>Small Footer</Footer>
            </Layout>
          </AntDesignThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  );
};

export default RootLayout;