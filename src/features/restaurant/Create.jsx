import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { createRestaurant } from './restaurantSlice';

const Create = () => {
    const [profile,setProfile] = useState("");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [address,setAddress] = useState("");
    const [owner,setOwner] = useState("");
    const [canRequest,setCanRequest] = useState(true);

    const dispatch = useDispatch();

    const onNameChange = (e)=>{
        setName(e.target.value);
     }
     const onProfileChange = (e)=>{
        setProfile(e.target.value);
     }
     const onDescriptionChange = (e)=>{
        setDescription(e.target.value);
     }
     const onAddressChange = (e)=>{
        setAddress(e.target.value);
     }

     const canCreate =[name,description,address,canRequest].every(Boolean);

 const onSubmit = (e) =>{
    e.preventDefault();

   
    setCanRequest(false);
    const restaurant = {
        name,
        description,
        profile:profile,
        owner_id:owner,
        address_id:address,
        
    }
    console.log(restaurant);

    dispatch(createRestaurant(restaurant));
    setName("");
    setDescription("");
    setProfile("");
    setOwner("");
    setAddress("");
    setCanRequest(true);

   
 }

  return (
    <>
          <Card>
            <Card.Header>
                    New Restaurant Form
            </Card.Header>
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={onNameChange}   required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile</Form.Label>
                        <Form.Control type='url' value={profile} onChange={onProfileChange}  required />
                    </Form.Group>
                   <Form.Group>
                   <Form.Label>Select Region</Form.Label>
                    <Form.Select type="text" value={address} onChange={onAddressChange} aria-label="Default select example">
                        <option default disabled>Choose One</option>
                        <option value="mandalay">mandalay</option>
                        <option value="yangon">yangon</option>
                        <option value="maymyo">maymyo</option>
                   </Form.Select>
                   </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' value={description} onChange={onDescriptionChange}  required />
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

export default Create
