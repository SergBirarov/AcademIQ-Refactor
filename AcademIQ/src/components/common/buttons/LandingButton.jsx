import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LandingButton({ text }) {
  const nav = useNavigate();
  return (
    <Button variant="outlined"  sx={{ mx: 2 }} onClick={() => { nav("/login") }}> 
      {text}
    </Button>//TODO
  );
}