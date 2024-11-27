import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Box } from '@mui/material'; // We're still using Box from MUI, but you could replace it with a `div` if you prefer consistency.
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store'; // Adjust this import path according to your setup.
import { CourseCard} from '../courses/CourseCard'; // Assuming you have a `CompactCourseCard` component available.
import { CourseType } from '../../types/MyTypes.type';
// Define Course Interface


const QuickActionsCourses: React.FC = () => {

  const { courses, status, error}: {courses: CourseType[], status: string, error: string} = useSelector((state: RootState) => state.courses);
  if (!courses) {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Box component="section" sx={{ padding: 0 }}>
      <Container className="my-4">
        <Row className="justify-content-center">
          {courses && courses.map((course, index, array) => (
            <Col key={(course as CourseType).CourseId} xs={12} sm={6} md={4} className="d-flex justify-content-center mb-3">
              <CourseCard
                course={course as CourseType}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Box>
  );
}

export default QuickActionsCourses;
