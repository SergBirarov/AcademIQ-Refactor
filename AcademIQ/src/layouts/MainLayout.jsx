import { useState } from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Container,
    Typography,
    IconButton,
    useMediaQuery,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Home, Settings, Assignment, Grade, ForkLeft, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { signOut } from '../features/auth/authSlice';
const drawerWidth = '240px';

const LayoutContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    minHeight: '100%',
    width:'100%',
    backgroundColor: theme.palette.background.default,
    alignItems: 'center'
  }));

  export default function MainLayout() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { role, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
  
    const [drawerOpen, setDrawerOpen] = useState(matches);

    // Handle drawer toggle
    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    const studentMenuItems = [
      { text: 'Home', icon: <Home /> },
      { text: 'Profile', icon: <Assignment /> },
      { text: 'Performance', icon: <Grade /> },
      { text: 'Settings', icon: <Settings /> },
    ];
    
    const staffMenuItems = [
      { text: 'Dashboard', icon: <Home /> },
      { text: 'Manage Students', icon: <ForkLeft /> },
      { text: 'Manage Instructors', icon: <ForkLeft /> },
      { text: 'Calendar', icon: <Grade /> },
      { text: 'Settings', icon: <Settings /> },
    ];

    const menu = role === 'Student' ? studentMenuItems : staffMenuItems;
  const handleLogOut = () => {
    dispatch(signOut());
    if(signOut.fulfilled){
      navigate('/login');
    }
  };



  const handleMenuClick = (path) => {
    navigate(path);
}

    return (
      <LayoutContainer>
         <AppBar position="fixed" sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.primary.light
           }}>
        <Toolbar>
        <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ marginRight: 2 }}
                    >
                        {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="title">
          <Typography variant="h4" fontWeight={700} noWrap component="nav">
            Academ<span style={{ color: '#4169E1' }}>IQ</span>
          </Typography>
          </IconButton>
        <IconButton edge="end" color="inherit" aria-label="title" sx={{ ml: 'auto', maxHeight: '50px', maxWidth: '50px' }} onClick={handleLogOut}> 
          <Avatar src={user.Picture_URL} sx={{ maxHeight: '50px', maxWidth: '50px' }} />
        </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer
        variant={matches ? 'permanent' : 'temporary'}
        open={drawerOpen}
        onClose={handleDrawerToggle}

        sx={{
         width: drawerOpen ? drawerWidth : theme.spacing(7),
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerOpen ? drawerWidth : theme.spacing(7),
                        boxSizing: 'border-box',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },}}
      >
       <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menu.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: drawerOpen ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={() => handleMenuClick(`/${item.text.toLowerCase().replace(' ', '-')}`)}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: drawerOpen ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: theme.palette.primary.light
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: drawerOpen ? `${drawerWidth}px` : `${theme.spacing(7)}`,
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
      </LayoutContainer>
    );
  }