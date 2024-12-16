'use client';

import SearchBar from '@/components/SearchBar';
import { useNavigation } from '@/contexts/NavigationProvider';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Establishment } from '@/contexts/NavigationProvider';
import EstablishmentCard from '@/components/EstablishmentCard';

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
              <EstablishmentCard establishment={restaurant}></EstablishmentCard>
            </Box>
          );
        })}
    </Box>
  );
}
