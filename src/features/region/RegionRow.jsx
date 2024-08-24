import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import ConfirmModel from '../../components/ui/ConfirmModel';
import { deleteRegion } from './regionSlice';

const RegionRow = ({name,id}) => {
    const [showModal,setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onModalClose = () => {
        setShowModal(false);
    }

    const onDelete = () => {
        dispatch(deleteRegion(id));
        navigate("/admin/region");
    }
    const dataToDel ={
        onModalClose,
        onDelete,
        name
    }
  return (
   <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>
        <button className='btn btn-primary' onClick={() => {navigate(`/admin/region/update/${id}`)}}>Edit</button>
        <button className='btn btn-danger' onClick ={() => { setShowModal(true)}}>Delete</button>
    </td>
    {showModal && <ConfirmModel data={dataToDel}/>}
  </tr>
  )
}

export default RegionRow
