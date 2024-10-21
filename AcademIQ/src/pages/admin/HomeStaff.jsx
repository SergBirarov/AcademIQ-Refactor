import { Grid2, Box, Container, Typography, Stack } from "@mui/material";
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext";
import theme from "../../theme";
import { UserAvatar } from "../../components/common/profile/UserAvatar";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Grid3x3 } from "@mui/icons-material";


const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    alignItems: 'center',
    width: '50%',
    minHeight: 'auto',
    maxHeight: '95vh',
    justifyContent: 'center',
    padding: theme.spacing(3),
    borderRadius: '16px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    [theme.breakpoints.down('md')]: {
        width: '90%',
      },
}))

export default function HomeStaff() {
    const { user } = useUser();
    const navigate = useNavigate();


    return (
        <Grid2 container sx={{height: '100%', width: '100%'} }>
            <Box component={'header'}
             sx={{
                 display: 'flex', 
                 flexDirection: 'row', 
                 width: '100%',
                 height: '10vh',
                 justifyContent: 'space-between',
                 alignItems: 'start',
                 }} >
                <Typography variant="h2" component="h1" sx={{textAlign: 'left', color: theme.palette.primary.main}}>
                    Welcome to your Dashboard!
                </Typography>
                    <SettingsOutlinedIcon
                     sx={{color: theme.palette.primary.main, 
                        cursor: 'pointer', 
                        margin : 2,
                        '&:hover':
                         {color: theme.palette.secondary.main,
                             transition: 'color 0.3s ease',
                             },
                        }}
                    />
                
            </Box>

            <StyledBox component={'section'}>
                        <Typography variant="h5" component="h3" sx={{textAlign: 'left', color: theme.palette.primary.main}}>
                            Total Students Enrolled
                        </Typography>
            </StyledBox>
        </Grid2>  
    )
}

