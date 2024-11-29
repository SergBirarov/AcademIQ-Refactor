import React, { useState } from 'react';
import { Container, Navbar, Offcanvas,  Nav, Image } from 'react-bootstrap';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../Redux/store/store';
import { signOutAsync } from '../../../Redux/slices/authSlice';
// Import Material UI Icons
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import ForkLeftIcon from '@mui/icons-material/ForkLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import GradingIcon from '@mui/icons-material/Grading';
import MenuBookIcon from '@mui/icons-material/MenuBook';


export interface MenuItem {
    text: string;
    icon: JSX.Element;
  }


 const NavbarComponent: React.FC = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { role, user } = useSelector((state: RootState) => state.auth);
  const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);
  const theme = useTheme();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Menu items for different roles
  const studentMenuItems: MenuItem[] = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Profile', icon: <AssignmentIcon /> },
    { text: 'Courses', icon: <MenuBookIcon /> },
    { text: 'Grades', icon: <GradingIcon /> },
    { text: 'Performance', icon: <GradeIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Log Out', icon: <LogoutIcon /> },
  ];

  const staffMenuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <HomeIcon /> },
    { text: 'Manage Students', icon: <ForkLeftIcon /> },
    { text: 'Manage Instructors', icon: <ForkLeftIcon /> },
    { text: 'Calendar', icon: <GradeIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Log Out', icon: <LogoutIcon /> },
  ];

  const menu = role === 'Student' ? studentMenuItems : staffMenuItems;


  // Toggle the offcanvas menu
  const handleMenuToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleMenuClick = async (path: string) => {
      if (path === '/log-out') {
        setShowOffcanvas(false);

        try {
            await dispatch(signOutAsync()).unwrap(); 
            navigate('/login'); 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    } else {
      console.log(path);
        navigate(path); 
    }
    }


    return (
        <>
        <Navbar bg={theme.palette.background.default} expand="lg" className="mb-3" >
        <Container fluid>


          <Navbar.Brand
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer', fontWeight: 700 }}
          >
            Academ<span style={{ color: '#4169E1' }}>IQ</span>
          </Navbar.Brand>


          <Navbar.Toggle
            aria-controls="offcanvas-navbar"
            onClick={handleMenuToggle}
          />


          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
            <div
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={handleMenuToggle}
              >
                <Image
                  src={user.Picture_URL}
                  alt="User"
                  roundedCircle
                  style={{ width: '32px', height: '32px', marginRight: '8px' }}
                />
                <span>{user.Name}</span>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


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
            {menu.map((item) => (
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
   )
 }

    export default NavbarComponent;