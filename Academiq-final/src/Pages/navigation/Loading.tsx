import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      className="loading-container"
    >
      <CircularProgress />
      <span style={{ marginLeft: '10px', fontSize: '1.2rem', color: '#555' }}>Loading...</span>
    </Box>
  );
};

export default Loading;
