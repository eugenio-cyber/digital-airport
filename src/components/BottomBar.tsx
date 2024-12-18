'use client';

import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function BottomBar() {
  const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>('Português');
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();
  const languages = [
    {
      name: 'Português',
      flagUrl: '/portuguese-flag.svg',
    },
    {
      name: 'Español',
      flagUrl: '/spanish-flag.svg',
    },
    {
      name: 'English',
      flagUrl: '/english-flag.svg',
    },
  ];

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const formatDate = (currentDate: Date) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    } as const;

    const formattedDate = new Intl.DateTimeFormat('pt-BR', options)
      .format(currentDate)
      .replace('-feira', '');

    setDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
  };

  useEffect(() => {
    const currentDate = new Date();

    setInterval(() => {
      const currentDate = new Date();
      const hour = `0${currentDate.getHours()}`.slice(-2);
      const minute = `0${currentDate.getMinutes()}`.slice(-2);
      const currentTime = `${hour}:${minute}`;

      setTime(currentTime);
    }, 1000);

    formatDate(currentDate);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        height: '80px',
        padding: '16px 12px',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Link href="/">
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '9.25px 9.25px 18.5px 0px #AEAEC066',
            }}
          >
            <Image
              src="/home-icon.svg"
              height={38}
              width={38}
              alt="Ícone de casa"
            />
          </Box>
        </Link>

        <Button onClick={handleOpen}>
          <Box
            sx={{
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '.25rem',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '9.25px 9.25px 18.5px 0px #AEAEC066',
            }}
          >
            <Image
              src={
                languages.find((language) => language.name === currentLanguage)
                  ?.flagUrl || '/portuguese-flag.svg'
              }
              width={34}
              height={34}
              alt="Ícone de casa"
            />
          </Box>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={isOpen}
          onClose={handleClose}
          open={Boolean(isOpen)}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {languages.map((option) => (
            <MenuItem
              key={option.name}
              selected={option.name === currentLanguage}
              onClick={() => {
                setCurrentLanguage(option.name);
                handleClose();
              }}
              sx={{ display: 'flex', gap: 2 }}
            >
              <Image
                src={option.flagUrl}
                width={24}
                height={24}
                alt={`Ícone da bandeira para ${option.name}`}
              />
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box>
        <Typography component="p" sx={{ fontSize: 12, fontWeight: 300 }}>
          {date}
        </Typography>
        <Typography
          component="p"
          sx={{ fontSize: 18, fontWeight: 600, textAlign: 'end' }}
        >
          {time}
        </Typography>
      </Box>
    </Box>
  );
}
