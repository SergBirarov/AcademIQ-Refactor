import React from 'react';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import './assets/styles/global.css';
import AppRouter from './AppRouter';


const App: React.FC = () => {
  return (
    <ThemeProviderWrapper >
      <CssBaseline />
      <AppRouter />
    </ThemeProviderWrapper>
  );
};
export default App
