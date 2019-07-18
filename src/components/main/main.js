import React from 'react';
import './main.css';
import {Container, Jumbotron} from "react-bootstrap"
import { Route, Switch } from "react-router-dom";
import WeatherDisplay from "../weatherDisplay/weatherDisplay";
import WeatherTable from "../weatherTable/weatherTable";
import Firebase from '../../configs/firebase';

class Main extends React.Component {
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

  routes() {
    const data = this.state.data;
    if (!data) return (
      <Route exact component={() => {return <WeatherDisplay place={"err"}/>}}/>
    );
    const routes = [];
    for (const [index] of data.entries()) {
      routes.push(
        <Route exact path={"/"+data[index].url} key={index} component={() => {
          return (
            <Route exact path={"/"+data[index].url} key={index} component={() => {
              return <WeatherDisplay key={index} place={data[index]}/>}}
            />
          )}}
        />
      )
    }
    return routes;
  }

  render() {
    return(
      <Switch>
        <Route exact path={"/"} component={() => {return <WeatherTable data={this.state.data}/>}}/>
        {this.routes()}
        <Route exact component={() => {return (
          <Container className={"weatherDisplay"}>
            <Jumbotron className={"weatherDisplay"}>
              <h1 className={"error"}>Город не найден</h1>
            </Jumbotron>
          </Container>)}}
        />
      </Switch>
    );
  }
}

export default Main;
