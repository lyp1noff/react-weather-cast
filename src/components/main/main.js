import React from 'react';
import './main.css';
import {Spinner} from "react-bootstrap"
import { Route, Switch } from "react-router-dom";
import WeatherDisplay from "./weatherDisplay/weatherDisplay";
import WeatherTable from "./weatherTable/weatherTable";
import Firebase from '../../configs/firebase';
import Home from "./home/home";
import Error from "./404/404";

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
        <div className={"loader center"}>
          <Spinner animation="border"/>
        </div>
      )
    }
    else return(
      <Switch>
        <Route exact path={"/"} component={() => {return <Home/>}}/>
        <Route exact path={"/table"} component={() => {return <WeatherTable DataBaseData={this.state.DataBaseData}/>}}/>
        {this.routes()}
        <Route exact component={() => {return <Error/>}}
        />
      </Switch>
    );
  }
}

export default Main;
