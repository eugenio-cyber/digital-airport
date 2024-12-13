'use client';

import NavigationHeader from '@/components/NavigationHeader';
import { useNavigation } from '@/contexts/NavigationProvider';
import { Container } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { menuItems, setTitle, setHeaderColor, fetchMenuItems } =
    useNavigation();
  const pathname = usePathname();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    let menuItem = menuItems.find((item) => item.ref === pathname);

    if (!menuItem) {
      menuItem = menuItems.find((item) => pathname.includes(item.ref));
    }

    setTitle(menuItem?.label || '');
    setHeaderColor(menuItem?.backgroundColor || '');
  }, [menuItems]);

  return (
    <>
      <NavigationHeader />
      <Container maxWidth="md" sx={{ paddingTop: '40px' }}>
        {children}
      </Container>
    </>
  );
}
