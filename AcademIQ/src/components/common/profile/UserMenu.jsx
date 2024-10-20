import { Box, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import theme from "../../../theme.js";
import { useNavigate } from 'react-router-dom';

const studentMenuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Profile', icon: <AssignmentIcon /> },
    { text:'Performence', icon: <GradeIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    // { text: 'Logout', icon: <LogoutIcon /> },
];

// const professorMenuItems = [
//     { text: 'Dashboard', icon: <HomeIcon /> },
//     { text: 'Manage Courses', icon: <AssignmentIcon /> },
//     { text: 'Settings', icon: <SettingsIcon /> },
//     // { text: 'Logout', icon: <LogoutIcon /> },
// ];




//TODO: conditional rendering based on user role

export default function UserMenu() {

    const navigate = useNavigate();

    const handleMenuClick = (path) => {
        navigate(path);
    }

        return(
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
    
    )
}