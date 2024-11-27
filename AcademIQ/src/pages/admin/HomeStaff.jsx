import { Box, Card, Typography, Button, Grid2 } from "@mui/material";
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getCoursesAsync } from "../../features/courses/courseSlice";
import { getAllStudentsAsync } from "../../features/users/studentSlice";
import { getAllInstructorsAsync } from "../../features/users/instructorSlice";
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import { useTheme } from '@mui/material/styles';

// Styled container for main dashboard layout
const DashboardContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '100%',
    gap: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
}));

// Metrics Card styles
const MetricsCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    textAlign: 'center',
    height: '150px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: theme.transitions.create(['box-shadow', 'transform'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
        transform: 'scale(1.05)', // Correct way to apply scaling
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)', // Slightly stronger shadow on hover
    },
}));

export default function HomeStaff() {
    const dispatch = useDispatch();
    const { activeCourses, status: courseStatus } = useSelector((state) => state.courses);
    const { status, user } = useSelector((state) => state.auth);
    const { students, status: studentStatus } = useSelector((state) => state.students);
    const { instructors, status: instructorStatus} = useSelector((state) => state.instructors)
    const navigate = useNavigate();
    const theme = useTheme();


    useEffect(() => {
        if (status === 'loading') {
            console.log('User not logged in. Redirecting to login page...');
            navigate('/login');
        }
    }, [status, navigate]);

    useEffect(() => {
        if (studentStatus === 'idle') {
            dispatch(getAllStudentsAsync());
        }
    }, [studentStatus, dispatch]);

    useEffect(() => {
        if (instructorStatus === 'idle') {
            dispatch(getAllInstructorsAsync());
        }
    }, [instructorStatus, dispatch]);

    useEffect(() => {
        if (courseStatus === 'idle') {
            dispatch(getAllCoursesAsync());
            dispatch(getCoursesAsync({  active: 'yes'  }));
        }
    }, [courseStatus, dispatch, user]);

    return (
        <DashboardContainer>
            {/* Key Metrics Section */}
            <Typography variant="h2" component="h1" gutterBottom>
                Dashboard
            </Typography>
            
            <Grid2 container spacing={theme.spacing(8)}>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <MetricsCard>
                        <SchoolIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                        <Typography variant="h6" component="div">
                            Total Students
                        </Typography>
                        <Typography variant="h4">{
                            studentStatus !== 'Succe' ? 'Loading...' : students.length
                            }
                        </Typography>
                    </MetricsCard>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <MetricsCard>
                        <GroupsIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                        <Typography variant="h6" component="div">
                            Total Instructors
                        </Typography>
                        <Typography variant="h4">{
                            instructorStatus === 'failed'? 'Loading...' : instructors.length
                        }</Typography>
                    </MetricsCard>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <MetricsCard>
                        <AddIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                        <Typography variant="h6" component="div">
                            Active Courses
                        </Typography>
                        <Typography variant="h4">{
                            courseStatus === 'failed' ? 'Loading...' : activeCourses.length
                            }</Typography>
                    </MetricsCard>
                </Grid2>
            </Grid2>


            {/* Recent Activities Section */}
 
            <Box>
                <Typography variant="h5" gutterBottom>
                    Recent Activities
                </Typography>
                {/* Replace this with dynamic content in the future */}
                <Card sx={{ padding: 3, marginBottom: 3 }}>
                    <Typography variant="body1">New student registered: John Doe</Typography>
                </Card>
                <Card sx={{ padding: 3, marginBottom: 3 }}>
                    <Typography variant="body1">New course added: Intro to Psychology</Typography>
                </Card>
            </Box>

            {/* Quick Actions Section */}
            <Box>
                <Typography variant="h5" gutterBottom>
                    Quick Actions
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4}} >
                        <Button
                            variant="contained"
                            startIcon={<PersonAddIcon />}
                            onClick={() => navigate('/register-student')}
                            sx={{ width: '100%' }} // Full width button in grid cell
                        >
                            Register Student
                        </Button>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4}} >
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/create-course')}
                            sx={{ width: '100%' }} // Full width button in grid cell
                        >
                            Create Course
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </DashboardContainer>
    )
}

