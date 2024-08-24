import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createRegion, getRegionById } from './regionSlice';
import { useParams } from 'react-router-dom';

const UpdateRegion = () => {
    
    const {regionId} = useParams();
    const region = useSelector((state) => getRegionById(state,regionId));
    const [name,setName] = useState(region?.name);
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

    dispatch(createRegion({
        name
    }));
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
                      <Button variant='primary' type='submit' > Update </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}

export default UpdateRegion;
