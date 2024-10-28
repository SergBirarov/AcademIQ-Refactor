import { createTheme, lighten } from '@mui/material/styles';

// Utility function for responsive sizing
const GetResponsiveSize = (minPx, vwFactor, maxPx) => {
  return `clamp(${minPx}px, ${vwFactor}vw, ${maxPx}px)`;
};

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', 
      contrastText: '#FFFFFF', 
      light: '#728BE6',
    },
    secondary: {
      main: '#40E0D0', 
      contrastText: '#1C2833', 
      light: '#7FFFD4',
    },
    accent: {
      main: '#FFD700', 
    },
    text: {
      primary: '#333333', 
      secondary: '#708090', 
    },
    background: {
      default: '#d0f2ef', 
      paper: '#F5F5F5', 
    },
    action: {
      active: '#4169E1', 
      hover: lighten('#4169E1', 0.3), 
    },
    input: {
      bg: '#FFFFFF', 
      focus: '#F5F5F5', 
    },
  },
  typography: {
    fontFamily: 'Rubik, sans-serif',
    h1: {
      fontSize: GetResponsiveSize(36, 16, 48), 
      fontWeight: 900,
      lineHeight: GetResponsiveSize(48, 3, 56),
      letterSpacing: '0.04em',
      marginBottom: GetResponsiveSize(24, 1.5, 32),
    },
    h2: {
      fontSize: GetResponsiveSize(30, 2, 36),
      fontWeight: 600,
      // lineHeight: GetResponsiveSize(40, 2.5, 48),
      letterSpacing: '0.04em',
      marginBottom: GetResponsiveSize(20, 1.3, 28),
    },
    body1: {
      fontSize: GetResponsiveSize(16, 1, 18), 
      fontWeight: 400, 
      lineHeight: GetResponsiveSize(24, 1.4, 28), 
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
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: '#4169E1',
          '&:hover': {
            backgroundColor: lighten('#4169E1', 0.3),
          },
        },
        sizeSmall: {
          width: GetResponsiveSize(50, 4, 60),
          height: GetResponsiveSize(32, 2, 40),
          fontSize: GetResponsiveSize(11, 1.2, 14),
          fontWeight: 600,
        },
        sizeMedium: {
          width: GetResponsiveSize(100, 8, 120),
          height: GetResponsiveSize(36, 4, 44),
          fontSize: GetResponsiveSize(16, 1.4, 18),
          fontWeight: 600,
        },
        sizeLarge: {
          width: GetResponsiveSize(140, 10, 160),
          height: GetResponsiveSize(44, 4, 48),
          fontSize: GetResponsiveSize(18, 1.6, 20),
          fontWeight: 600,
        },
      },
    },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '16px',
    //       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    //     },
    //   },
    // },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       marginBottom: '1rem',
    //     },
    //   },
    // },
    // MuiListItemIcon: {
    //   styleOverrides: {
    //     root: {
    //       minWidth: '40px',
    //       color: '#40E0D0',
    //     },
    //   },
    // },
  },
});

export default theme;
