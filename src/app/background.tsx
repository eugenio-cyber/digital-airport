'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function Background({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)',
        margin: '80px 0 80px 0',
        backgroundColor: currentPath === '/' ? '#F3F2F2' : '#FFFFFF',
      }}
    >
      {children}
    </Box>
  );
}
