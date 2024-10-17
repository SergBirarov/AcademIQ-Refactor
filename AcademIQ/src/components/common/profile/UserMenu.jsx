import { Box, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';

const studentMenuItems = [
    { text: 'דף הבית', icon: <HomeIcon /> },
    { text: 'פרופיל', icon: <AssignmentIcon /> },
    { text: 'אזור למידה', icon: <GradeIcon /> },
    { text: 'הגדרות', icon: <SettingsIcon /> },
    // { text: 'Logout', icon: <LogoutIcon /> },
];

const professorMenuItems = [
    { text: 'Dashboard', icon: <HomeIcon /> },
    { text: 'Manage Courses', icon: <AssignmentIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    // { text: 'Logout', icon: <LogoutIcon /> },
];

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    direction:'rtl',
}));


//TODO: conditional rendering based on user role

export default function UserMenu() {
        return(
            <StyledBox>
                <List>
                {studentMenuItems.map((item, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            </StyledBox>
    
    )
}