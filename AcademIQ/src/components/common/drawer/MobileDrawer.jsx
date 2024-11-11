import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { Button, Toolbar } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { UserAvatar } from '../profile/UserAvatar';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../../context/AuthContext';
import { Outlet } from 'react-router-dom';

const drawerWidth = 40;

const studentMenuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Profile', icon: <AssignmentIcon /> },
    { text:'Performence', icon: <GradeIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Logout', icon: <LogoutIcon /> },
];

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }));


export default function MobileDrawer() {

    const { loggedIn:  user } = useContext(AuthContext);
    const theme = useTheme();

    return (
        // <Box sx={{ display: 'flex', flexGrow: 0 }}>
      <Drawer variant="permanent" sx={{ 
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            maxWidth: drawerWidth,
            maxHeight: '100%',

            boxSizing: 'border-box',
            position: 'relative',
        }
        }}>
        <Toolbar/>

        <UserAvatar image={user?.picture_URL} size="xs" />
        <Divider />
        <Box component='container' sx={{
            display: 'flex',
            maxWidth: '100%',
            minWidth: '100%',
            marginTop: '20px',
            flexDirection: 'column',
            gap: '20px',
        }}>

        {studentMenuItems.map((item) => (
            <>
          <ListItem key={item.text} sx={{ 
           }}>
            <ListItemButton>
              <ListItemIcon sx={{ color: theme.palette.primary.main, ml: -4 }}>{item.icon}</ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider/>
          </>
          
        ))}
        </Box>
        <Button variant='outlined' sx={{ width: '100%', position: 'absolute', bottom: '10px', minWidth:0}}>
            <LogoutIcon/> </Button>
      </Drawer>
      // <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      //   <Outlet/>
      // </Box>
    // </Box>
    )
}