import {  Container, Box, Typography, Divider } from '@mui/material'
import Grid from '@mui/material/Grid2'
import BubbleMenu from '../components/common/home/BubbleMenu';
import { useSelector } from 'react-redux';
import { getToken } from '../utils/GeneralHelpers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickActionsCourses from '../components/common/home/QuickActionsCourses';


export default function Home() {
    // const { isAuthenticated, user } = useContext(AuthContext);
    const token = getToken();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
      if (user === null) {
          console.log("(home)isAuthenticated");
          navigate('/login');
        }
      }, [user, navigate]);

    return (
        <>
         <Container maxWidth="lg" sx={{  overflowY: 'auto', maxHeight: 'calc(90vh - 64px)'}}>
            <Box mb={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Academ<span style={{ color: '#4169E1' }}>IQ</span>, {user?.FirstName}!
                </Typography>
                <Typography variant="body1">
                    Choose an action or jump right back to one of your classes
                </Typography>
            <Divider sx={{ mb: 4 }} />
            <BubbleMenu />
            </Box>

            <Divider sx={{ mb: 2 }} />
            <Box mb={4}>
            <Typography variant="h3" component="h1" gutterBottom>
                    Let's get started!
                </Typography>
            <QuickActionsCourses />
            </Box>
        </Container>
        {/* <Grid container spacing={2} >
          <Grid item xs={12} >
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Academ<span style={{ color: '#4169E1' }}>IQ</span> {user?.FirstName}
            </Typography>
          </Grid>

          <Grid item xs={12} component={Box} sx={{ display: 'flex', justifyContent: 'center', height: '40%' }} >
            <BubbleMenu/>
          </Grid>

        </Grid> */}
        </>

    )
}