import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import UserPanel from '../profile/UserPanel';
import UserMenu from '../profile/UserMenu';
import { LogOutButton } from '../buttons/LogOutButton';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';


const drawerWidth = 240; 


export default function DesktopDrawer() {
    const theme = useTheme();


    return (
        <>
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            maxWidth: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative',
          },
        }}
        variant="permanent"
        anchor="left"
      >
            <UserPanel/>
        <Divider />
        <UserMenu/>
        <Divider />
<LogOutButton />
      </Drawer>
      
<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet/>
      </Box>
      </Box>
      </>
    )
}