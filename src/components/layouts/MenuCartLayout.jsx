import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './menuCart.css';


import FoodList from '../../features/foods/FoodsList';
import Cart from '../../features/cart/Cart';

const MenuCartLayout = () => {
  return (

    <div>
    
    <Row className="mt-3 align-items-center"style={{paddingLeft:"20px",paddingRight:"20px"}}>
      <Col md={3}>
        <div>
          <img
            src="data:image/jpeg;base64,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"
            alt="Mont Zay Tan (MICT) vendor logo"
            style={{ width: "100%" }}
          />
        </div>
      </Col>
      <Col md={9}>
        <nav className="bds-c-breadcrumbs">
          <ol className="bds-c-breadcrumbs__list">
            <li className="bds-c-breadcrumbs__list__item">
              <a className="bds-c-link" href="/city/yangon">Yangon</a>
              <div className="bds-c-breadcrumbs__arrow">/</div>
            </li>
            <li className="bds-c-breadcrumbs__list__item">
              <a className="bds-c-link" href="/restaurants/new?lat=16.8482009&lng=96.1336254&expedition=delivery&vertical=restaurants">Restaurant List</a>
              <div className="bds-c-breadcrumbs__arrow">/</div>
            </li>
            <li aria-current="page" className="bds-c-breadcrumbs__list__item bds-c-breadcrumbs__list__item--is-current-page">Baratie</li>
          </ol>
        </nav>
        <ul className="main-info__characteristics">
          <li>Italian</li>
          <li>Pizza</li>
          <li>Chinese</li>
          <li>Asian</li>
          <li>Thai</li>
        </ul>
        <h2>BARATIE</h2>
        
        <div className="main-info__meta-information">
          <div className="vendor-rating">
            <span>4.7/5 (5000+)</span>
          </div>
          <p>See reviews</p>
          <p>More info</p>
          
        </div>
        
        <button className="btn-btn float-end">
            <div className="btn-text"><span><i class="bi bi-heart"></i></span> Add to favourites</div>
        </button>
      </Col>
    </Row>
       
      <Row className="mt-4">
        <Col lg={8}>
          <FoodList/>
        </Col>
        <Col lg={4}>
          <Cart/>
        </Col>
      </Row>
   
    </div>
  );
};

export default MenuCartLayout;
