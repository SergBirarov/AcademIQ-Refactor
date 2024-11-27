import * as React from 'react';
import { Badge } from 'react-bootstrap';

interface BadgeComponentProps {
    bg: string;
    children: React.ReactNode;
}


const BadgeComponent: React.FC<BadgeComponentProps> = ({ bg, children }) => {
    return (
      <Badge bg={bg}>
        {children}
      </Badge>
    );
  };
  
  export default BadgeComponent;