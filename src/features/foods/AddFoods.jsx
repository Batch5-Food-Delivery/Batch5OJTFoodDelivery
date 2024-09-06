import React, { useState } from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createNewMenu } from './foodSlice'

const AddFoods = () => {


        const [name,setName] = useState('')
        const [picture,setImageName] = useState('')
        const [price,setPrice] = useState('')
        const [description,setDescription] = useState('')
        const [category,setCategory] = useState('')
        const [discount,setDiscount] = useState('')
        const [available,setAvaliable] = useState(true)
        
      
        const [canRequest,setCanRequest] = useState(true)
        const disptch = useDispatch()
        const onNameInputChange = (e) => {setName(e.target.value)}
        const onImageNameInputChange = (e) => {setImageName(e.target.value)}
        const onPriceChange = (e) => {setPrice(e.target.value)}
        const onDescriptionChange = (e) => {setDescription(e.target.value)}
        const onCategoryChange = (e) => {setCategory(e.target.value)}
        const onDiscountChange = (e) => {setDiscount(e.target.value)}
        const onAvailableChange = (e) => {setAvaliable(e.target.value === 'true')}
        
        
       
        
        
    
        const canCreate = [name,picture,price,description,category,discount,canRequest].every(Boolean)
    
        const onSubmit = (event) => {
    
    
            event.preventDefault()
    
            if (canCreate) {
                setCanRequest(false)
                const food = {
                    name,
                    picture,
                    price,
                    description,
                    category,
                    discount,
                    available
                }
                disptch(createNewMenu(food))
                setName('')
                setImageName('')
                setPrice('')
                setDescription('')
                setCategory('')
                setDiscount('')
                setAvaliable(true)
                
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
                            <Form.Label>Category</Form.Label>
                                <Form.Control 
                                
                                type='text'
                                value={category}
                                onChange={onCategoryChange}
                                required
                                />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Discount</Form.Label>
                                <Form.Control 
                                
                                type='text'
                                value={discount}
                                onChange={onDiscountChange}
                                required
                                />
                            
                        </Form.Group>
                            
                        
                        <Form.Group>
              <Form.Label>Availability</Form.Label>
              <div>
                <Form.Check
                  type='radio'
                  label='Available'
                  value={true}
                  checked={available === true}
                  onChange={onAvailableChange}
                  name='availability'
                  required
                />
                <Form.Check
                  type='radio'
                  label='Unavailable'
                  value={false}
                  checked={available === false}
                  onChange={onAvailableChange}
                  name='availability'
                  required
                />
              </div>
            </Form.Group>


                        <Button variant='primary' type='submit' disabled={!canCreate} >Create</Button>

                    </Form>
                </Card.Body>

            </Card.Header>
    </Col>
  )
}

export default AddFoods