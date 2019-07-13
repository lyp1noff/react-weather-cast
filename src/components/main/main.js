import React from 'react';
import WeatherDisplay from '../weatherDisplay/weatherDisplay'
import './main.css'
import { Route, Switch } from "react-router-dom";
import { Jumbotron, Container } from "react-bootstrap"
import data from '../../assets/json/city.list'

class Main extends React.Component {
  renderRoute() {
    const routes = [];
    for (const [index] of data.entries()) {
      routes.push(
        <Route exact path={"/"+data[index].url} key={index} component={() => {
          return <WeatherDisplay key={index} place={data[index]}/>}}
        />
      )
    }
    return routes
  }

  render() {
    return(
      <Container className={"mt-auto"}>
        <Jumbotron>
          <Container>
            <Switch>
              {this.renderRoute()}
              <Route exact path={"/"} component={() => {return <h1>Прогноз погоды</h1>}}/>
              <Route component={() => {return <h1>Город не найден</h1>}}/>
            </Switch>
          </Container>
        </Jumbotron>
      </Container>
    );
  }
}

export default Main;
