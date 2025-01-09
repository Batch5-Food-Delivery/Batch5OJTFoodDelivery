import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Form,
  FormControl,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getRoles, isLoggedIn, logout } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  FaUserCircle,
  FaHamburger,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import classes from "./header.module.css";
import OrderList from "../../features/order/OrderList";
import { useGetCustomerOrdersQuery } from "../../features/order/orderSlice";
import RestaurantSearchResults from "./RestaurantSearchResults";
import { useSearchRestaurantsQuery } from "../../features/restaurant/restaurantDetailsSlice";

const Header = () => {
  const roles = useSelector(getRoles);
  const orderQuery = useGetCustomerOrdersQuery();
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);
  const [searchTerm, setSearchTerm] = useState("");
  const [enteredSearchTerm, setEnteredSearchTerm] = useState("");

  const ordersPopover = (
    <Popover
      id="orders-popover"
      style={{
        width: "500px",
        "max-width": "none",
        "min-height": "100px",
        "max-height": "85vh",
        overflowY: "scroll",
      }}
    >
      <Popover.Header as="h3">Your Orders</Popover.Header>
      <Popover.Body>
        <Container>
          <OrderList query={orderQuery} canComplete={false}></OrderList>
        </Container>
      </Popover.Body>
    </Popover>
  );

  const searchPopover = (
    <Popover
      id="search-popover"
      className={classes.searchPopover}
      style={{ "max-width": "none", width: "400px" }}
    >
      <Popover.Header as="h3">Search Results</Popover.Header>
      <Popover.Body>
        <RestaurantSearchResults
          query={useSearchRestaurantsQuery(enteredSearchTerm)}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Navbar expand="lg" className={classes.navbarContainer} sticky="top">
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className={classes.navbarBrand}>
            Dreamland Food
          </Navbar.Brand>

          {/* Toggle Button for small screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Menus Link */}
              {/*
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.activeLink}`
                    : classes.link
                }
              >
                <FaHamburger /> Menus
              </NavLink>

             
              <NavLink
                to="/menu/create"
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.activeLink}`
                    : classes.link
                }
              >
                <FaPlus /> Add
              </NavLink>
              */}
            </Nav>

            {/* Search Bar
            <Form className="d-flex mx-auto">
              <FormControl
                type="search"
                placeholder="Search for restaurants or foods"
                className="me-2"
                aria-label="Search"
                style={{ minWidth: "300px" }}
              />
              <Button variant="outline-light" className={classes.searchButton}>
                Search
              </Button>
            </Form>
             */}

            {/* Cart Icon 
            <div className={classes.cartIcon}>
              <FaShoppingCart size={25} />
              <span className={classes.cartCount}>3</span>
            </div>
*/}

            {/* User Profile Dropdown 
            <div className={classes.profileDropdown}>
              <FaUserCircle size={30} />
              <div className={classes.dropdownContent}>
                <Link to="/profile">Profile</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/logout">Logout</Link>
              </div>
            </div>
            */}
            <Nav className="ms-auto">
              <Form
                className="d-flex mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <FormControl
                  type="search"
                  placeholder="Search for restaurants"
                  className="me-2"
                  aria-label="Search"
                  style={{ minWidth: "300px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={searchPopover}
                rootClose
              >
                <Button
                  variant="light"
                  onClick={() => setEnteredSearchTerm(searchTerm)}
                >
                  Search
                </Button>
              </OverlayTrigger>

              <Dropdown align="end">
                <Dropdown.Toggle as="a" className="btn btn-link">
                  <i className="bi bi-person"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {!loggedIn && (
                    <Dropdown.Item as={Link} to="/login">
                      Login
                    </Dropdown.Item>
                  )}
                  {loggedIn && (
                    <Dropdown.Item onClick={() => dispatch(logout())}>
                      Logout
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item as={Link} to="/additionalForms">
                    Additional Forms
                  </Dropdown.Item>
                  {/* 
                  <Dropdown.Item href="#">Orders</Dropdown.Item>
                  <Dropdown.Item href="#">Deliveries</Dropdown.Item>
                  */}
                </Dropdown.Menu>
              </Dropdown>
              {loggedIn && (
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={ordersPopover}
                  rootClose
                >
                  <Nav.Link
                    as="span"
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                  >
                    Orders
                  </Nav.Link>
                </OverlayTrigger>
              )}
              {roles.includes("ROLE_DRIVER") && (
                <Nav.Link as={Link} to="/driver" className="text-warning">
                  <i class="bi bi-car-front"></i>
                </Nav.Link>
              )}
              {roles.includes("ROLE_ADMIN") && (
                <Nav.Link as={Link} to="/admin/foods" className="text-warning">
                  <i>Admin</i>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
