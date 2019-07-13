import React from 'react';
import './main.css'
import { Jumbotron, Container, Row } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import RenderCurrentRoutes from "../ui/renderCurrentRoutes";
import RenderDailyRoutes from "../ui/renderDailyRoutes";

class Main extends React.Component {
  render() {
    return(
      <Container className={"mt-auto"}>
        <Jumbotron>
          <Row>
            <RenderCurrentRoutes/>
            <RenderDailyRoutes/>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

export default Main;
