import type { Metadata } from 'next';
import './globals.css';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import { Box } from '@mui/material';

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            background: '#F3F2F2',
          }}
        >
          {children}
        </Box>
        <BottomBar />
      </body>
    </html>
  );
}
