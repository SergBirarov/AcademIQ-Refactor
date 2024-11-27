import  { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme.js';
import propTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');

  const customTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          ...theme.palette,
          mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

ThemeProviderWrapper.propTypes = {
  children: propTypes.node,
}