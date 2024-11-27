import { createTheme, ThemeOptions } from '@mui/material/styles';

// Theme configuration with TypeScript typing
const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: 'Roboto Condensed, sans-serif ',
    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.4 },
    h5: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.5 },
    h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: 'capitalize' },
    caption: { fontSize: '0.75rem', lineHeight: 1.5, color: '#757575' },
    subtitle1: { fontSize: '1.125rem', lineHeight: 1.6, color: '#333333' },

  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'capitalize',
          padding: '0.5rem 1rem',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#3f51b5',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
          '&:hover': {
            textDecoration: 'underline',
            color: '#303f9f',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
