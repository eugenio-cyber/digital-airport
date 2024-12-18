import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mb: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: '1.75rem',
            sm: '2rem',
          },
          mb: '.75rem',
        }}
      >
        404 - Página não encontrada
      </Typography>
      <Typography sx={{ mb: '2rem' }}>
        Oops! Página não encontrada. Volte para a página inicial para
        prosseguir.
      </Typography>
      <Link href={'/'}>
        <Button
          variant="contained"
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          Voltar para página inicial
        </Button>
      </Link>
    </Container>
  );
}
