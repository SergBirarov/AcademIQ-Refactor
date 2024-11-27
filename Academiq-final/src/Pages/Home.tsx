import * as React from 'react';
// import {  Container, Box, Typography, Divider } from '@mui/material'
import BubbleMenu from '../Pages/navigation/BubbleMenu';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickCourseView from '../Components/courses/QuickCourseView';
import { getCoursesAsync } from '../../Redux/slices/courseSlice';
import { User, Student } from '../types/MyTypes.type';
import { AppDispatch, RootState } from '../../Redux/store/store';
import { Box, Container, Divider, Typography } from '@mui/material';
import { getAssignmentsAsync } from '../../Redux/slices/assignmentSlice';
import { getTasksAsync } from '../../Redux/slices/taskSlice';
import { getSubmissionsAsync } from '../../Redux/slices/submissionSlice';


/**
 * The Home component serves as the main dashboard view for authenticated users.
 * It retrieves current user and course information from the Redux store.
 * 
 * Hooks:
 * - useSelector: Accesses authentication and course data from the state.
 * - useNavigate: Provides navigation functionality.
 * - useDispatch: Dispatches Redux actions.
 * 
 * @returns A JSX element displaying the home page.
 */
const Home: React.FC = () => {
    const { user, status } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    if (!user) {
        return <div>Loading...</div>;
      } 

    useEffect(() => {
        if (status === 'loading') {
          console.log('User not logged in. Redirecting to login page...');
          navigate('/login');
        }
      }, [status, navigate]);
    
      useEffect(() => {
        if (status === 'succeeded') {
          dispatch(getCoursesAsync({ userId: user.Id, userType: user.Role }));
          console.log('User logged in. Fetching courses...');
          dispatch(getAssignmentsAsync({ userId: user.Id }));
          console.log('User logged in. Fetching assignments...');
          dispatch(getTasksAsync({ userId: user?.Id }));
          console.log('User logged in. Fetching tasks...');
          dispatch(getSubmissionsAsync({ studentId: user?.Id }));
          console.log('User logged in. Fetching submissions...');
        }
      }, [status, dispatch, user.Id, user.Role]);
    
  

    return (
        <>
        <Container component="main" sx={{ overflowY: 'auto', maxHeight: 'calc(90vh - 64px)' }}>
          <Box mb={4}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Academ<span style={{ color: '#4169E1' }}>IQ</span>, {user.Name}!
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
            <QuickCourseView />
          </Box>
        </Container>
      </>
    );
};
export default Home;
