import {  Grid2, Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
// import  CourseCard  from '../../courses/CourseCard';
import CompactCourseCard from '../../courses/CompactCard';


const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
}))
export default function QuickActionsCourses(){
  const { courses, status, error } = useSelector((state) => state.courses);


if (status === 'loading') {
    return <div>Loading...</div>;
}

if(status === 'succeeded'){
  console.log(courses);
}

if (status === 'failed') {
    return <div>Error: {error}</div>;
}

    return(
        <Box component={'section'} padding={0}>
        <StyledContainer>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                {courses.map((course) => (
                    <CompactCourseCard
                        key={course.id}
                        title={course.CourseName}
                        instructor={course.InstructorName}
                    />
                ))}
            </Box>
        </StyledContainer>
        </Box>

        // <Grid2 container spacing={2}>
        //  {courses.map((course) => (
        //     <Grid2 item size={{ xs: 12, sm: 6, md: 4}} key={course.id}>
        //         <CompactCourseCard
        //             title={course.CourseName}
        //             instructor={course.InstructorName}
        //         />
        //     </Grid2>
        // ))}
        // </Grid2>
    )
}