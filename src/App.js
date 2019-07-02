import React from 'react';
import WeatherDisplay from './WeatherDisplay'
import './App.css'
import { Nav, Navbar, Jumbotron, Container, NavItem, Button, Form,FormControl, Dropdown } from "react-bootstrap";
import data_rus from './city.list.rus'
import data_eng from './city.list.eng'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchButton = this.searchButton.bind(this);
    this.state = {activePlace: 0, data: data_eng};
  }

  searchButton() {
    let city = this.city.value;
    for (let i = 0; i < Object.keys(this.state.data).length; i++) {
      if (this.state.data[i].name.toLowerCase() === city.toLowerCase()) {
        return(
          this.setState({
            activePlace: i
          })
        );
      }
    }
  }

  renderButton(index) {
    return (
      <NavItem>
        <Nav.Link onClick={() => (this.setState({activePlace: index}))}>
          {this.state.data[index].name}
        </Nav.Link>
      </NavItem>
    );
  }

  render() {
    console.log(this.state.data);
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
            {this.renderButton(5)}
          </Nav>
          <Form inline>
            <FormControl ref={(ref) => {this.city = ref}} type="text" placeholder="Kiev" className="mr-sm-2" />
            <Button onClick={this.searchButton} variant="outline-success">Search</Button>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Language
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => (this.setState({data: data_eng}))}>
                  English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => (this.setState({data: data_rus}))}>
                  Russian
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar>
        <Container className={"mt-auto"}>
          <Jumbotron>
            <Container>
              <WeatherDisplay key={activePlace} place={this.state.data[activePlace]}/>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;