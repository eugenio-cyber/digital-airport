'use client';

import useNavigation from '@/hook/useNavigation';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NavigationHeader() {
  const { currentEstablishment, title, setTitle, headerColor, setHeaderColor } =
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
      setTitle('Restaurante');
      setHeaderColor(pageConfig['/restaurants'].color);
    } else if (pathname.startsWith('/services/')) {
      if (currentEstablishment) {
        setTitle(
          currentEstablishment.segments.includes('store') ? 'Loja' : 'Serviço'
        );
        setHeaderColor(pageConfig['/services'].color);
      }
    } else if (pageConfig[pathname]) {
      setTitle(pageConfig[pathname].title);
      setHeaderColor(pageConfig[pathname].color);
    }
  }

  useEffect(() => {
    updateNavigationHeader(pathname);
  }, [pathname, currentEstablishment]);

  return (
    <>
      {title && headerColor && (
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
              gap: '8px',
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              src="/back-arrow.svg"
              height={20}
              width={20}
              alt="Seta para esquerda"
            />
            <Typography
              component="span"
              sx={{ color: 'white', fontWeight: 600, fontSize: '1.25rem' }}
            >
              {title}
            </Typography>
          </Link>
        </Box>
      )}
    </>
  );
}
