import { AppBar, Box, Toolbar } from '@mui/material';
import Image from 'next/image';

export default function TopBar() {
  return (
    <AppBar
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
        height: '80px',
        boxShadow: 'none',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Toolbar style={{ width: '100%', justifyContent: 'space-between' }}>
        <Toolbar style={{ width: '100%', justifyContent: 'space-between' }}>
          <Box
            sx={{
              position: 'relative',
              width: {
                xs: '100px',
                lg: '180px',
              },
              height: {
                xs: '30px',
                lg: '50px',
              },
            }}
          >
            <Image src="/airport-logo.jpg" fill alt="Logo do aeroporto" />
          </Box>

          <Box
            sx={{
              position: 'relative',
              width: {
                xs: '40px',
                lg: '60px',
              },
              height: {
                xs: '30px',
                lg: '50px',
              },
            }}
          >
            <Image src="/account-logo.jpg" fill alt="Logo do aeroporto" />
          </Box>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
}
