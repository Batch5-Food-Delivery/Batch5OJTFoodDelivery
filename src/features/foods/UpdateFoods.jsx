import React, { useState } from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMenuById, updateMenu } from './foodSlice'


const UpdateFoods = () => {

    const { menuId} = useParams()
    const menu = useSelector((state) => getMenuById(state,menuId))

    const [picture,setPicture] = useState(menu?.picture)
    const [name,setName] = useState(menu?.name)
    const [price,setPrice] = useState(menu?.price)
    const [description,setDescription] = useState(menu?.description)
    
    const [canRequest,setCanRequest] = useState(true)
    const disptch = useDispatch()
    const navigate = useNavigate()

    const onPictureInputChange = (e) => {setPicture(e.target.value)}
    const onNameInputChange = (e) => {setName(e.target.value)}
    const onPriceChange = (e) => {setPrice(e.target.value)}
    const onDescriptionChange = (e) => {setDescription(e.target.value)}
 
    
    

    const canUpdate = [picture,name,price,description,canRequest].every(Boolean)

    const onSubmit = (event) => {


        event.preventDefault()

        if (canUpdate && menu.id) {
            setCanRequest(false)
            const menu = {
                id:menuId,
                picture,
                name,
                price,
                description
               
            }
            disptch(updateMenu(menu))
            
           navigate('/')

        }

        
    }
  return (
    <Col md={6} className='mx-auto'>
    
            <Card.Header>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        

                    <Form.Group>
                            <Form.Label>Name</Form.Label>
                                <Form.Control 
                                
                                type='text'
                                value={name}
                                onChange={onNameInputChange}
                                required
                                />
                            
                        </Form.Group>

                        


                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                                <Form.Control 
                                
                                type='url'
                                value={picture}
                                onChange={onPictureInputChange}
                                required
                                />
                            
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                                <Form.Control 
                                
                                type='text'
                                value={price}
                                onChange={onPriceChange}
                                required
                                />
                            
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                                <Form.Control 
                                
                                type='text'
                                value={description}
                                onChange={onDescriptionChange}
                                required
                                />
                            
                        </Form.Group>

                       

                        <Button variant='primary' type='submit' disabled={!canUpdate} >Create</Button>

                    </Form>
                </Card.Body>

            </Card.Header>
    </Col>
  )
}

export default UpdateFoods