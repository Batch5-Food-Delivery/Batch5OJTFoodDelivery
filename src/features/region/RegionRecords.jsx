import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'react-bootstrap';
import classes from "./table.module.css"
import { fetchAllRegions, getAllRegions, getStatus } from './regionSlice';
import RegionRow from './RegionRow';


const RegionRecords = () => {
 
 const regions = useSelector(getAllRegions);
 const status = useSelector(getStatus);
 const dispatch = useDispatch();

 useEffect(() => {
    if(status==='idle'){
      dispatch(fetchAllRegions());
    }
  },[status,dispatch]);

  return (
   

   
   <Card>
    <button className='btn btn-primary d-inline-block'>Region Create</button>
     <Table striped bordered hover className={classes.table}>  
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Handle</th>
        </tr>
      </thead>
      <tbody>
       {regions.map(region => <RegionRow key={region.id} id={region.id} name={region.name} ></RegionRow>)}
      </tbody>
    </Table>
   </Card>
   

  );
};

export default RegionRecords;