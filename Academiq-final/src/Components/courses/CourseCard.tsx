import * as React from 'react';
import {  Avatar, Typography, Button, Box, Divider, Tooltip, IconButton, Stack, CardHeader, CardActions} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { Card  } from 'react-bootstrap';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactMailIcon from '@mui/icons-material/ContactMail'; // New icon for contacting instructor
import dayjs from 'dayjs';

import { styled } from '@mui/material';
import { CourseType }  from '../../types/MyTypes.type'


interface CourseCardProps{
    course: CourseType;
    onViewCourse?: (CourseId: number) => void;
}


// const StyledCard = styled(Card)({
//     width: '30%',
//     min
//     padding: '16px',
//     borderRadius: '8px',
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//     transition: 'box-shadow 0.3s ease',
//     '&:hover': {
//       boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
//     },
// })


const StyledCardCompact = styled(Card)({
    width: '300px',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
    },
})


const DueBox = styled(Box)({
    backgroundColor: 'red',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '16px',
    marginBottom: '8px',
    textAlign: 'center',
    width: '50%',
    margin: 'auto',
})

// const StyledCompactCard = styled(Card)({

// })

    const now = dayjs();
  const due = true;
export const CourseCard: React.FC<CourseCardProps> = ({ course, onViewCourse}) => {


    const handleViewCourse = () => {
        if(onViewCourse && course.CourseId){
            onViewCourse(course.CourseId);
        }
    };
  

    return (
        <>
        <Card className="course-card">
            <Card.Body className='p-4'>
                <Card.Title>
                <Avatar>{course.CourseName.charAt(0).toUpperCase()}</Avatar>
                    <Typography variant="h5" >{course.CourseName}</Typography>
                   <Card.Subtitle className="mb-2 text-muted">Due: {course.InstructorName}</Card.Subtitle>
                    </Card.Title>
                    <Card.Text>
                    </Card.Text>
                <Tooltip title="Go to course">
                    <Button variant="contained" aria-label="view-course" onClick={handleViewCourse}>Go to course</Button>
                </Tooltip>
               
            </Card.Body>
        </Card>

        {/*
            <CardActions sx={{ flexDirection: 'column' }}>
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
            <Button variant="contained" onClick={handleViewCourse}>
                View Course
            </Button>
            </CardActions>
            */}
            </>
    )
}


export const CompactCard: React.FC<CourseCardProps> = ({ course, onViewCourse}) => {
    const handleViewCourse = () => {
        if(onViewCourse && course.CourseId){
            onViewCourse(course.CourseId);
        }
    };
    return (
        <>
         <StyledCardCompact>
            <CardHeader
                avatar={<Avatar>{course.CourseName.charAt(0).toUpperCase()}</Avatar>}
                title={course.CourseName}
                subheader={`Instructor: ${course.InstructorName}`}
                />
                {due && (
                    <DueBox>
                    <Typography variant="body2" color="textSecondary">
                        Due: {now.format('MM/DD/YYYY')}
                    </Typography>
                    </DueBox>
                )}
            <CardActions sx={{ flexDirection: 'column' }}>
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
                <Button variant="contained" onClick={handleViewCourse}>
                    View Course
                </Button>
            </CardActions>
        </StyledCardCompact>
        </>
    )
}