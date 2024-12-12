'use client';

import { useNavigation } from '@/contexts/NavigationProvider';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MenuItem {
  _id: string;
  label: string;
  ref: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
}

export default function Home() {
  const { setTitle, setHeaderColor } = useNavigation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  function handleClickMenu(title: string, headerColor: string) {
    setTitle(title);
    setHeaderColor(headerColor);
  }

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();

        setMenuItems(data);
      } catch (error) {
        console.error('Erro ao buscar itens do menu:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: {
          xs: '2rem',
          lg: '4rem',
        },
      }}
    >
      <Box sx={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontWeight: '600',
            fontSize: {
              xs: '1.5rem',
              md: '2rem',
            },
          }}
        >
          Bem-vindo!
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            color: '#5C5C5C',
            fontSize: {
              xs: '1rem',
              md: '1.5rem',
            },
          }}
        >
          Como podemos ajuda-lo?
        </Typography>
      </Box>

      {menuItems.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Box sx={{ display: 'flex', gap: '14px', height: '10rem' }}>
            <Box
              sx={{
                position: 'relative',
                flexGrow: {
                  xs: 2,
                  md: 3,
                },
                backgroundColor: menuItems[0].backgroundColor,
                borderRadius: '14px',
              }}
            >
              <Link
                onClick={() =>
                  handleClickMenu(
                    'Informações de voos',
                    menuItems[0].backgroundColor
                  )
                }
                href={menuItems[0].ref}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  paddingRight: '50px',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h5"
                  component="h5"
                  color={menuItems[0].textColor}
                  sx={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '18px',
                    width: {
                      xs: '20vw',
                      md: '8vw',
                    },
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  {menuItems[0].label}
                </Typography>
                <Image
                  src={menuItems[0].icon}
                  width={60}
                  height={60}
                  alt={menuItems[0].label}
                  style={{ fill: menuItems[0].textColor }}
                />
              </Link>
            </Box>
            <Box
              sx={{
                position: 'relative',
                flexGrow: {
                  xs: 1.5,
                  md: 1,
                },
                backgroundColor: menuItems[1].backgroundColor,
                borderRadius: '14px',
              }}
            >
              <Link
                onClick={() =>
                  handleClickMenu(
                    menuItems[1].label,
                    menuItems[1].backgroundColor
                  )
                }
                href={menuItems[1].ref}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Image
                  src={menuItems[1].icon}
                  width={50}
                  height={50}
                  alt={menuItems[1].label}
                />
                <Typography
                  variant="h5"
                  component="h5"
                  color={menuItems[1].textColor}
                  sx={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '18px',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  {menuItems[1].label}
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '14px', height: '10rem' }}>
            <Box
              sx={{
                position: 'relative',
                flexGrow: {
                  xs: 1.5,
                  md: 1,
                },
                backgroundColor: menuItems[2].backgroundColor,
                borderRadius: '14px',
              }}
            >
              <Link
                onClick={() =>
                  handleClickMenu(
                    menuItems[2].label,
                    menuItems[2].backgroundColor
                  )
                }
                href={menuItems[2].ref}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Image
                  src={menuItems[2].icon}
                  width={50}
                  height={50}
                  alt={menuItems[2].label}
                />
                <Typography
                  variant="h5"
                  component="h5"
                  color={menuItems[2].textColor}
                  sx={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '18px',
                    width: {
                      xs: '16vw',
                      md: '8vw',
                    },
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  {menuItems[2].label}
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                position: 'relative',
                flexGrow: {
                  xs: 2,
                  md: 3,
                },
                backgroundColor: menuItems[3].backgroundColor,
                borderRadius: '14px',
              }}
            >
              <Link
                onClick={() =>
                  handleClickMenu(
                    menuItems[3].label,
                    menuItems[3].backgroundColor
                  )
                }
                href={menuItems[3].ref}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  paddingRight: '50px',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h5"
                  component="h5"
                  color={menuItems[3].textColor}
                  sx={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '18px',
                    width: {
                      xs: '16vw',
                      md: '8vw',
                    },
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  {menuItems[3].label}
                </Typography>
                <Image
                  src={menuItems[3].icon}
                  width={60}
                  height={60}
                  alt={menuItems[3].label}
                  style={{ fill: menuItems[3].textColor }}
                />
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '14px', height: '10rem' }}>
            <Box
              sx={{
                position: 'relative',
                flexGrow: {
                  xs: 2,
                  md: 3,
                },
                background: menuItems[4].backgroundColor,
                borderRadius: '14px',
              }}
            >
              <Link
                onClick={() =>
                  handleClickMenu(
                    menuItems[4].label,
                    menuItems[4].backgroundColor
                  )
                }
                href={menuItems[4].ref}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  paddingRight: '2rem',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h5"
                  component="h5"
                  color={menuItems[4].textColor}
                  sx={{
                    position: 'absolute',
                    left: '18px',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  {menuItems[4].label}
                </Typography>
                <Image
                  src={menuItems[4].icon}
                  width={60}
                  height={60}
                  alt={menuItems[4].label}
                  style={{ fill: menuItems[4].textColor }}
                />
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
