import React from 'react';
import { Navbar, Nav, NavDropdown, Offcanvas, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../../features/auth/authSlice';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import ForkLeft from '@mui/icons-material/ForkLeft';

const studentMenuItems = [
  { text: 'Performance', icon: <GradeIcon /> },
  { text: 'Assignments', icon: <AssignmentIcon /> },
  { text: 'Settings', icon: <AssignmentIcon /> },
];

const staffMenuItems = [
  { text: 'Manage Students', icon: <AssignmentIcon /> },
  { text: 'Manage Instructors', icon: <ForkLeft /> },
  { text: 'Calendar', icon: <GradeIcon /> },
];

export default function ResponsiveDrawer() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showOffcanvas, setShowOffcanvas] = React.useState(false);

  const menu = user.Role === "Student" ? studentMenuItems : staffMenuItems;

  const handleLogOut = () => {
    dispatch(signOut());
    navigate('/login');
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="light" expand="lg" className="mb-3">
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Academ<span style={{ color: '#3f51b5' }}>IQ</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvas-navbar" onClick={() => setShowOffcanvas(true)} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>
              <HomeIcon /> Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <>
                  <Image
                    src="https://via.placeholder.com/32"
                    roundedCircle
                    style={{ width: 32, height: 32, marginRight: 8 }}
                  />
                  {user.Name}
                </>
              }
              id="user-menu"
            >
              <NavDropdown.Item onClick={() => navigate('/settings')}>Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Offcanvas */}
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {menu.map((item, index) => (
            <Button
              key={index}
              variant="outline-primary"
              className="w-100 mb-2 d-flex align-items-center"
              onClick={() => {
                handleMenuClick(item.text.toLowerCase().replace(' ', '-'));
                setShowOffcanvas(false); // Close the offcanvas after navigation
              }}
            >
              {item.icon}
              <span style={{ marginLeft: '8px' }}>{item.text}</span>
            </Button>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
