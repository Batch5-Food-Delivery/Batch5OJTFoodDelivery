import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmModel from '../../components/ui/ConfirmModel';
import { useDispatch } from 'react-redux';
import { deleteRestaurant } from './restaurantSlice';

const RestaurantRow = ({name,owner,address,id}) => {

    const [showModal,setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onModalClose = () => {
        setShowModal(false);
    }

    const onDelete = () => {
        dispatch(deleteRestaurant(id));
    }

    const dataToDel ={
        onModalClose,
        onDelete,
        name
    }
  return (
    
   <tr>
    <td>{name}</td>
    <td>{owner}</td>
    <td>{address}</td>
    <td>
        <button className='btn btn-primary' onClick={() => {navigate(`/admin/restaurant/update/${id}`) }}>Edit</button>
        <button className='btn btn-danger' onClick ={() => { setShowModal(true)}}>Delete</button>
        {showModal && <ConfirmModel data={dataToDel} />}
    </td>
    
  </tr>

  
  )
}

export default RestaurantRow
