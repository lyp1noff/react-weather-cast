import React from 'react';
import WeatherDisplay from '../weatherDisplay/weatherDisplay'
import './main.css'
import { Nav, Navbar, Jumbotron, Container, Form, FormControl, InputGroup, Button} from "react-bootstrap"
import data from '../../assets/json/ru.city.list'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activePlace: localStorage.getItem('activePlace') || 0}
  }

  componentDidMount() {
    if (isNaN(this.state.activePlace)) {
      this.setState({activePlace: 0})
    }
  }

  search() {
    const city = this.city.value;
    if (city !== "") {
      const index = data.findIndex(function (item) {
        return item.name.toLowerCase() === city.toLowerCase().replace(/(^\s*)|(\s*)$/g, '')
      });
      if (index === -1) {
        return this.setState({activePlace: city})
      } else {
        return this.setState({activePlace: index})
      }
    }
  }

  render() {
    if (localStorage.getItem('activePlace') !== this.state.activePlace) {
      localStorage.setItem('activePlace', this.state.activePlace);
    }
    const activePlace = this.state.activePlace;
    const places = [0, 1, 2, 3, 4];
    const buttons = [];
    for (const [index, value] of places.entries()) {
      buttons.push(<Nav.Link key={value} onClick={() => (this.setState({activePlace: index}))}
        >{data[value].name}</Nav.Link>)
    }
    return(
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Прогноз погоды</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {buttons}
            </Nav>
            <Form inline>
              <InputGroup>
                <FormControl
                  onSubmit={() => (this.search())}
                  placeholder="Поиск"
                  aria-label="Search"
                  ref={(ref) => {this.city = ref}}
                />
                <InputGroup.Append>
                  <Button onClick={() => (this.search())} variant="outline-secondary">
                    Поиск
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container className={"mt-auto"}>
          <Jumbotron>
            <Container>
              <WeatherDisplay key={activePlace} place={data[activePlace]} activePlace={activePlace}/>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default Main;
