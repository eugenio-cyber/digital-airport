import type { Metadata } from 'next';
import './globals.css';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import { NavigationProvider } from '@/contexts/NavigationProvider';
import Background from './background';

export const metadata: Metadata = {
  title: 'Seu Aeroporto',
  description: 'Veja seu aeroporto de maneira digital',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <TopBar />
        <Background>
          <NavigationProvider>{children}</NavigationProvider>
        </Background>
        <BottomBar />
      </body>
    </html>
  );
}
