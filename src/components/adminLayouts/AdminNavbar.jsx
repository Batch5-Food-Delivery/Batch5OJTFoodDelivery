import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUserShield } from 'react-icons/fa';
import classes from './adminNavbar.module.css'

const AdminNavbar = () => {
  return (
    <Navbar expand="lg" className={classes.navbar}>
      <Container>
        <Navbar.Brand href="/" className={classes.brand}>
          Admin Dashboard
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/profile">
            <FaUserShield /> Admin Profile
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
