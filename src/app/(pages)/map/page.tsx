'use client';

import EstablishmentCard from '@/components/EstablishmentCard';
import SearchBar from '@/components/SearchBar';
import { Establishment } from '@/contexts/NavigationProvider';
import useNavigation from '@/hooks/useNavigation';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import { QRCodeSVG } from 'qrcode.react';
import { createAlias } from '@/utils/EstablishmentUtils';
import { useSearchParams } from 'next/navigation';

export default function AirportMapPage() {
  const {
    restaurants,
    stores,
    services,
    fetchEstablishments,
    setCurrentEstablishment,
    currentEstablishment,
  } = useNavigation();
  const searchParams = useSearchParams();
  const [filterText, setFilterText] = useState<string>('');
  const [chosenSegment, setChosenSegment] = useState<string>('');
  const [showCard, setShowCard] = useState<boolean>(false);
  const [establishments, setEstablishments] = useState<Establishment[]>([
    ...restaurants,
    ...stores,
    ...services,
  ]);
  const [filteredEstablishments, setFilteredEstablishments] =
    useState<Establishment[]>();
  const buttonStyle = {
    border: '1px solid #52525233',
    color: '#525252CC',
    backgroundColor: 'transparent',
    width: '50%',
    textAlign: 'center',
    textTransform: 'none',
    '&:hover': {
      fontWeight: 600,
      border: '1px solid #3CA0B9',
      color: '#3CA0B9',
      backgroundColor: '#3CA0B917',
    },
  };

  function establishmentClick(establishment: Establishment) {
    handleSegment(establishment);
    setCurrentEstablishment(establishment);
    setShowCard(true);
    setFilterText('');
  }

  function getQrCodeUrl(segment: string, name: string): string {
    const alias = createAlias(name);
    let url = new URL(location.href).origin;

    switch (segment) {
      case 'restaurant':
        url += '/restaurants';
        break;
      case 'service':
        url += '/services';
        break;
      case 'store':
        url += '/services';
        break;
      default:
        break;
    }

    return (url += `/${alias}`);
  }

  function handleSegment(establishment: Establishment) {
    const segment = establishment.segments[0];

    switch (segment) {
      case 'restaurant':
        setChosenSegment('Restaurantes');
        break;
      case 'service':
        setChosenSegment('Serviços');
        break;
      case 'store':
        setChosenSegment('Lojas');
        break;
      default:
        setChosenSegment('Outros');
        break;
    }
  }

  useEffect(() => {
    const localEstablishments = establishments.filter((establishment) =>
      establishment.name.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredEstablishments(localEstablishments);
  }, [filterText]);

  useEffect(() => {
    const establishmentName = searchParams.get('name');
    if (!establishmentName && currentEstablishment) return;

    const chosenEstablishments = establishments.find(
      (e) => createAlias(e.name) === establishmentName
    );

    if (chosenEstablishments) {
      handleSegment(chosenEstablishments);
      setCurrentEstablishment(chosenEstablishments);
      setShowCard(true);
      setFilterText('');
    }
  }, [establishments]);

  useEffect(() => {
    fetchEstablishments();
  }, []);

  useEffect(() => {
    setEstablishments([...restaurants, ...stores, ...services]);
  }, [restaurants, stores, services]);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          zIndex: 900,
          position: 'fixed',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1.5rem 1.25rem .5rem 1.25rem',
          backgroundColor: '#FFFFFF',
        }}
      >
        {showCard && currentEstablishment && (
          <Box
            sx={{
              zIndex: 900,
              position: 'absolute',
              top: '114px',
              left: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: '5px 15px 10px 0px #00000040',
              borderRadius: '12px',
              padding: '.5rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '.75rem',
                mb: '.75rem',
              }}
            >
              <Image
                src={currentEstablishment.logo}
                width={50}
                height={50}
                alt={currentEstablishment.name}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              <Box>
                <Typography style={{ fontSize: '1rem', fontWeight: 600 }}>
                  {currentEstablishment.name}
                </Typography>
                <Typography style={{ color: '#00000099', fontSize: '14px' }}>
                  {currentEstablishment.serviceCategories.join(', ')}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mb: '.75rem' }}>
              <Typography style={{ fontWeight: 600, fontSize: '1rem' }}>
                Horário de funcionamento
              </Typography>
              <Typography style={{ color: '#00000099', fontSize: '.75rem' }}>
                Segunda à Domingo das 10h às 22h
              </Typography>
            </Box>
            <Box sx={{ mb: '.75rem' }}>
              <Typography style={{ fontWeight: 600, fontSize: '1rem' }}>
                Contatos
              </Typography>
              <Typography
                style={{
                  color: '#00000099',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '.75rem',
                }}
              >
                <WhatsAppIcon sx={{ width: '1.25rem', mr: '.25rem' }} />
                {currentEstablishment.phone
                  .toString()
                  .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4')}
              </Typography>
              {currentEstablishment.instagram && (
                <Typography
                  style={{
                    color: '#00000099',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '.75rem',
                  }}
                >
                  <InstagramIcon sx={{ width: '1.25rem', mr: '.5rem' }} />@
                  {currentEstablishment.instagram}
                </Typography>
              )}
            </Box>
            <Box sx={{ mb: '.75rem' }}>
              <Typography style={{ fontWeight: 600, fontSize: '1rem' }}>
                Localização
              </Typography>
              <Typography
                style={{
                  color: '#00000099',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '.75rem',
                }}
              >
                {currentEstablishment.address}
              </Typography>
            </Box>
            <QRCodeSVG
              value={getQrCodeUrl(
                currentEstablishment.segments[0],
                createAlias(currentEstablishment.name)
              )}
              size={60}
            />
          </Box>
        )}

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: '#FFFFFF',
            maxWidth: '900px',
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <SearchBar
              placeholder="Busque algo pelo aeroporto"
              value={filterText}
              changeValue={setFilterText}
            />

            {chosenSegment && (
              <Button
                onClick={() => {
                  setChosenSegment('');
                  setShowCard(false);
                }}
                variant="outlined"
                sx={{
                  position: 'absolute',
                  right: '8px',
                  top: '10px',
                  px: '6px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '.75rem',
                  color: '#004489',
                  background: '#00448917',
                  border: '1px solid #004489',
                }}
              >
                {chosenSegment} <CloseIcon sx={{ width: '16px' }} />
              </Button>
            )}
          </Box>

          {!filterText && !chosenSegment && !showCard && (
            <>
              <Box sx={{ display: 'flex', gap: '1.5rem', mb: '1rem' }}>
                <Button
                  onClick={() => {
                    setChosenSegment('Restaurantes');
                    setFilteredEstablishments(restaurants);
                  }}
                  size="large"
                  variant="outlined"
                  sx={buttonStyle}
                >
                  Restaurantes
                </Button>
                <Button
                  onClick={() => {
                    setChosenSegment('Lojas');
                    setFilteredEstablishments(stores);
                  }}
                  size="large"
                  variant="outlined"
                  sx={buttonStyle}
                >
                  Lojas
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '1.5rem' }}>
                <Button
                  onClick={() => {
                    setChosenSegment('Serviços');
                    setFilteredEstablishments(services);
                  }}
                  size="large"
                  variant="outlined"
                  sx={buttonStyle}
                >
                  Serviços
                </Button>
                <Button
                  onClick={() => {
                    setChosenSegment('Outros');
                    setFilteredEstablishments(establishments);
                  }}
                  size="large"
                  variant="outlined"
                  sx={buttonStyle}
                >
                  Outros
                </Button>
              </Box>
            </>
          )}

          {(filterText || chosenSegment) &&
            !showCard &&
            filteredEstablishments?.slice(0, 5).map((establishment) => {
              return (
                <EstablishmentCard
                  key={establishment.name}
                  establishment={establishment}
                  handleClickAction={() => establishmentClick(establishment)}
                />
              );
            })}
        </Box>

        {(filterText || chosenSegment) && (
          <ExpandLessIcon
            name="ExpandLessIcon"
            onClick={() => {
              setFilterText('');
              setChosenSegment('');
            }}
            sx={{ mt: '.5rem', cursor: 'pointer' }}
          />
        )}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '80px',
          left: 0,
          right: 0,
          height: 'calc(100vh - 312px)',
        }}
      >
        <iframe
          src={`https://salvador-airport-preview.blumaps.com.br/`}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    </Box>
  );
}
