import React from 'react';
import './header.css'
import {Nav, Navbar, Form, FormControl, InputGroup, Button} from "react-bootstrap"
import Buttons from "../ui/renderButtons";
import Firebase from '../../configs/firebase';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.database = Firebase.database().ref("0/cities");
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    this.database.on('value', snap => {
      this.setState({
        data: snap.val()
      })
    });
  }

  search(city) {
    const data = this.state.data;
    if (city && city !== "") {
      const index = data.findIndex(item => item.name.toLowerCase() === city.toLowerCase().trim());
      if (index === -1) {
        return this.props.history.push('/404')
      } else {
        return this.props.history.push('/'+data[index].url)
      }
    }
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      this.search(this.city.value);
    }
  };

  render() {
    if (!this.state.data) return null;
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Прогноз погоды</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Buttons data={this.state.data}/>
          </Nav>
          <Form inline>
            <InputGroup>
              <FormControl
                onKeyPress={this.handleKeyPress}
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
