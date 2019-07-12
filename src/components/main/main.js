import React from 'react';
import WeatherDisplay from '../weatherDisplay/weatherDisplay'
import './main.css'
import { Route, } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Jumbotron, Container, Form, FormControl, InputGroup, Button} from "react-bootstrap"
import data from '../../assets/json/city.list'

class Main extends React.Component {
  search(city) {
    if (city !== "") {
      const index = data.findIndex(item => item.name.toLowerCase() === city.toLowerCase().trim());
      if (index === -1) {
        return this.props.history.push('/404')
      } else {
        return this.props.history.push('/'+data[index].url)
      }
    }
  }

  renderRoute() {
    const route = [];
    for (const [index] of data.entries()) {
      route.push(
        <Route exact path={"/"+data[index].url} key={index} component={() => {
          return <WeatherDisplay key={index} place={data[index]} activePlace={index}/>}}
        />
      )
    }
    return route
  }

  static renderButtons() {
    const places = [0, 1, 2, 3, 4];
    const buttons = [];
    for (const [, value] of places.entries()) {
      buttons.push(
        <LinkContainer to={"/"+data[value].url} key={value}>
          <Nav.Link>{data[value].name}</Nav.Link>
        </LinkContainer>
      )
    }
    return buttons
  }

  render() {
    return(
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Прогноз погоды</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {Main.renderButtons()}
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
                  <Button onClick={() => (this.search(this.city.value))} variant="outline-secondary">
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
              {this.renderRoute()}
              <Route exact path={"/404"} component={() => {
                return <h1>Город не найден</h1>}}
              />
              <Route exact path={"/"} component={() => {
                return <h1>Прогноз погоды</h1>}}
              />
            </Container>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default Main;
