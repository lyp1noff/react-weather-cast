import React from 'react';
import './header.css'
import { Nav, Navbar, Form, FormControl, InputGroup, Button} from "react-bootstrap"
import RenderButtons from "../ui/renderButtons";
import Firebase from "../ui/firebaseConfig";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.database = Firebase.database().ref();
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
    if (city !== "") {
      const index = data.findIndex(item => item.name.toLowerCase() === city.toLowerCase().trim());
      if (index === -1) {
        return this.props.history.push('/404')
      } else {
        return this.props.history.push('/'+data[index].url)
      }
    }
  }

  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Прогноз погоды</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <RenderButtons/>
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
