import React from 'react';
import WeatherDisplay from './WeatherDisplay'
import './App.css'
import { Nav, Navbar, Jumbotron, Container, NavItem, Button, Form,FormControl } from "react-bootstrap";
import data from './city.list.min'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchButton = this.searchButton.bind(this);
    this.state = {activePlace: 0}
  }

  searchButton() {
    let city = this.city.value;
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[i].name.toLowerCase() === city.toLowerCase()) {
        return(
          this.setState({
            activePlace: i
          })
        );
      }
    }
  }

  buttonClick(index) {
    this.setState({
      activePlace: index
    })
  }

  renderButton(index) {
    return (
      <NavItem>
        <Nav.Link onClick={() => (this.buttonClick(index))}>
          {data[index].name}
        </Nav.Link>
      </NavItem>
    );
  }

  render() {
    console.log(data);
    const activePlace = this.state.activePlace;
    return(
      <div>
        <Navbar className="p-auto" bg="dark" variant="dark">
          <Navbar.Brand href={"/"} >Weather Forecast</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="mr-auto">
            {this.renderButton(0)}
            {this.renderButton(1)}
            {this.renderButton(2)}
            {this.renderButton(3)}
            {this.renderButton(4)}
          </Nav>
          <Form inline>
            <FormControl ref={(ref) => {this.city = ref}} type="text" placeholder="Kiev" className="mr-sm-2" />
            <Button onClick={this.searchButton} variant="outline-success">Search</Button>
          </Form>
        </Navbar>
        <Container className={"mt-auto"}>
          <Jumbotron>
            <Container>
              <WeatherDisplay key={activePlace} place={data[activePlace]}/>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;