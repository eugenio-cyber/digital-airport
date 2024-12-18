'use client';

import NavigationHeader from '@/components/NavigationHeader';
import useNavigation from '@/hooks/useNavigation';
import { Container } from '@mui/material';
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
      <Container maxWidth="md" sx={{ paddingTop: '40px' }}>
        {children}
      </Container>
    </>
  );
}
