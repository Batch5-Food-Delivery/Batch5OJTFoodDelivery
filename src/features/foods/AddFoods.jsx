import React, { useState } from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createNewMenu } from './foodSlice'

const AddFoods = () => {


    const [name,setName] = useState('')
        const [image,setImageName] = useState('')
        
      
        const [canRequest,setCanRequest] = useState(true)
        const disptch = useDispatch()
        const onNameInputChange = (e) => {setName(e.target.value)}
        const onImageNameInputChange = (e) => {setImageName(e.target.value)}
        
        
       
        
        
    
        const canCreate = [name,image,canRequest].every(Boolean)
    
        const onSubmit = (event) => {
    
    
            event.preventDefault()
    
            if (canCreate) {
                setCanRequest(false)
                const menu = {
                    name,
                    image
                }
                disptch(createNewMenu(menu))
                setName('')
                setImageName('')
                
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
                                value={image}
                                onChange={onImageNameInputChange}
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