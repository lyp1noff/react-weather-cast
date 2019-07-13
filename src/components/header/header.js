import React from 'react';
import './header.css'
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Form, FormControl, InputGroup, Button} from "react-bootstrap"
import data from '../../assets/json/city.list'

class Header extends React.Component {
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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Прогноз погоды</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {Header.renderButtons()}
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
    );
  }
}

export default Header;
