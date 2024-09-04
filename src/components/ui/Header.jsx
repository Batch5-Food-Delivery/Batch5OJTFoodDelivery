import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'


const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home" className='text-warning'  >Dreamland Food Delivery</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link  to="/menus" className='text-warning'>Menus</Nav.Link>
          <Nav.Link  to="/menu/create" className='text-warning'>Add</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  )
}

export default Header;
