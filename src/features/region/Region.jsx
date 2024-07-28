import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import classes from "./region.module.css";

const Region = ({id,name,image}) => {
  return (
    <Col sm={12} md={3} lg={3} xl={4} className='my-4'>
    <Card style={{ width: '90%' }}  className={classes.regionCard}>
      <Card.Body >
        <Card.Img variant="top"style={{height:"10rem"}} className='w-100' src={image} />
        <Button variant="light"  className={classes.btn}>{name}</Button>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default Region
