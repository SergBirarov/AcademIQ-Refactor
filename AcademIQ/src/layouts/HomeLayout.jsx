import { Box, Container, styled } from '@mui/material';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import UserPanel from '../components/common/profile/UserPanel';
import UserMenu from '../components/common/profile/UserMenu';
import { LogOutButton } from '../components/common/buttons/LogOutButton';
import { Outlet }   from 'react-router-dom'


const drawerWidth = 240; 
const LayoutContainer = styled(Container)(({ theme }) => ({
    width: '95%',
    minHeight: '90vh',
    flexDirection: 'row',
    display: 'flex',
    marginTop: '5vh',
    padding: theme.spacing(3),
    borderRadius: '16px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
  }));

export default function HomeLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <LayoutContainer >

      {/* Responsive Profile Panel Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': {
             width: drawerWidth,
              boxSizing: 'border-box',
               borderRadius: '16px',
               height: '100%',
               position: 'relative',
                 } }}
        ModalProps={{
            keepMounted: true, 
          }}
      > 
        <Box>
        <UserPanel />
        </Box>
        <Box>
        <UserMenu />
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <LogOutButton />
        </Box>
      </Drawer>
      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: (theme) => theme.spacing(3),
          marginLeft: { xs: 0, sm: drawerWidth },
        }}
      >
        <Outlet/>
      </Box>
    </LayoutContainer>
  );
}
