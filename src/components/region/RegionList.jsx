import React, { useEffect } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRegions, getAllRegions, getError, getStatus } from './regionSlice'
import Region from './Region'

const FoodList = () => {
  
  const regions = useSelector(getAllRegions);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  console.log(regions);

  useEffect(() => {
    if(status === "idle"){
      dispatch(fetchAllRegions());
    }
  },[status,dispatch])

  let content = "";

  if(status==='loading'){
    content =<p> Loading...... </p>
   }

   if(status === "success"){
      content = regions.map(region => <Region key={region.id} id={region.id} name={region.name} image={region.image} /> );
   }

   if(status === "failed"){
    content = <p> {error} </p>
   }

  return (
    <Container fluid className='p-0'>
       <Card>
           <Card.Img  style={{height:'30rem'}} variant="top" src="/images/home-cover.jpg" />
       </Card>

      <Container>
        <h4 className='text-dark text-center mt-5'>Browse Food From Fav Regions</h4>
        <Row className='w-100' >
        {content}
        </Row>
      </Container>
    </Container>
  )
}

export default FoodList
