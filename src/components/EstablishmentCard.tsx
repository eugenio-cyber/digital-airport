import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Establishment } from '@/contexts/NavigationProvider';
import Link from 'next/link';
import { createAlias } from '@/utils/EstablishmentUtils';
import useNavigation from '@/hook/useNavigation';

export default function EstablishmentCard({
  establishment,
}: {
  establishment: Establishment;
}) {
  const { setCurrentEstablishment } = useNavigation();
  function createEstablishmentUrl() {
    const establishmentSegment = establishment.segments.includes('restaurant')
      ? 'restaurants'
      : 'services';
    const establishmentAlias = createAlias(establishment.name);

    return `${establishmentSegment}/${establishmentAlias}`;
  }

  return (
    <Box
      onClick={() => setCurrentEstablishment(establishment)}
      sx={{
        borderBottom: '1px solid #0000001F',
        py: '1rem',
      }}
    >
      <Link
        href={createEstablishmentUrl()}
        style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}
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
      </Link>
    </Box>
  );
}
