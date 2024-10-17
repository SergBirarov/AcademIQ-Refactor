import React from 'react';
import { Button } from '@mui/material';

export default function LandingButton({ text }) {
  return (
    <Button variant="contained" size="large" sx={{ mx: 2 }}>
      {text}
    </Button>
  );
}