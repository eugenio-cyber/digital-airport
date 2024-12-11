import { Box, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: 'calc(100vh - 160px)',
        margin: '80px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: {
          xs: '4rem',
          lg: '6rem',
        },
        background: '#F3F2F2',
      }}
    >
      <Box sx={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <Typography variant="h4" component="h4" sx={{ fontWeight: '600' }}>
          Bem-vindo!
        </Typography>
        <Typography variant="h5" component="h5" sx={{ color: '#5C5C5C' }}>
          Como podemos ajuda-lo?
        </Typography>
      </Box>
    </Container>
  );
}
