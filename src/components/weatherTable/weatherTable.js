import React from 'react';
import './weatherTable.css'
import {Container, Jumbotron} from "react-bootstrap";

class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return(
      <Container className={"weatherTable"}>
        <Jumbotron>
          <h1>TABLE</h1>
        </Jumbotron>
      </Container>
    )
  }
}

export default WeatherTable;
