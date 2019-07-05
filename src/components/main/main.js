import React from 'react';
import WeatherDisplay from '../weatherDisplay/weatherDisplay'
import './main.css'
import { Nav, Navbar, Jumbotron, Container, Form, FormControl, InputGroup, Button} from "react-bootstrap"
import data from '../../assets/json/city.list'
import CityButton from '../ui/cityButton'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activePlace: 0};
  }

  search() {
    // let i = 0;
    let city = this.city.value;
    const find = Object.keys(data).toLowerCase().findIndex(function(item){
      return item.name === city
    });
    console.log(find);
    return this.setState({activePlace: find})





    // for (; i < Object.keys(data).length; i++) {
    //   if (data[i].name.toLowerCase() === city.toLowerCase()) {
    //     return(
    //       this.setState({
    //         activePlace: i
    //       })
    //     );
    //   } else if (i === Object.keys(data).length - 1) {
    //     return(
    //       this.setState({
    //         activePlace: city
    //       })
    //     );
    //   }
    // }



  }

  render() {
    console.log(data);
    const activePlace = this.state.activePlace;
    const elements = [0, 1, 2, 3, 4];
    const buttons = [];
    for (const [index, value] of elements.entries()) {
      buttons.push(<CityButton key={value} onClick={() => (this.setState({activePlace: index}))} title={data[value].name}/>)
    }
    return(
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Weather Forecast</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {buttons}
            </Nav>
            <Form inline>
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  ref={(ref) => {this.city = ref}}
                />
                <InputGroup.Append>
                  <Button onClick={() => (this.search)} variant="outline-secondary">
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
              <WeatherDisplay key={activePlace} place={data[activePlace]} activePlace={activePlace}/>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default Main;
