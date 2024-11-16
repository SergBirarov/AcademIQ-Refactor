import { Drawer, useTheme, Toolbar, Box, Divider, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import LogoutIcon from '@mui/icons-material/Logout';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserPanel from '../profile/UserPanel';
import { ForkLeft } from '@mui/icons-material';

const drawerWidth = 240;

const DrawerContainer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    width: drawerWidth,
  },
  maxHeight: '95vh',
}));

const studentMenuItems = [
  { text: 'Home', icon: <HomeIcon /> },
  { text: 'Profile', icon: <AssignmentIcon /> },
  { text: 'Performance', icon: <GradeIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

const staffMenuItems = [
  { text: 'Dashboard', icon: <HomeIcon /> },
  { text: 'Manage Students', icon: <ForkLeft /> },
  { text: 'Manage Instructors', icon: <ForkLeft /> },
  { text: 'Calendar', icon: <GradeIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

export default function ResponsiveDrawer({ isDesktop }) {
  const theme = useTheme();
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = role === 3 ? studentMenuItems : staffMenuItems;
  const handleLogOut = () => {
    dispatch(signOut());
  };

  const handleMenuClick = (path) => {
    navigate(path);
}


  return (
    <DrawerContainer
      variant={isDesktop ? "permanent" : "temporary"}
      sx={{ width: drawerWidth, flexShrink: 0}}
    >
      <Box>
      <UserPanel />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: '5px',
        }}
      >
        {menu.map((item) => (
          <ListItem key={item.text}>
            <ListItemButton onClick={() => handleMenuClick(`/${item.text.toLowerCase()}`)}>
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary = {item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </Box>
      <Button variant="outlined" sx={{ width: '100%' }} onClick={handleLogOut}>
        <LogoutIcon />
      </Button>
    </DrawerContainer>
  );
}


ResponsiveDrawer.propTypes = {
  isDesktop: propTypes.bool,
};