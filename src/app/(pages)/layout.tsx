import NavigationHeader from '@/components/NavigationHeader';
import { Box } from '@mui/material';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationHeader />
      <Box sx={{ paddingTop: '40px' }}>{children}</Box>
    </>
  );
}
