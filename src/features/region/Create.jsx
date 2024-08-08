import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { createRegion } from './regionSlice';

const CreateRegion = () => {

    const [name,setName] = useState("");
    const [canRequest,setCanRequest] = useState(true);
    const dispatch = useDispatch();

    const onNameChange = (e)=>{
        setName(e.target.value);
     }

     const canCreate =[name].every(Boolean);

   const onSubmit = (e) =>{
    e.preventDefault();

   
    setCanRequest(false);
    const region = {
        name,
        
    }
    console.log(region);

    dispatch(createRegion(region));
    setName("");
    setCanRequest(true);

   
 }

  return (
    <>
          <Card>
            <Card.Header>
                    New Region Form
            </Card.Header>
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={onNameChange}   required />
                    </Form.Group>
                    <Form.Group className='mt-2'>
                      <Button variant='primary' type='submit' > Create </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}

export default CreateRegion;
