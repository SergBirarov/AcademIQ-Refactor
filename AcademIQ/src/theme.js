import { createTheme } from '@mui/material/styles';
import { lighten } from '@mui/system';

// Utility function for responsive sizing
const GetResponsiveSize = (minPx, vwFactor, maxPx) => {
  return `clamp(${minPx}px, ${vwFactor}vw, ${maxPx}px)`;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Primary1 - dark blue (main primary color)
      contrastText: '#FFFFFF', // Primary3 - white (primary text color for dark backgrounds)
    },
    secondary: {
      main: '#40E0D0', // Secondary1 - turquoise (main secondary color)
      contrastText: '#FF7F50', // Secondary2 - coral
    },
    accent: {
      main: '#FFD700', // Accent color - gold (for special sections)
    },
    text: {
      primary: '#333333', // Text1 - dark gray
      secondary: '#708090', // Text2 - slate gray
    },
    background: {
      default: '#d0f2ef', // Background - light turquoise (main background color)
      paper: '#F5f5f5', // Paper background, often used for cards
    },
    action: {
      active: '#4169E1', // Button1 - royal blue (main button color)
      hover: lighten('#4169E1', 0.3), // Lighter shade of the main button color on hover
    },
    input: {
      bg: '#FFFFFF', // Input field background - white
      focus: '#F5F5F5', // Input field focus background - light gray
    },
  },
  typography: {
    fontFamily: 'Rubik, sans-serif',
    h1: {
      fontSize: GetResponsiveSize(36, 16, 48), // 36-48px
      fontWeight: 900, // Bold
      lineHeight: GetResponsiveSize(48, 3, 56), // 48-56px
      letterSpacing: '0.07em',
      marginBottom: GetResponsiveSize(24, 1.5, 32), // 24-32px
    },
    h2: {
      fontSize: GetResponsiveSize(30, 2, 36), // 30-36px
      fontWeight: 600, // Semi-Bold
      lineHeight: GetResponsiveSize(40, 2.5, 48), // 40-48px
      letterSpacing: '0.07em',
      marginBottom: GetResponsiveSize(20, 1.3, 28), // 20-28px
    },
    h3: {
      fontSize: GetResponsiveSize(24, 1.6, 30), // 24-30px
      fontWeight: 600, // Semi-Bold
      lineHeight: GetResponsiveSize(32, 2, 40), // 32-40px
      marginBottom: GetResponsiveSize(16, 1, 24), // 16-24px
    },
    h4: {
      fontSize: GetResponsiveSize(20, 1.3, 24), // 20-24px
      fontWeight: 500, // Medium to Semi-Bold
      lineHeight: GetResponsiveSize(28, 1.5, 36), // 28-36px
      marginBottom: GetResponsiveSize(12, 0.8, 20), // 12-20px
    },
    body1: {
      fontSize: GetResponsiveSize(16, 1, 18), // 16-18px
      fontWeight: 400, // Regular
      lineHeight: GetResponsiveSize(24, 1.4, 28), // 24-28px
      marginBottom: GetResponsiveSize(16, 1, 24), // 16-24px
    },
    cardTitle: {
      fontSize: GetResponsiveSize(18, 1.2, 20), // 18-20px
      fontWeight: 400, // Regular
      lineHeight: GetResponsiveSize(24, 1.3, 28), // 24-28px
    },
    cardBody: {
      fontSize: GetResponsiveSize(14, 0.9, 16), // 14-16px
      fontWeight: 400, // Regular
      lineHeight: GetResponsiveSize(20, 1.2, 24), // 20-24px
    },
    sectionHeader: {
      fontSize: GetResponsiveSize(22, 1.2, 26), // 18-20px
      fontWeight: 700, // Bold
      lineHeight: GetResponsiveSize(24, 1.3, 28), // 24-28px
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`, // This allows for the spacing scale (e.g., spacing(1) = 4px)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White text on buttons
          backgroundColor: '#4169E1', // Button1 - royal blue
          '&:hover': {
            backgroundColor: lighten('#4169E1', 0.3), // Lighter shade of the main button color on hover
          },
        },
        sizeSmall: {
          width: GetResponsiveSize(48, 4, 60), // 48-60px
          height: GetResponsiveSize(32, 2, 40), // 32-40px
          fontSize: GetResponsiveSize(14, 1.2, 16), // 14-16px
          padding: '0.875rem',
          borderRadius: '0.5rem',
        },
        sizeMedium: {
          width: GetResponsiveSize(100, 8, 120), // 100-120px
          height: GetResponsiveSize(36, 4, 44), // 36-44px
          fontSize: GetResponsiveSize(16, 1.4, 18), // 16-18px
          padding: '1rem',
          borderRadius: '0.75rem',
        },
        sizeLarge: {
          width: GetResponsiveSize(260, 10, 280), // 140-160px
          height: GetResponsiveSize(44, 4, 48),
          fontSize: GetResponsiveSize(18, 1.6, 20), // 18-20px
          padding: '1.25rem',
          borderRadius: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // For small cards
        },
        small: {
          width: GetResponsiveSize(250, 15, 300), // 250-300px
          height: GetResponsiveSize(300, 20, 350), // 300-350px
          padding: GetResponsiveSize(16, 1, 20), // 16-20px
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        medium: {
          width: GetResponsiveSize(350, 20, 450), // 350-450px
          height: GetResponsiveSize(400, 25, 500), // 400-500px
          padding: GetResponsiveSize(20, 1.5, 24), // 20-24px
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        },
        large: {
          width: GetResponsiveSize(500, 25, 600), // 500-600px
          height: GetResponsiveSize(500, 30, 650), // 500-650px
          padding: GetResponsiveSize(24, 2, 32), // 24-32px
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          padding: GetResponsiveSize(16, 1, 24), // 16-24px
        },
        sizeSmall: {
          width: GetResponsiveSize(400, 10, 500), // 400-500px
          height: GetResponsiveSize(300, 10, 400), // 300-400px
        },
        sizeMedium: {
          width: GetResponsiveSize(600, 15, 800), // 600-800px
          height: GetResponsiveSize(400, 12, 600), // 400-600px
        },
        sizeLarge: {
          width: GetResponsiveSize(800, 20, 1000), // 800-1000px
          height: GetResponsiveSize(600, 15, 800), // 600-800px
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: '1.5rem', // 24px
        },
        fontSizeMedium: {
          fontSize: '2rem', // 32px
        },
        fontSizeLarge: {
          fontSize: '3rem', // 48px
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: GetResponsiveSize(12, 0.8, 14), // 12-14px
          padding: GetResponsiveSize(4, 0.5, 8), // 4-8px
          borderRadius: '0.25rem',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          height: GetResponsiveSize(40, 1.5, 48), // 40-48px
          padding: GetResponsiveSize(8, 1, 12), // 8-12px
          fontSize: GetResponsiveSize(16, 1, 18), // 16-18px
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: GetResponsiveSize(24, 2, 24), // 40-48px
          height: GetResponsiveSize(24, 2, 24), // 40-48px
          color: '#40E0D0',
        },

      },
    },
  },
});

export default theme;
