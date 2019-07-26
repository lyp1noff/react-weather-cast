import React from 'react';
import {Container, Jumbotron} from "react-bootstrap";
import './home.css'

function Home() {
  return(
    <Container className={"home"}>
      <Jumbotron className={"home"}>
        <h1>Прогноз погоды</h1>
      </Jumbotron>
    </Container>
  )
}

export default Home
