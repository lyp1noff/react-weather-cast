import React from 'react';
import './main.css'
import { Jumbotron, Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import RenderRoutes from "../ui/renderRoutes";

class Main extends React.Component {
  render() {
    return(
      <Container className={"mt-auto"}>
        <Jumbotron>
          <RenderRoutes/>
        </Jumbotron>
      </Container>
    );
  }
}

export default Main;
