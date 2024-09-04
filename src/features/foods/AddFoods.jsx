import React, { useState } from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createNewMenu } from './foodSlice'

const AddFoods = () => {


        const [name,setName] = useState('')
        const [picture,setImageName] = useState('')
        const [price,setPrice] = useState('')
        const [description,setDescription] = useState('')
        const [avaliable,setAvaliable] = useState('')
        
      
        const [canRequest,setCanRequest] = useState(true)
        const disptch = useDispatch()
        const onNameInputChange = (e) => {setName(e.target.value)}
        const onImageNameInputChange = (e) => {setImageName(e.target.value)}
        const onPriceChange = (e) => {setPrice(e.target.value)}
        const onDescriptionChange = (e) => {setDescription(e.target.value)}
        const onAvaliableChange = (e) => {setAvaliable(e.target.value)}
        
        
       
        
        
    
        const canCreate = [name,picture,price,description,avaliable,canRequest].every(Boolean)
    
        const onSubmit = (event) => {
    
    
            event.preventDefault()
    
            if (canCreate) {
                setCanRequest(false)
                const food = {
                    name,
                    picture,
                    price,
                    description,
                    avaliable
                }
                disptch(createNewMenu(food))
                setName('')
                setImageName('')
                setPrice('')
                setDescription('')
                setAvaliable('')
                
                setCanRequest(true)
    
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
                                onChange={onImageNameInputChange}
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
                        <Form.Group>
                            <Form.Label>Avaliable</Form.Label>
                                <Form.Control 
                                
                                type='text'
                                value={avaliable}
                                onChange={onAvaliableChange}
                                required
                                />
                            
                        </Form.Group>


                        <Button variant='primary' type='submit' disabled={!canCreate} >Create</Button>

                    </Form>
                </Card.Body>

            </Card.Header>
    </Col>
  )
}

export default AddFoods