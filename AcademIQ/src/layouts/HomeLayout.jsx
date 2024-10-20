import { Container, styled, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import propTypes from 'prop-types';
import DesktopDrawer from '../components/common/drawer/DesktopDrawer';
import MobileDrawer from '../components/common/drawer/MobileDrawer';



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
    backgroundColor: theme.palette.background.paper,
  }));

 
  return (
    <LayoutContainer  >
      {matches ? <DesktopDrawer /> : <MobileDrawer />}
    </LayoutContainer>
  );
}

HomeLayout.propTypes = {
  children: propTypes.node,
};


