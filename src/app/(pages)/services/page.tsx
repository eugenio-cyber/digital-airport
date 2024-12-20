'use client';

import SearchBar from '@/components/SearchBar';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Establishment } from '@/contexts/NavigationProvider';
import EstablishmentCard from '@/components/EstablishmentCard';
import useNavigation from '@/hooks/useNavigation';

export default function ServicesPage() {
  const { stores, services } = useNavigation();
  const [filterText, setFilterText] = useState<string>('');
  const [chosenSegment, setChosenSegment] = useState<'store' | 'service'>(
    'store'
  );
  const [filteredStores, setFilteredStores] = useState<Establishment[]>([]);
  const [filteredServices, setFilteredServices] = useState<Establishment[]>([]);

  const defaultButtonStyle = {
    textAlign: 'center',
    textTransform: 'none',
    flexGrow: 1,
    border: '1px solid #52525233',
    color: '#525252CC',
    backgroundColor: 'transparent',
    '&:hover': {
      fontWeight: 600,
      border: '1px solid #3CA0B9',
      color: '#3CA0B9',
      backgroundColor: '#3CA0B917',
    },
  };

  const activeButtonStyle = {
    textAlign: 'center',
    textTransform: 'none',
    flexGrow: 1,
    fontWeight: 600,
    border: '1px solid #3CA0B9',
    color: '#3CA0B9',
    backgroundColor: '#3CA0B917',
  };

  useEffect(() => {
    if (chosenSegment == 'store') {
      const localStores = stores.filter((store) =>
        store.name.toLowerCase().includes(filterText.toLowerCase())
      );

      setFilteredStores(localStores);
    } else {
      const localServices = services.filter((service) =>
        service.name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredServices(localServices);
    }
  }, [filterText]);

  useEffect(() => {
    if (stores.length) setFilteredStores(stores);
    if (services.length) setFilteredServices(services);
  }, [stores, services]);

  return (
    <Box sx={{ pt: '1.75rem' }}>
      <Box sx={{ display: 'flex', width: '100%', pb: '1.75rem', gap: '.5rem' }}>
        <Button
          onClick={() => {
            setChosenSegment('store');
            setFilteredStores(stores);
            setFilterText('');
          }}
          size="large"
          variant="outlined"
          sx={
            chosenSegment === 'store' ? activeButtonStyle : defaultButtonStyle
          }
        >
          Lojas
        </Button>
        <Button
          onClick={() => {
            setChosenSegment('service');
            setFilteredServices(services);
            setFilterText('');
          }}
          size="large"
          variant="outlined"
          sx={
            chosenSegment === 'service' ? activeButtonStyle : defaultButtonStyle
          }
        >
          Serviços
        </Button>
      </Box>
      <SearchBar
        placeholder={
          chosenSegment === 'store' ? 'Busque uma loja' : 'Busque um serviço'
        }
        value={filterText}
        changeValue={setFilterText}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {chosenSegment === 'store'
          ? filteredStores.length > 0 &&
            filteredStores.map((establishment: Establishment) => {
              return (
                <EstablishmentCard
                  key={establishment.name}
                  establishment={establishment}
                />
              );
            })
          : filteredServices.length > 0 &&
            filteredServices.map((establishment: Establishment) => {
              return (
                <EstablishmentCard
                  key={establishment.name}
                  establishment={establishment}
                />
              );
            })}
      </Box>
    </Box>
  );
}
