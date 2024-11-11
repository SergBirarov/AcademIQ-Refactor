import { Container, useMediaQuery, Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ResponsiveDrawer from '../components/common/drawer/ResponsiveDrawer';

const LayoutContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    width: '95%',
    minHeight: '90vh',
    maxHeight: '90vh',
    marginTop: '5vh',
    paddingLeft: '0px',
    borderRadius: '16px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.default,
    alignItems: 'center'
  }));

  export default function MainLayout() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
  
    return (
      <LayoutContainer>
        <ResponsiveDrawer isDesktop={matches} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, boxSizing: 'border-box'}}>
          <Outlet />
        </Box>
      </LayoutContainer>
    );
  }