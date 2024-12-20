import { Box } from '@mui/material';

export default function ChatbotPage() {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: '46px',
        bottom: '28px',
      }}
    >
      <iframe
        src="https://salvador-airport.strelo.com.br/"
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
}
