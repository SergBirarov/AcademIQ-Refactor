import * as React from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';

const NavCanvas = (role: string, show: boolean, ) => {
    return (
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
    )
}