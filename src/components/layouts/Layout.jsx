import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../ui/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Container fluid className='p-0'>
        <Header />
        <main>
            <Outlet></Outlet>
        </main>
    </Container>
  )
}

export default Layout
