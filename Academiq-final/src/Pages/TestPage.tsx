import * as React from 'react';
import { Typography, Button } from '@mui/material';
import { Container, Row, Col,  } from 'react-bootstrap'
import { styled } from '@mui/material';
import { CourseCard } from '../Components/courses/CourseCard';
import ExpandableCard from '../Components/common/ExpandableCard';
import ToDoList from '../Components/common/ToDo';
import CardButtons from '../Components/courses/CardButtons';
import EventCalendar from '../Components/calendar/EventCalendar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store/store';






const Home: React.FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { events }= useSelector((state: RootState) => state.calendar);
    
    return (
            <Container fluid >
                <Row>
                    <Col md={8} lg={8} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Nitzan's English - Literature Course
                    </Typography>
                    </Col>
                    <Col  md={4} lg={4} xs={{span: 3, offset:5}}>
                    <ExpandableCard
                        avatar={null}
                        title={"Nitzan's English - Literature Course"}
                        content={"This is a description of the course."}
                        onActionClick={() => {}}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        <EventCalendar />
                    </Col>
                </Row>
            </Container>
    );
};
export default Home;
