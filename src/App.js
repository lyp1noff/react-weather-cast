import React from 'react';
import WeatherDisplay from './WeatherDisplay'
import './App.css'
import { Nav, Navbar, Jumbotron, Container, Form, FormControl, InputGroup,
  Button} from "react-bootstrap";
import data from './city.list'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {activePlace: 0}
  }

  search() {
    let i = 0;
    let city = this.city.value;
    for (; i < Object.keys(data).length; i++) {
      if (data[i].name.toLowerCase() === city.toLowerCase()) {
        return(
          this.setState({
            activePlace: i
          })
        );
      } else if (i === Object.keys(data).length - 1) {
        return(
          this.setState({
            activePlace: 'err'
          })
        );
      }
    }
  }

  renderButton(index) {
    return (
      <Nav.Link onClick={() => (this.setState({activePlace: index}))}>
        {data[index].name}
      </Nav.Link>
    );
  }

  render() {
    const activePlace = this.state.activePlace;
    return(
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Weather Forecast</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.renderButton(0)}
              {this.renderButton(1)}
              {this.renderButton(2)}
              {this.renderButton(3)}
              {this.renderButton(4)}
            </Nav>
            <Form inline>
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  ref={(ref) => {this.city = ref}}
                />
                <InputGroup.Append>
                  <Button onClick={this.search} variant="outline-secondary">
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
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
