'use client';

import SearchBar from '@/components/SearchBar';
import { useNavigation } from '@/contexts/NavigationProvider';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Establishment } from '@/contexts/NavigationProvider';

export default function RestaurantsPage() {
  const { restaurants, fetchEstablishments } = useNavigation();
  const [filterText, setFilterText] = useState<string>('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    Establishment[]
  >([]);

  useEffect(() => {
    fetchEstablishments();
  }, []);

  useEffect(() => {
    const localRestaurants = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredRestaurants(localRestaurants);
  }, [filterText]);

  useEffect(() => {
    if (restaurants.length) setFilteredRestaurants(restaurants);
  }, [restaurants]);

  return (
    <Box sx={{ pt: '1.75rem' }}>
      <SearchBar
        placeholder="Busque um estabelecimento. Ex:. Spolleto"
        value={filterText}
        changeValue={setFilterText}
      />
      {filteredRestaurants.length > 0 &&
        filteredRestaurants.map((restaurant) => {
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
                  src={restaurant.logo}
                  width={52}
                  height={52}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  alt={restaurant.name}
                ></Image>
                <Box>
                  <Typography sx={{ mb: '2px', fontWeight: 600 }}>
                    {restaurant.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '14px', color: '#00000099' }}
                  >{`${restaurant.serviceCategories[0]}-${restaurant.address}`}</Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
