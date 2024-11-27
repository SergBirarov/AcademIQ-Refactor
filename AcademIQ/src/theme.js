import { createTheme } from '@mui/material/styles';

// Theme configuration
const theme = createTheme({
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
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem', // 40px
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem', // 32px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem', // 28px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'capitalize',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.5,
      color: '#757575',
    },
    subtitle1: {
      fontSize: '1.125rem', // 18px
      lineHeight: 1.6,
      color: '#333333',
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`, // Spacing scale (1 = 4px)
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
    MuiDrawer: {
      
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
          // transition: 'box-shadow 0.3s ease',
          // '&:hover': {
          //   boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          // },
        },
      },
    },
    // MuiAppBar: {
    //   styleOverrides: {
    //     root: {
    //       boxShadow: 'none',
    //       backdropFilter: 'blur(8px)',
    //       backgroundColor: 'rgba(255, 255, 255, 0.8)',
    //     },
    //   },
    // },
    MuiContainer: {
      styleOverrides: {
        root: {

        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#333333',
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
    MuiPaper: {
      styleOverrides: {
        root: {

        },
      },
    },
  },
  shape: {
    borderRadius: 16, // Default border radius for components like buttons, cards, etc.
  },
  shadows: [
    'none',
    '0px 4px 10px rgba(0, 0, 0, 0.1)',
    '0px 6px 15px rgba(0, 0, 0, 0.15)',
    '0px 4px 10px rgba(0, 0, 0, 0.1)',
    '0px 6px 15px rgba(0, 0, 0, 0.15)', // Adds a few commonly-used shadows for depth.
  ],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});

export default theme;
