import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useTheme } from '@mui/material/styles'; // We'll keep using the theme here, but this can be removed if you prefer using plain Bootstrap styles

// Define Action interface to type each action object
interface Action {
  label: string;
  frequency: number;
  svg: string;
  path: string;
}

const BubbleMenu: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // Define the type of `hovered` state as either `number` or `null`
  const [hovered, setHovered] = useState<number | null>(null);

  // Define the actions array with the type `Action[]`
  const actions: Action[] = [
    { label: 'Grades', frequency: 5, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/a+plus.svg', path: '/grades' },
    { label: 'Schedule', frequency: 8, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/bell.svg', path: '/schedule' },
    { label: 'Assignments', frequency: 3, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/book+with+pencil.svg', path: '/assignments' },
    { label: 'Calendar', frequency: 12, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/calendar+2.svg', path: '/calendar' },
    { label: 'Performance', frequency: 8, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/gradeenvelope.svg', path: '/performance' },
    { label: 'My Profile', frequency: 3, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/student.svg', path: '/profile' },
    { label: 'Courses', frequency: 3, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/student.svg', path: '/courses' },
  ];

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        {actions.map((item, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center mb-3">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${index}`}>
                  {item.label}
                </Tooltip>
              }
            >
              <div
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(item.path)}
                style={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease',
                  transform: hovered === index ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: hovered === index ? `0 4px 20px ${theme.palette.background.default}` : 'none',
                  backgroundColor: 'transparent',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  padding: '15px',
                }}
              >
                <Image
                  src={item.svg}
                  alt={item.label}
                  fluid
                  style={{ width: '100%' }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: theme.palette.text.secondary,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    marginTop: '5px',
                  }}
                >
                  {item.label}
                </span>
              </div>
            </OverlayTrigger>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BubbleMenu;
