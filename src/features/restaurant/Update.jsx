import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {  getRestaurntById, updateRestaurnt } from './restaurantSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

    const {restaurantId} = useParams();
    const restaurant = useSelector((state)=> getRestaurntById(state,restaurantId));
    console.log(restaurant);
    const navigate = useNavigate();


    const [profile,setProfile] = useState(restaurant?.profile);
    const [name,setName] = useState(restaurant?.name);
    const [description,setDescription] = useState(restaurant?.description);
    const [address,setAddress] = useState(restaurant?.address);
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

   
    dispatch(updateRestaurnt(
        {id:restaurant.id,
         profile,
        name,
        address_id:address,
        description
   }
   ))
    navigate("/");

   
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
                      <Button variant='primary' type='submit' > Update </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}

export default Update
