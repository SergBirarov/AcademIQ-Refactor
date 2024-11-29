import * as React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardActions, Button, Avatar, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCoursesAsync } from '../../../Redux/slices/courseSlice';
import { AppDispatch, RootState } from '../../../Redux/store/store';
import { getAssignmentsAsync } from '../../../Redux/slices/assignmentSlice';
import { getSubmissionsAsync } from '../../../Redux/slices/submissionSlice';
import { getEventsAsync } from '../../../Redux/slices/calendarSlice';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const HomeStaff: React.FC = () => {
    const { user, status } = useSelector((state: RootState) => state.auth);
    const { courses } = useSelector((state: RootState) => state.courses);
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

    const courseIds = courses.map((course) => course.CourseId);

    useEffect(() => {
        if (status === 'succeeded') {
            dispatch(getCoursesAsync({ userId: user.Id, userType: user.Role }));
            console.log('User logged in. Fetching courses...');
            dispatch(getAssignmentsAsync({ userId: user.Id }));
            console.log('User logged in. Fetching assignments...');
            dispatch(getSubmissionsAsync({ studentId: user?.Id }));
            console.log('User logged in. Fetching submissions...');
            dispatch(getEventsAsync({ userId: user.Id, courseIds: courseIds }));
            console.log('User logged in. Fetching events...');
        }
    }, [status, dispatch, user.Id, user.Role]);

    return (
        <Container component="main" sx={{ overflowY: 'auto', maxHeight: 'calc(90vh - 64px)', marginTop: '20px' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Welcome back, {user.Name}!
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Ready to manage your courses, students, and schedule?
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar>
                                    <SchoolIcon color="primary" />
                                </Avatar>
                                <Typography variant="h6" component="div">
                                    Manage Courses
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                View and edit the courses you&apos;re currently overseeing. Add new courses, update existing ones, and assign instructors.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => navigate('/manage-courses')}>Go to Courses</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar>
                                    <PeopleIcon color="secondary" />
                                </Avatar>
                                <Typography variant="h6" component="div">
                                    Manage Students
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                View and manage student details, including enrollments, performance, and personal information.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => navigate('/manage-students')}>Go to Students</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar>
                                    <CalendarMonthIcon color="info" />
                                </Avatar>
                                <Typography variant="h6" component="div">
                                    View & Edit Schedule
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                View, update, and manage the academic schedule, including classes, exams, and holidays.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => navigate('/manage-schedule')}>Go to Schedule</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar>
                                    <AssignmentTurnedInIcon color="success" />
                                </Avatar>
                                <Typography variant="h6" component="div">
                                    Assignments & Submissions
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                Review assignments and track student submissions for each course. Grade assignments as needed.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => navigate('/manage-assignments')}>Manage Assignments</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar>
                                    <EventIcon color="error" />
                                </Avatar>
                                <Typography variant="h6" component="div">
                                    Manage Events
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                Plan and update important academic events, including holidays, meetings, and special classes.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => navigate('/manage-events')}>Go to Events</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomeStaff;
