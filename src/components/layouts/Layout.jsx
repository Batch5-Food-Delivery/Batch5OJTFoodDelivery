import React from "react";
import { Card, Container, Carousel } from "react-bootstrap";
import Header from "../ui/Header";
import { Outlet } from "react-router-dom";
import classes from "./layout.module.css";
import CarouselComponent from "../ui/CarouselComponent";

const Layout = () => {
  return (
    <Container fluid className="p-0">
      <Header />

      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default Layout;
