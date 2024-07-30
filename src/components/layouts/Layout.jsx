import React from 'react'
import { Card, Container } from 'react-bootstrap'
import Header from '../ui/Header'
import { Outlet } from 'react-router-dom'
import classes from './layout.module.css'

const Layout = () => {
  return (
    <Container fluid className='p-0'>

        <Header />

        <Card className={classes.card}>
           <Card.Img  style={{height:'30rem'}} variant="top" src="/images/home-cover.jpg" />
        </Card>

       <div className={classes.form}>
       <h6 className={classes.welcome}>Welcome Customer</h6>
        <form class="d-flex bg-warning " role="search">
          <input class="form-control me-2" type="search" placeholder="Search Your Fav Restaurant Here" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

       </div>
        <main>
            <Outlet></Outlet>
        </main>
    </Container>
  )
}

export default Layout;
