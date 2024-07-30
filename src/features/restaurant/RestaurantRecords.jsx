import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRestaurant, getAllRestaurant, getStatus } from './restaurantSlice';
import RestaurantRow from './RestaurantRow';
import { Card, Table } from 'react-bootstrap';
import classes from "./table.module.css"


const RestaurantRecords = () => {
 
 const restaurants = useSelector(getAllRestaurant);
 const status = useSelector(getStatus);
 const dispatch = useDispatch();

 useEffect(() => {
    if(status==='idle'){
      dispatch(fetchAllRestaurant());
    }
  },[status,dispatch]);

  return (
   

   
   <Card>
    <button className='btn btn-primary d-inline-block'>Create Restaurant</button>
     <Table striped bordered hover className={classes.table}>  
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Address</th>
          <th>Handle</th>
        </tr>
      </thead>
      <tbody>
       {restaurants.map(restaurant => <RestaurantRow key={restaurant.id} id={restaurant.id} name={restaurant.name} owner={restaurant.owner_id} address={restaurant.address_id}></RestaurantRow>)}
      </tbody>
    </Table>
   </Card>
   

  );
};

export default RestaurantRecords;