import * as React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { AiOutlineBarChart, AiOutlineBook, AiOutlineFileText, AiOutlineFundProjectionScreen } from 'react-icons/ai';
import '../../assets/styles/CardButtons.css'; // Import for extra styling

interface CardItem {
  label: string;
  icon: React.ReactNode;
}

// The main card buttons component
const CardButtons: React.FC = () => {
  // Defining the actions with icons
  const items: CardItem[] = [
    {
      label: 'Performance',
      icon: <AiOutlineBarChart size={40} color="#3f51b5" />,
    },
    {
      label: 'Materials',
      icon: <AiOutlineBook size={40} color="#ff4081" />,
    },
    {
      label: 'Assignments',
      icon: <AiOutlineFileText size={40} color="#ff9800" />,
    },
    {
      label: 'Schedule',
      icon: <AiOutlineFundProjectionScreen size={40} color="#4caf50" />,
    },
  ];

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        {items.map((item, index) => (
          <Col key={index} xs={12} sm={6} lg={3} className="d-flex justify-content-center mb-4">
            <Card className="card-button text-center" style={{ cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <Card.Body>
                <div className="icon-container mb-3">
                  {item.icon}
                </div>
                <Card.Title className="card-title"><Typography variant='button' >{item.label}</Typography></Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CardButtons;

// Add the following CSS styling to "CardButtons.css":
