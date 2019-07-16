import React from 'react';
import { Route, Switch } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import WeatherDisplay from "../ui/weatherDisplay";
import WeatherTable from "../ui/weatherTable";
import data from "../../assets/json/city.list";

function RenderRoutes() {
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
  return(
    <Switch>
      {routes}
      <Route exact path={"/"} component={() => {return <WeatherTable/>}}/>
      <Route exact component={() => {return <Jumbotron><h1 className={"error"}>Город не найден</h1></Jumbotron>}}/>
    </Switch>
  )
}

export default RenderRoutes
