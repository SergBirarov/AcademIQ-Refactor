import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NoMatch: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" gutterBottom>
        404 - You seem lost!
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ marginTop: '20px' }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NoMatch;
