import  styled  from '@emotion/styled';
import Card from '@mui/material/Card';
import { Button, Stack, Tooltip, IconButton,Divider, Avatar } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import theme from '../../theme';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Book';


 

const StyledCourseCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxHeight: '100%',
    minHeight: '100%',
    maxWidth: '200px',
    minWidth: '200px',
    borderRadius: '8px',

    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
    },
  }));

  const CourseCardHeader = styled(CardHeader)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    backgroundImage: 'linear-gradient(135deg, rgba(64,224,208,0.8) 0%, rgba(64,224,208,0.4) 100%)',
    '& .MuiCardHeader-avatar': {
        border: '2px solid #f3f3f3f3',
        borderRadius: '50%',
    },
}));

const CourseCardActions = styled(CardActions)(({ theme }) => ({
    justifyContent: 'space-around',
}));

const CourseButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#ffff',
    color: theme.palette.secondary.main,
    borderRadius: '8px',
    width: '100%',
    textAlign: 'center',
    height: '40px',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
    
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: '#ffff',
    }
}));

//{title, instructor, description}

export default function CourseCard() {

    // if (!title || !instructor || !description) {
    //     return (
    //         <div>
    //             <p>No course data available.</p>
    //         </div>
    //     );
    // }

    const course = {
        title: 'Mathematics',
        instructor: 'John Doe',
        description: 'An introductory course to mathematics.',
    }
    return (
        <>
        <CourseCard>
            <CourseCardHeader
                avatar={<Avatar>course.title.charAt(0)</Avatar>}
                title={course.title}
                subheader={course.instructor}
                sx={{
                    WebkitBorderBottomRightRadius: '40px',
                }}
            />
            <CardContent >
                <Typography variant="body2" color="textSecondary">
                    Instructor: {course.instructor}
                </Typography>
                <Typography variant="body2" >
                    {course.description}
                </Typography>
                
            </CardContent>
            <CourseCardActions sx={{ display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" spacing={2}>
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
                    <BookIcon />
                </IconButton>
                </Tooltip>
            </Stack>
            <Divider/>
            <CourseButton  variant="outlined" >View Course</CourseButton>
            </CourseCardActions>
        </CourseCard>
        </>
    )
}