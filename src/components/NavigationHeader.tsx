'use client';

import { useNavigation } from '@/contexts/NavigationProvider';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NavigationHeader() {
  const { title, headerColor } = useNavigation();
  const router = useRouter();

  return (
    <>
      {title && headerColor && (
        <Box
          onClick={() => router.back()}
          sx={{
            cursor: 'pointer',
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: '8px',
            height: '40px',
            paddingLeft: '1.75rem',
            backgroundColor: headerColor,
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
        </Box>
      )}
    </>
  );
}
