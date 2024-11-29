import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/store/store';
import { getAllStudentsAsync } from '../../../Redux/slices/studentSlice';
import {
  Container, Row, Col, Card, Form, Button, ToggleButton, ToggleButtonGroup, Table, Image
} from 'react-bootstrap';

const StudentManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students } = useSelector((state: RootState) => state.students);

  const [filterMajor, setFilterMajor] = useState<string>('');
  const [filterYear, setFilterYear] = useState<string>('');
  const [filterCourse, setFilterCourse] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'list' | 'card'>('table');

  useEffect(() => {
    dispatch(getAllStudentsAsync());
  }, [dispatch]);

  const handleViewChange = (
    newViewMode: 'table' | 'list' | 'card'
  ) => {
    if (newViewMode) {
      setViewMode(newViewMode);
    }
  };

  if(!students || students.length === 0) {
    return (
      <Container>
        <h4 className="mt-4 mb-4">Manage Students</h4>
        <p>Loading...</p>
      </Container>
    );
  }

  const filteredStudents = students.filter(student => {
    return (
      (!filterMajor || student.Major === filterMajor) &&
      (!filterYear || student.School_Year.toString()  === filterYear) 
    );
  });

  return (
    <Container>
      <h4 className="mt-4 mb-4">Manage Students</h4>
      
      {/* Filter Controls */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="filterMajor">
            <Form.Label>Major</Form.Label>
            <Form.Control
              as="select"
              value={filterMajor}
              onChange={(e) => setFilterMajor(e.target.value)}
            >
              <option value="">All</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Psychology">Psychology</option>
              <option value="Economics">Economics</option>
              <option value="Business">Business</option>
              <option value="Law">Law</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="filterYear">
            <Form.Label>Year</Form.Label>
            <Form.Control
              as="select"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="filterCourse">
            <Form.Label>Course</Form.Label>
            <Form.Control
              as="select"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* View Mode Toggle */}
      <ToggleButtonGroup
        type="radio"
        name="viewMode"
        value={viewMode}
        onChange={handleViewChange}
        className="mb-4"
      >
        <ToggleButton id="table-view" value="table" variant="outline-primary">
          Table View
        </ToggleButton>
        <ToggleButton id="list-view" value="list" variant="outline-primary">
          List View
        </ToggleButton>
        <ToggleButton id="card-view" value="card" variant="outline-primary">
          Card View
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Students Display */}
      {viewMode === 'table' && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
              <th>Major</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.UserId}>
                <td><Image src={student.Picture_URL} alt={student.FirstName + ' ' + student.LastName} rounded width="50" /></td>
                <td>{student.UserId}</td>
                <td>{student.FirstName + ' ' + student.LastName}</td>
                <td>{student.School_Year}</td>
                <td>{student.Major}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {viewMode === 'list' && (
        <Row>
          {filteredStudents.map(student => (
            <Col xs={12} key={student.UserId} className="mb-3">
              <Card>
                <Card.Body className="d-flex align-items-center">
                  <Image src={student.Picture_URL} alt={student.FirstName + ' ' + student.LastName} rounded width="50" className="mr-3" />
                  <div>
                    <Card.Title>{student.FirstName + ' ' + student.LastName}</Card.Title>
                    <Card.Text>ID: {student.UserId} | Year: {student.School_Year} | Major: {student.Major}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {viewMode === 'card' && (
        <Row>
          {filteredStudents.map(student => (
            <Col xs={12} sm={6} md={4} lg={3} key={student.UserId} className="mb-4">
              <Card>
                <Card.Img variant="top" src={student.Picture_URL} alt={student.FirstName} />
                <Card.Body>
                  <Card.Title>{student.FirstName + ' ' + student.LastName}</Card.Title>
                  <Card.Text>
                    <strong>ID:</strong> {student.UserId} <br />
                    <strong>Year:</strong> {student.School_Year} <br />
                    <strong>Major:</strong> {student.Major}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default StudentManagement;
