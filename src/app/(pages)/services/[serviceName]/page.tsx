'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import useNavigation from '@/hook/useNavigation';
import { createAlias } from '@/utils/EstablishmentUtils';
import Link from 'next/link';

export default function ServicePage() {
  const { serviceName } = useParams<{ serviceName: string }>();
  const { currentEstablishment, findEstablishment, stores, services } =
    useNavigation();

  useEffect(() => {
    findEstablishment(serviceName);
  }, [stores, services]);

  return (
    <>
      {currentEstablishment && (
        <Box sx={{ py: '2rem', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              mb: '2rem',
            }}
          >
            <Image
              src={currentEstablishment.logo}
              width={80}
              height={80}
              alt={currentEstablishment.name}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            <Box>
              <Typography style={{ fontSize: '1.75rem', fontWeight: 600 }}>
                {currentEstablishment.name}
              </Typography>
              <Typography style={{ color: '#00000099' }}>
                {currentEstablishment.serviceCategories.join(', ')}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mb: '2rem' }}>
            <Typography style={{ fontWeight: 600 }}>
              Horário de funcionamento
            </Typography>
            <Typography style={{ color: '#00000099' }}>
              Segunda à Domingo das 10h às 22h
            </Typography>
          </Box>
          <Box sx={{ mb: '2rem' }}>
            <Typography style={{ fontWeight: 600 }}>Contatos</Typography>
            <Typography
              style={{
                color: '#00000099',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <WhatsAppIcon sx={{ width: '1.25rem', mr: '.5rem' }} />
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
                }}
              >
                <InstagramIcon sx={{ width: '1.25rem', mr: '.5rem' }} />@
                {currentEstablishment.instagram}
              </Typography>
            )}
          </Box>
          <Box sx={{ mb: '2rem' }}>
            <Typography style={{ fontWeight: 600 }}>Localização</Typography>
            <Typography
              style={{
                color: '#00000099',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {currentEstablishment.address}
            </Typography>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <iframe
              src={`https://salvador-airport-preview.blumaps.com.br/?location=${currentEstablishment.locationId}`}
              style={{ width: '100%', height: '42vh', borderRadius: '14px' }}
            />

            <Link
              href={`/map/?name=${createAlias(currentEstablishment.name)}`}
              style={{
                position: 'absolute',
                right: '0',
                left: '0',
                top: '0',
                bottom: '0',
                zIndex: 900,
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
