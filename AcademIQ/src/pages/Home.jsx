import {  Container, Box, Typography, Divider } from '@mui/material'
import BubbleMenu from '../components/common/home/BubbleMenu';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickActionsCourses from '../components/common/home/QuickActionsCourses';
import { getCoursesAsync } from '../features/courses/courseSlice';


export default function Home() {
    const { user, status } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courses, status: courseStatus } = useSelector((state) => state.courses);
    const{ Email, Name, Phone, Address, City, School_Year, Major, Enrorllment, role, id } = user;
    useEffect(() => {
      if (status === "loading") {
        console.log('User not logged in. Redirecting to login page...');
          navigate('/login');
        }
      }, [status, navigate]);

    useEffect(() => {
        if(status === 'succeeded') {
            dispatch(getCoursesAsync(id, role));
        }
    },[status, dispatch, id, role])

    return (
        <>
         <Container component="main" sx={{  overflowY: 'auto', maxHeight: 'calc(90vh - 64px)'}}>
            <Box mb={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Academ<span style={{ color: '#4169E1' }}>IQ</span>, {Name}!
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
        </>

    )
}