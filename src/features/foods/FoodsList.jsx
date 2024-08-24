import { useDispatch, useSelector } from "react-redux";

import { fetchAllMenus, getAllMenus, getError, getStatus } from "./foodSlice";
import { Container, Row } from "react-bootstrap";
import Foods from "./Foods";
import { useEffect } from "react";
import classes from "./foods.module.css";


const FoodList = () => {
  
    const menus = useSelector(getAllMenus);
    const status = useSelector(getStatus);
    const error = useSelector(getError);
    const dispatch = useDispatch();
  
    console.log(menus);
  
    useEffect(() => {
      if(status === "idle"){
        dispatch(fetchAllMenus());
      }
    },[status,dispatch])
  
    let content = "";
  
    if(status==='loading'){
      content =<p> Loading...... </p>
     }
  
     if(status === "success"){
        console.log(menus)
        content =  menus?.map(menu => (
            <Foods
              key={menu.id}
              image={menu.image}
              name={menu.name}
              
            />

          ));
     }
    
  
     if(status === "failed"){
      content = <p> {error} </p>
     }



return (
    <section className={classes.menu_section}>
      <Container>
       
        <Row>
            {content}
            
          
        </Row>
        </Container>
        </section>
    )
}

    export default FoodList