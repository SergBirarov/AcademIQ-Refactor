import {  Grid2 } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getStudentCoursesAsync } from '../../../features/courses/courseSlice';
import  CourseCard  from '../../courses/CourseCard';
import CompactCourseCard from '../../courses/CompactCard';

// const courses = [
//     { id: 1, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
//     { id: 2, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },
//     { id: 3, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
//     { id: 4, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },
//     { id: 6, title: 'Mathematics', instructor: 'John Doe', description: 'An introductory course to mathematics.' },
//     { id: 7, title: 'Physics', instructor: 'Jane Smith', description: 'Learn the fundamentals of physics.' },
//   ];



export default function QuickActionsCourses(){
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getStudentCoursesAsync());
}, [dispatch]);

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
        <Grid2 container spacing={2}>
         {courses.map((course) => (
            <Grid2 item size={{ xs: 12, sm: 6, md: 4}} key={course.id}>
                <CompactCourseCard
                    title={course.CourseName}
                    instructor={course.InstructorFirstName + ' ' + course.InstructorLastName}
                />
            </Grid2>
        ))}
        </Grid2>
    )
}