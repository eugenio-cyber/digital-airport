'use client';

import useNavigation from '@/hooks/useNavigation';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NavigationHeader() {
  const { headerTitle, headerColor, setHeaderColor, setHeaderTitle } =
    useNavigation();
  const pathname = usePathname();
  const pageConfig: { [key: string]: { title: string; color: string } } = {
    '/flights': { title: 'Informações de Voos', color: '#1C1611' },
    '/restaurants': { title: 'Restaurantes', color: '#E30026' },
    '/services': { title: 'Lojas & Serviços', color: '#52C2DE' },
    '/map': { title: 'Mapa do Aeroporto', color: '#004489' },
    '/chatbot': { title: 'Atendente Virtual', color: '#6650BD' },
  };

  function createBackLink() {
    return pathname.split('/').length > 2 ? `/${pathname.split('/')[1]}` : '/';
  }

  function updateNavigationHeader(pathname: string) {
    if (pathname.startsWith('/restaurants/')) {
      setHeaderTitle('Restaurante');
      setHeaderColor(pageConfig['/restaurants'].color);
    } else if (pageConfig[pathname]) {
      setHeaderTitle(pageConfig[pathname].title);
      setHeaderColor(pageConfig[pathname].color);
    }
  }

  useEffect(() => {
    updateNavigationHeader(pathname);
  }, [pathname]);

  return (
    <>
      {headerTitle && headerColor && (
        <Box
          sx={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            zIndex: 2,
            height: '40px',
            paddingLeft: '1.75rem',
            backgroundColor: headerColor,
          }}
        >
          <Link
            href={createBackLink()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '.75rem',
              height: '100%',
            }}
          >
            <Image
              src="/back-arrow.svg"
              height={16}
              width={16}
              alt="Seta para esquerda"
            />
            <Typography
              component="span"
              sx={{ color: 'white', fontWeight: 600, fontSize: '1.25rem' }}
            >
              {headerTitle}
            </Typography>
          </Link>
        </Box>
      )}
    </>
  );
}
