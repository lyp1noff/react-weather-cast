import React from 'react';
import WeatherDisplay from './WeatherDisplay'
import './App.css'
import { Nav, Navbar, Jumbotron, Container, NavDropdown, Form,FormControl } from "react-bootstrap";
import data_rus from './city.list.rus'
import data_eng from './city.list.eng'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchButton = this.searchButton.bind(this);
    this.state = {activePlace: 0, data: data_eng, lang: localStorage.getItem('lang') || data_eng};
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

  componentDidMount() {
    this.updateLanguage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.lang !== this.state.lang) {
      this.updateLanguage();
    }
  }

  updateLanguage() {
    if (this.state.lang === "rus") {
      this.setState({data: data_rus})
    } else {
      this.setState({data: data_eng})
    }
  }

  switchLang(lang) {
    this.setState({lang: lang});
  }

  renderButton(index) {
    return (
      <Nav.Link onClick={() => (this.setState({activePlace: index}))}>
        {this.state.data[index].name}
      </Nav.Link>
    );
  }

  render() {
    localStorage.setItem('lang', this.state.lang);
    console.log(this.state.data);
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
              <NavDropdown title="Language" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => (this.switchLang("eng"))}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => (this.switchLang("rus"))}>Russian</NavDropdown.Item>
              </NavDropdown>
              <FormControl
                placeholder="Search"
                type="input"
                ref={(ref) => {this.city = ref}}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.searchButton();
                  }
                }}
              />
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Container className={"mt-auto"}>
          <Jumbotron>
            <Container>
              <WeatherDisplay key={activePlace} place={this.state.data[activePlace]} lang={this.state.lang}/>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;