import React from 'react';
import WeatherDisplay from '../weatherDisplay/weatherDisplay'
import './main.css'
import { Nav, Navbar, Jumbotron, Container, Form, FormControl, InputGroup, Button} from "react-bootstrap"
import data from '../../assets/json/ru.city.list'
import CityButton from '../ui/cityButton'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activePlace: 0};
  }

  search() {
    let city = this.city.value;
    const index = data.findIndex(function(item){
      return item.name.toLowerCase() === city.toLowerCase().replace(/(^\s*)|(\s*)$/g, '')
    });
    if (index === -1) {
      return this.setState({activePlace: city})
    } else {
      return this.setState({activePlace: index})
    }
  }

  render() {
    const activePlace = this.state.activePlace;
    const elements = [0, 1, 2, 3, 4];
    const buttons = [];
    for (const [index, value] of elements.entries()) {
      buttons.push(<CityButton key={value} onClick={() => (this.setState({activePlace: index}))}
                               title={data[value].name}/>)
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
