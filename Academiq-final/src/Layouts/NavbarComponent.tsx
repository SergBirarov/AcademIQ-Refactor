import React, { useState } from 'react';
import { Navbar, Offcanvas, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAsync } from '../../Redux/slices/authSlice';
import { AppDispatch, RootState } from '../../Redux/store/store';



 interface MenuItem {
  text: string;
  icon: JSX.Element;
}
const NavbarComponent: React.FC = () => {
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuClick = (path: string) => {
    navigate(path);
    setShowOffcanvas(false);
  };

  const handleLogOut = () => {
    dispatch(signOutAsync());
    navigate('/login');
  };

   // Menu items for different roles
   const studentMenuItems: MenuItem[] = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Profile', icon: <AssignmentIcon /> },
    { text: 'Performance', icon: <GradeIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  const staffMenuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <HomeIcon /> },
    { text: 'Manage Students', icon: <ForkLeftIcon /> },
    { text: 'Manage Instructors', icon: <ForkLeftIcon /> },
    { text: 'Calendar', icon: <GradeIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  const menu = role === 'Student' ? studentMenuItems : staffMenuItems;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer', fontWeight: 700 }}
          >
            Academ<span style={{ color: '#4169E1' }}>IQ</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvas-navbar"
            onClick={() => setShowOffcanvas(true)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <>
                    <Image
                      src={user.Picture_URL}
                      roundedCircle
                      style={{ width: '32px', height: '32px', marginRight: '8px' }}
                    />
                    {user.Name}
                  </>
                }
                id="user-menu"
              >
                <NavDropdown.Item onClick={() => handleMenuClick('/settings')}>Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas for Full Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {menuItems.map((item) => (
              <Nav.Link
                key={item.text}
                onClick={() => handleMenuClick(`/${item.text.toLowerCase().replace(' ', '-')}`)}
                className="d-flex align-items-center"
              >
                {item.icon}
                <span style={{ marginLeft: '8px' }}>{item.text}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
    // <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3" >
    //   <a className="navbar-brand" href="/">AcademIQ</a>
    //   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNav">
    //     <ul className="navbar-nav">
    //       <li className="nav-item">
    //         <a className="nav-link" href="/home">Home</a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="/profile">Profile</a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="/courses">Courses</a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default NavbarComponent;
