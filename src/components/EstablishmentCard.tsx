import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Establishment } from '@/contexts/NavigationProvider';
import { createAlias } from '@/utils/EstablishmentUtils';
import useNavigation from '@/hooks/useNavigation';
import { useRouter } from 'next/navigation';

export default function EstablishmentCard({
  establishment,
  handleClickAction,
}: {
  establishment: Establishment;
  handleClickAction?: () => void;
}) {
  const { setCurrentEstablishment } = useNavigation();
  const router = useRouter();

  function createEstablishmentUrl() {
    const establishmentSegment = establishment.segments.includes('restaurant')
      ? 'restaurants'
      : 'services';
    const establishmentAlias = createAlias(establishment.name);

    return `${establishmentSegment}/${establishmentAlias}`;
  }

  function handleClick() {
    setCurrentEstablishment(establishment);
    const href = createEstablishmentUrl();
    router.push(href);
  }

  return (
    <Box
      onClick={() => (handleClickAction ? handleClickAction() : handleClick())}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '.75rem',
        borderBottom: '1px solid #0000001F',
        py: '1rem',
        '&:last-child': { border: 0 },
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
