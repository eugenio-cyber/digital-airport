import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Modal, Typography } from '@mui/material';

export default function InactivityModal() {
  const [isInactive, setIsInactive] = useState<boolean>(false);
  const router = useRouter();
  let inactivityTimeout: ReturnType<typeof setTimeout>;
  let modalTimeout: ReturnType<typeof setTimeout>;
  const style = {
    zIndex: 1000,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: 380,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '16px',
    p: 4,
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout);
    clearTimeout(modalTimeout);
    setListeners();

    inactivityTimeout = setTimeout(() => {
      setIsInactive(true);

      modalTimeout = setTimeout(() => {
        router.push('/');
      }, 5000);
    }, 40000);
  };

  const setListeners = () => {
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);
  };

  useEffect(() => {
    setListeners();
    resetInactivityTimer();
  }, []);

  return (
    <>
      <Modal
        open={isInactive}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontSize: {
                xs: '18px',
              },
            }}
          >
            Você ainda está utilizando o totem?
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              resetInactivityTimer();
              if (isInactive) setIsInactive(false);
            }}
          >
            Sim
          </Button>
        </Box>
      </Modal>
    </>
  );
}
