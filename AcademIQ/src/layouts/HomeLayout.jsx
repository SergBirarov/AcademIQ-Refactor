import { Container, styled, useMediaQuery, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import propTypes from 'prop-types';
import DesktopDrawer from '../components/common/drawer/DesktopDrawer';
import MobileDrawer from '../components/common/drawer/MobileDrawer';

const drawerWidth = 240; 


export default function HomeLayout() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));


  const LayoutContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    maxWidth: '95%',
    minHeight: '90vh',
    maxHeight: '90vh',
    minWidth: '95%',
    marginTop: '5vh',
    borderRadius: '16px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.light} 50%)`,
    animation: 'moveBackground 8s infinite alternate',
    '@keyframes moveBackground': {
      '0%': {
        backgroundPosition: '0% 0%',
      },
      '100%': {
        backgroundPosition: '100% 100%',
      },
    },
    // backgroundColor: theme.palette.background.paper,
  }));

 
  return (
    <LayoutContainer  >
      {matches ? <DesktopDrawer /> : <MobileDrawer />}
      <Box component="main" sx={{ display: 'flex', position: 'relative', flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Outlet/>
      </Box>
    </LayoutContainer>
  );
}

HomeLayout.propTypes = {
  children: propTypes.node,
};


