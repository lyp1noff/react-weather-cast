import React from 'react';
import {  Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import RenderRoutes from "../ui/renderRoutes";
import './main.css';

class Main extends React.Component {
  render() {
    return(
      <Container className={"mt-auto"}>
        <RenderRoutes/>
      </Container>
    );
  }
}

export default Main;
