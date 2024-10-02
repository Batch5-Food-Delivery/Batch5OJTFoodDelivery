import React from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getRoles } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const roles = useSelector(getRoles);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="#home" className="text-warning">
          Dreamland Food Delivery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/menu" className="text-warning">
              Menus
            </Nav.Link>
            <Nav.Link as={Link} to="/menu/create" className="text-warning">
              Add
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle as="a" className="btn btn-link">
                <i className="bi bi-person"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/login">
                  Login
                </Dropdown.Item>
                <Dropdown.Item href="#">Orders</Dropdown.Item>
                <Dropdown.Item href="#">Deliveries</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {roles.includes("DRIVER") && (
              <Nav.Link as={Link} to="/driver" className="text-warning">
                <i class="bi bi-car-front"></i>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
