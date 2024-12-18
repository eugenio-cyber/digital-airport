'use client';

import SearchBar from '@/components/SearchBar';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Establishment } from '@/contexts/NavigationProvider';
import EstablishmentCard from '@/components/EstablishmentCard';
import useNavigation from '@/hook/useNavigation';

export default function RestaurantsPage() {
  const { restaurants } = useNavigation();
  const [filterText, setFilterText] = useState<string>('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    Establishment[]
  >([]);

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '&:last-child div': { border: 0 },
        }}
      >
        {filteredRestaurants.length > 0 &&
          filteredRestaurants.map((restaurant) => {
            return (
              <EstablishmentCard
                key={restaurant.name}
                establishment={restaurant}
              />
            );
          })}
      </Box>
    </Box>
  );
}
