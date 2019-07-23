import React from 'react';
import './main.css';
import {Container, Jumbotron, Spinner} from "react-bootstrap"
import { Route, Switch } from "react-router-dom";
import WeatherDisplay from "../weatherDisplay/weatherDisplay";
import WeatherTable from "../weatherTable/weatherTable";
import Firebase from '../../configs/firebase';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.database = Firebase.database().ref();
    this.state = {
      DataBaseData: null
    }
  }

  componentWillMount() {
    this.database.on('value', snap => {
      this.setState({
        DataBaseData: snap.val()
      })
    });
  }

  routes() {
    const DataBaseData = this.state.DataBaseData.cities;
    const routes = [];
    for (const [index] of DataBaseData.entries()) {
      routes.push(
        <Route exact path={"/"+DataBaseData[index].url} key={index} component={() => {
          return (
            <Route exact path={"/"+DataBaseData[index].url} key={index} component={() => {
              return <WeatherDisplay key={index} city={DataBaseData[index]}/>}}
            />
          )}}
        />
      )
    }
    return routes;
  }

  render() {
    if (!this.state.DataBaseData) {
      return(
        <div className={"error center"}>
          <Spinner animation="border"/>
        </div>
      )
    }
    return(
      <Switch>
        <Route exact path={"/"} component={() => {return <WeatherTable DataBaseData={this.state.DataBaseData}/>}}/>
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
