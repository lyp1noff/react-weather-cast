import React from 'react';
import WeatherDisplay from './WeatherDisplay'
import './App.css'
import { Nav, Navbar, Jumbotron, Container, Dropdown, DropdownButton, Form, FormControl, InputGroup,
  Button} from "react-bootstrap";
import data from './city.list'
import localization from './localization'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchButton = this.searchButton.bind(this);
    this.state = {activePlace: 0, lang: localStorage.getItem('lang') || "eng"};
  }

  searchButton() {
    let i = 0;
    let city = this.city.value;
    for (; i < Object.keys(data).length; i++) {
      if (this.state.lang === "rus") {
        if (data[i].rus_name.toLowerCase() === city.toLowerCase()) {
          break
        }
      } else {
        if (data[i].name.toLowerCase() === city.toLowerCase()) {
          break
        }
      }
    }
    return(
      this.setState({
        activePlace: i
      })
    );
  }
  
  renderButton(index) {
    if (this.state.lang === "rus") {
      return (
        <Nav.Link onClick={() => (this.setState({activePlace: index}))}>
          {data[index].rus_name}
        </Nav.Link>
      );
    } else {
      return (
        <Nav.Link onClick={() => (this.setState({activePlace: index}))}>
          {data[index].name}
        </Nav.Link>
      );
    }
  }

  render() {
    if (localStorage.getItem('lang') !== this.state.lang) {
      localStorage.setItem('lang', this.state.lang);
    }
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
              {this.renderButton(5)}
            </Nav>
            <Form inline>
              <InputGroup>
                <FormControl
                  placeholder={localization[0].search[this.state.lang]}
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  ref={(ref) => {this.city = ref}}
                />
                <InputGroup.Append>
                  <Button onClick={this.searchButton} variant="outline-secondary">
                    {localization[0].search[this.state.lang]}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={localization[0].language[this.state.lang]}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item onClick={() => (this.setState({lang: "eng"}))}>
                  English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => (this.setState({lang: "rus"}))}>
                  Russian
                </Dropdown.Item>
              </DropdownButton>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container className={"mt-auto"}>
          <Jumbotron>
            <Container>
              <WeatherDisplay key={activePlace} place={data[activePlace]} lang={this.state.lang}/>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;