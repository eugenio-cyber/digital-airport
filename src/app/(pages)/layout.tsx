'use client';

import NavigationHeader from '@/components/NavigationHeader';
import useNavigation from '@/hooks/useNavigation';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchMenuItems } = useNavigation();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <>
      <NavigationHeader />
      <Box sx={{ paddingTop: '40px' }}>{children}</Box>
    </>
  );
}
