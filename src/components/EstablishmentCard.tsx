import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Establishment } from '@/contexts/NavigationProvider';

export default function EstablishmentCard({
  establishment,
}: {
  establishment: Establishment;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '.75rem',
        borderBottom: '1px solid #0000001F',
        py: '1rem',
      }}
    >
      <Image
        src={establishment.logo}
        width={52}
        height={52}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        alt={establishment.name}
      ></Image>
      <Box>
        <Typography sx={{ mb: '2px', fontWeight: 600 }}>
          {establishment.name}
        </Typography>
        <Typography
          sx={{ fontSize: '14px', color: '#00000099' }}
        >{`${establishment.serviceCategories[0]}-${establishment.address}`}</Typography>
      </Box>
    </Box>
  );
}
