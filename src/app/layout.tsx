import type { Metadata } from 'next';
import './globals.css';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import { NavigationProvider } from '@/contexts/NavigationProvider';
import Background from './background';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Seu Aeroporto',
  description: 'Veja seu aeroporto de maneira digital',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <TopBar />
        <Background>
          <NavigationProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </NavigationProvider>
        </Background>
        <BottomBar />
      </body>
    </html>
  );
}
