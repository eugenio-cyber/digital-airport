import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';

export default function TopBar() {
  return (
    <AppBar
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        position: 'fixed',
        top: '0px',
        width: '100vw',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Toolbar style={{ width: '100%', justifyContent: 'space-between' }}>
        <Toolbar style={{ width: '100%', justifyContent: 'space-between' }}>
          <Box sx={{ position: 'relative', width: '200px', height: '60px' }}>
            <Image src="/airport-logo.jpg" fill alt="Logo do aeroporto" />
          </Box>

          <Box sx={{ position: 'relative', width: '70px', height: '60px' }}>
            <Image src="/account-logo.jpg" fill alt="Logo do aeroporto" />
          </Box>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
}
