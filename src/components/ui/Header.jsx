import React from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getRoles } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import {
  FaUserCircle,
  FaHamburger,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import classes from "./header.module.css";

const Header = () => {
  const roles = useSelector(getRoles);

  return (
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

            {/* Add Menu Link */}
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
          </Nav>

          {/* Search Bar */}
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

          {/* Cart Icon */}
          <div className={classes.cartIcon}>
            <FaShoppingCart size={25} />
            <span className={classes.cartCount}>3</span>
          </div>

          {/* User Profile Dropdown */}
          <div className={classes.profileDropdown}>
            <FaUserCircle size={30} />
            <div className={classes.dropdownContent}>
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/logout">Logout</Link>
            </div>
          </div>
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle as="a" className="btn btn-link">
                <i className="bi bi-person"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/login">
                  Login
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/additionalForms">
                  Additional Forms
                </Dropdown.Item>
                <Dropdown.Item href="#">Orders</Dropdown.Item>
                <Dropdown.Item href="#">Deliveries</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {roles.includes("DRIVER") && (
              <Nav.Link as={Link} to="/driver" className="text-warning">
                <i class="bi bi-car-front"></i>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
