import { Box, Card, Typography, Button, Grid2 } from "@mui/material";
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';

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
    padding: theme.spacing(3),
    textAlign: 'center',
    height: '150px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

export default function HomeStaff() {
    const { status } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'loading') {
            console.log('User not logged in. Redirecting to login page...');
            navigate('/login');
        }
    }, [status, navigate]);

    return (
        <DashboardContainer>
            {/* Key Metrics Section */}
            <Typography variant="h2" component="h1" gutterBottom>
                Admin Dashboard
            </Typography>
            
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={4}>
                    <MetricsCard>
                        <SchoolIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                        <Typography variant="h6" component="div">
                            Total Students
                        </Typography>
                        <Typography variant="h4">250</Typography>
                    </MetricsCard>
                </Grid2>
                <Grid2 xs={12} md={4}>
                    <MetricsCard>
                        <GroupsIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                        <Typography variant="h6" component="div">
                            Total Instructors
                        </Typography>
                        <Typography variant="h4">30</Typography>
                    </MetricsCard>
                </Grid2>
                <Grid2 xs={12} md={4}>
                    <MetricsCard>
                        <AddIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                        <Typography variant="h6" component="div">
                            Active Courses
                        </Typography>
                        <Typography variant="h4">15</Typography>
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
                    <Grid2 xs={12} sm={6} md={4}>
                        <Button
                            variant="contained"
                            startIcon={<PersonAddIcon />}
                            onClick={() => navigate('/register-student')}
                            sx={{ width: '100%' }} // Full width button in grid cell
                        >
                            Register Student
                        </Button>
                    </Grid2>
                    <Grid2 xs={12} sm={6} md={4}>
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

