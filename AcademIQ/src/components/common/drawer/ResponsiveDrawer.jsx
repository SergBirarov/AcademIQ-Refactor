import { Drawer, Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material';
import { useTheme } from '@emotion/react';
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
import UserPanel from '../profile/UserPanel';
import { ForkLeft } from '@mui/icons-material';
import { useEffect, useMemo } from 'react';

const drawerWidth = '240px';

const DrawerContainer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    // position: 'relative',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    width: drawerWidth,
    padding: 4,
  },
}));

const studentMenuItems = [
  { text: 'Home', icon: <HomeIcon /> },
  { text: 'Profile', icon: <AssignmentIcon /> },
  { text: 'Performance', icon: <GradeIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

const staffMenuItems = [
  { text: 'Dashboard', icon: <HomeIcon /> },
  { text: 'Manage Students', icon: <AssignmentIcon /> },
  { text: 'Manage Instructors', icon: <ForkLeft /> },
  { text: 'Calendar', icon: <GradeIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

export default function ResponsiveDrawer({ isDesktop }) {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = useMemo(() => {
    console.log("rendering menu", user.Role);
    return user.Role === "Student" ? studentMenuItems : staffMenuItems;
  }, [user.Role]);
  const handleLogOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if(signOut.fulfilled){
      navigate('/login');
    }
  },[dispatch, navigate]);

  const handleMenuClick = (path) => {
    navigate(path);
}


  return (
    <DrawerContainer
    variant={isDesktop ? 'permanent' : 'temporary'}
    anchor="left"
    open={isDesktop} // Control whether the drawer is open or not based on `isDesktop`
  >
    <Box>
    <UserPanel />
    </Box>
    <Box
    >
      {/* Menu Items Section */}
      <List>
        {menu.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(item.text)}>
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout Button */}
      <Button
        variant="outlined"
        startIcon={<LogoutIcon />}
        sx={{
          alignSelf: 'center',
          width: '80%',
          marginBottom: theme.spacing(2),
        }}
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </Box>
  </DrawerContainer>
  );
}


ResponsiveDrawer.propTypes = {
  isDesktop: propTypes.bool,
};


