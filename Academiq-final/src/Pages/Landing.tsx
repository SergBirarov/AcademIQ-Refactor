import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  // Handler function for the login button click
  const handleLoginClick = (): void => {
    navigate('/login');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" gutterBottom>Welcome to AcademIQ</Typography>
      <Typography variant="body1" gutterBottom>Your academic portal to success.</Typography>
      <Button variant="contained" color="primary" onClick={handleLoginClick}>
        Get Started
      </Button>
    </Box>
  );
};

export default Landing;