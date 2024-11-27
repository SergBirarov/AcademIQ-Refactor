import { Grid2,  Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CourseCard from '../components/courses/CourseCard';

// const CourseCard = styled(Card)(() => ({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     maxHeight: '100%',
//     minHeight: '100%',
//     maxWidth: '200px',
//     minWidth: '200px',
//     borderRadius: '8px',

//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     '&:hover': {
//       boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
//     },
//   }));

//   const CourseCardHeader = styled(CardHeader)(({ theme }) => ({
//     backgroundColor: theme.palette.secondary.main,
//     color: theme.palette.secondary.contrastText,
//     backgroundImage: 'linear-gradient(135deg, rgba(64,224,208,0.8) 0%, rgba(64,224,208,0.4) 100%)',
//     '& .MuiCardHeader-avatar': {
//         border: '2px solid #f3f3f3f3',
//         borderRadius: '50%',
//     },
// }));

// const CourseCardActions = styled(CardActions)(( ) => ({
//     justifyContent: 'space-around',
// }));

// const CourseButton = styled(Button)(({ theme }) => ({
//     backgroundColor: '#ffff',
//     color: theme.palette.secondary.main,
//     borderRadius: '8px',
//     width: '100%',
//     textAlign: 'center',
//     height: '40px',
//     fontSize: '14px',
//     transition: 'background-color 0.3s ease',
    
//     '&:hover': {
//         backgroundColor: theme.palette.secondary.main,
//         color: '#ffff',
//     }
// }));


// const courses = [
//   { id: 1, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
//   { id: 2, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },
//   { id: 1, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
//   { id: 2, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },{ id: 1, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
//   { id: 2, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },
//   // Add more courses as needed
// ];

export default function Courses() {
  const { courses } = useSelector((state) => state.courses);
  return (
    <Box sx={{ padding: '20px', width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto', scrollbarWidth: 'none' }}>
      <Typography variant="h4"  gutterBottom>
        Your Courses
      </Typography>

      <Grid2 container spacing={4}>
        {courses.map((course) => (
          <Grid2 item size={{ xs: 12, sm: 6, md: 4}}  key={course.id}>
           <CourseCard title={course.title} instructor={course.instructor} />
           {/* <CourseCard>
            <CourseCardHeader
                avatar={<Avatar>{course.title.charAt(0)}</Avatar>}
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
        </CourseCard> */}
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
