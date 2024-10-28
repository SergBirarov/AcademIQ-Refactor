import styled from '@emotion/styled';
import { Box, Container, Grid2} from '@mui/material';
import theme from '../../../theme';
import { SectionTitle } from '../SectionTitle';
import  CourseCard  from '../../courses/CourseCard';

const courses = [
    { id: 1, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
    { id: 2, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },
    { id: 3, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
    { id: 4, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },
    { id: 6, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
    { id: 7, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },
  ];

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    backdropFilter: 'blur(5px)',
}))

const StyledCoursesContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: theme.spacing(3),

}))
export default function QuickActionsCourses(){
    return(
        <StyledContainer>
            <Box>
            <SectionTitle title="Today's Courses" />
            </Box>
            <Container>
            {courses.map((course) => (
          <Grid2 item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard  />
            {/* //title={course.title} instructor={course.instructor} description={course.description} */}
          </Grid2>
        ))}
            </Container>
        </StyledContainer>
    )
}