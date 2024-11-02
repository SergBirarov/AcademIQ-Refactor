import { Box, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import { useContext } from "react";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from "../../../theme.js";
import { useNavigate } from 'react-router-dom';
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SpatialAudioOffOutlinedIcon from '@mui/icons-material/SpatialAudioOffOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { AuthContext } from "../../../context/AuthContext.jsx";

const studentMenuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Profile', icon: <AssignmentIcon /> },
    { text:'Performance', icon: <GradeIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    // { text: 'Logout', icon: <LogoutIcon /> },
];

const staffMenuItems = [
    { text: 'Overview', icon: <HomeIcon /> },
    { text: 'Manage Students And Staff', icon: <HailOutlinedIcon /> },
    { text: 'Manage Tuitions', icon: <AssuredWorkloadOutlinedIcon /> },
    { text: 'Calendar', icon: <CalendarMonthOutlinedIcon /> },
    { text: 'Notices', icon: <SpatialAudioOffOutlinedIcon /> },
    { text: 'General Information', icon: <BarChartOutlinedIcon /> },
];




//TODO: conditional rendering based on user role

export default function UserMenu() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const renderMenu = user?.role_code == '3'? studentMenuItems : staffMenuItems; 
    const handleMenuClick = (path) => {
        navigate(path);
    }

        return(
            <Box component={'nav'} sx={{ height: '50%', display: 'flex' }}>
                <List>
                {studentMenuItems.map((item, index) => (
                    <ListItem button key={index}
                    onClick={() => handleMenuClick(`/${item.text.toLowerCase()}`)}
                    sx={{ 
                        '&:hover': { backgroundColor: theme.palette.secondary.light }, 
                        cursor: 'pointer' 
                    }}>
                        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text}  />
                    </ListItem>
                ))}
            </List>
            </Box>
    
    )
}