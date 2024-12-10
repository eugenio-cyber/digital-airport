import type { Metadata } from 'next';
import './globals.css';
import TopBar from '@/components/TopBar';

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
        {children}
      </body>
    </html>
  );
}
