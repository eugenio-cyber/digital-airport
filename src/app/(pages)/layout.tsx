import NavigationHeader from '@/components/NavigationHeader';
import { Container } from '@mui/material';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationHeader />
      <Container maxWidth="md" sx={{ paddingTop: '40px' }}>
        {children}
      </Container>
    </>
  );
}
