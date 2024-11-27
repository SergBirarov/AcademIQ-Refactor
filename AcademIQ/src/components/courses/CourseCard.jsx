import styled from '@emotion/styled';
import { Card, Button, Stack, Tooltip, IconButton, Divider, Avatar, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactMailIcon from '@mui/icons-material/ContactMail'; // New icon for contacting instructor
import propTypes from 'prop-types';

// Styled Course Card
const StyledCourseCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    maxWidth: '250px',
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
    },
});

// Course Card Header with Gradient
const CourseCardHeader = styled(CardHeader)({
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    backgroundImage: 'linear-gradient(135deg, rgba(64,224,208,0.8) 0%, rgba(64,224,208,0.4) 100%)',
    '& .MuiCardHeader-avatar': {
        border: '2px solid #f3f3f3',
        borderRadius: '50%',
    },
});

// Actions container
const CourseCardActions = styled(CardActions)({
    justifyContent: 'center',
    padding: '8px',
});

// Custom button for viewing the course
const CourseButton = styled(Button)({
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    borderRadius: '8px',
    width: '100%',
    height: '40px',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#2c387e',
    },
});

// Main CourseCard functional component
export default function CourseCard({ title, instructor }) {
    return (
        <StyledCourseCard>
            <CourseCardHeader
                avatar={<Avatar>{title.charAt(0).toUpperCase()}</Avatar>}
                title={title}
                subheader={`Instructor: ${instructor}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Instructor: {instructor}
                </Typography>
            </CardContent>
            <CourseCardActions sx={{ flexDirection: 'column' }}>
                <Stack direction="row" spacing={1}>
                    <Tooltip title="View Notes">
                        <IconButton aria-label="notebook">
                            <BookIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Assignments">
                        <IconButton aria-label="assignments">
                            <AssignmentIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Contact Instructor">
                        <IconButton aria-label="contact instructor">
                            <ContactMailIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Divider sx={{ width: '100%', margin: '8px 0' }} />
                <CourseButton variant="contained" onClick={() => alert(`Viewing ${title}`)}>
                    View Course
                </CourseButton>
            </CourseCardActions>
        </StyledCourseCard>
    );
}

CourseCard.propTypes = {
    title: propTypes.string.isRequired,
    instructor: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
};