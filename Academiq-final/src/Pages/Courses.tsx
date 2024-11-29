import * as React from 'react';
import {  Container, Row, Col } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CourseCard } from '../Components/courses/CourseCard';
import { CourseType } from '../types/MyTypes.type';
import ExpandableCard from '../Components/common/ExpandableCard';
import ToDoList from '../Components/common/ToDo';
import AssignmentsComponent from '../Components/courses/AssignmentsComponent';


const Courses: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const { courses } = useSelector((state: RootState) => state.courses);
    // const { tasks } = useSelector((state: RootState) => state.tasks);
    // const { assignments } = useSelector((state: RootState) => state.assignments);
    
    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    if(!user) {
        return <div>Loading...</div>;
    }
   
    
    
    return (

      <Box component="main">
      <Container fluid className="my-4">
          {/* Title and Expandable Card Row */}
          <Row className="align-items-center mb-4">
              <Col md={8} lg={8} xs={12}>
                  <Typography variant="h4" gutterBottom>
                      {user.Name}&apos;s Courses and Assignments
                  </Typography>
              </Col>
              <Col md={4} lg={4} xs={12} className="text-end">
                  <ExpandableCard
                      avatar={null}
                      title={``}
                      content={""}
                      onActionClick={() => {}}
                  />
              </Col>
          </Row>

          {/* Courses and To-Do List Row */}
          <Row>
              <Col md={6} lg={8}>
                  <Row>
                      {courses && courses.map((course, index) => (
                          <Col key={index} xs={12} sm={6} md={6} className="mb-3">
                              <CourseCard
                                  course={course as CourseType}
                              />
                          </Col>
                      ))}
                  </Row>
              </Col>
              <Col md={6} lg={4} xs={12} className="d-flex justify-content-center">
                  <ToDoList />
              </Col>
          </Row>
          <Row>
              <Col md={10} lg={8}>
                 <AssignmentsComponent/>
              </Col>
          </Row>
      </Container>
  </Box>
    );
};
export default Courses;
