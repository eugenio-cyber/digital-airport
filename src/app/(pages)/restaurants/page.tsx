'use client';

import SearchBar from '@/components/SearchBar';
import { useNavigation } from '@/contexts/NavigationProvider';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Establishments } from '@/contexts/NavigationProvider';

export default function RestaurantsPage() {
  const { establishments, fetchEstablishments } = useNavigation();
  const [filterText, setFilterText] = useState<string>('');
  const [filteredEstablishments, setFilteredEstablishments] = useState<
    Establishments[]
  >([]);

  useEffect(() => {
    fetchEstablishments();
  }, []);

  useEffect(() => {
    const localEstablishments = establishments.filter((establishment) =>
      establishment.name.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredEstablishments(localEstablishments);
  }, [filterText]);

  useEffect(() => {
    if (establishments.length > 0) setFilteredEstablishments(establishments);
  }, [establishments]);

  return (
    <Box sx={{ pt: '1.75rem' }}>
      <SearchBar
        placeholder="Busque um estabelecimento. Ex:. Spolleto"
        value={filterText}
        changeValue={setFilterText}
      />
      {filteredEstablishments.length > 0 &&
        filteredEstablishments.map((establishment) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '&:last-child div': { border: 0 },
              }}
            >
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
            </Box>
          );
        })}
    </Box>
  );
}
