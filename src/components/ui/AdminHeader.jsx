import React from 'react'
import { Container, Navbar } from 'react-bootstrap'


const AdminHeader = () => {
  return (
    <Navbar expand="lg  m-0" >
    <Container className='m-0'>
      <Navbar.Brand href="#home" className='text-dark '>Dreamland Food Delivery</Navbar.Brand>
    </Container>
  </Navbar>
  
  )
}

export default AdminHeader
