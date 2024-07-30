import React, { useEffect } from 'react'
import {  Container, Row } from 'react-bootstrap'
import { fetchAllRestaurant, getAllRestaurant, getError, getStatus } from './restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import Restaurant from './Restaurant';

const RestaurantList = () => {

    const restaurants = useSelector(getAllRestaurant);
    const status = useSelector(getStatus);
    const error = useSelector(getError);
    const dispatch = useDispatch();
  
    console.log(restaurants);
  
    useEffect(() => {
      if(status === "idle"){
        dispatch(fetchAllRestaurant());
      }
    },[status,dispatch])
  
    let content = "";
  
    if(status==='loading'){
      content =<p> Loading...... </p>
     }
  
     if(status === "success"){
       content = restaurants.map(restaurant => <Restaurant key={restaurant.id} id={restaurant.id} name={restaurant.name} description={restaurant.description} profile={restaurant.profile} /> );
     }
  
     if(status === "failed"){
      content = <p> {error} </p>
     }

  return (
    <Container fluid className='p-0'>
   
      
  

   <Container>
     <h4 className='text-dark text-center mt-5'> Browse Food From Hot Restaurants </h4>
     <Row className='w-100' >
     {content}
     </Row>
   </Container>
 </Container>
  )
}

export default RestaurantList
