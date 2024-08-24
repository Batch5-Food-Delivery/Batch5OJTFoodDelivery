import React from 'react'
import AdminHeader from '../ui/AdminHeader'
import Sidebar from './Sidebar'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'


const AdminLayout = () => {
  return (
    <Container fluid className='p-0'>
         <Row className='p-0 w-100'>
          <Col lg={1} className="p-0" ><Sidebar></Sidebar></Col>
            <Col lg={11} className='p-0'>

            <AdminHeader></AdminHeader>
            <main>
               <Outlet></Outlet>
            </main>

            </Col>
        </Row>
    </Container>
  )
}

export default AdminLayout
