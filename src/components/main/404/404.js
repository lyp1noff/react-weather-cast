import {Container, Jumbotron} from "react-bootstrap";
import React from "react";
import './404.css'

function Error() {
  return (
    <Container className={"error"}>
      <Jumbotron className={"error"}>
        <h1 className={"error"}>Город не найден</h1>
      </Jumbotron>
    </Container>
  );
}

export default Error;
