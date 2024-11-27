import React, { createContext, useState, useMemo, useContext, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../assets/styles/theme';

interface ThemeContextProps {
  toggleTheme: () => void;
}

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

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

  const toggleTheme = (): void => {
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

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProviderWrapper');
  }
  return context;
};
