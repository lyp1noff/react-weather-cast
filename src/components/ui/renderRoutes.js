import React from 'react';
import { Route, Switch } from "react-router-dom";
import WeatherDisplay from "../weatherDisplay/weatherDisplay";
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
      <Route exact path={"/"} component={() => {return <div className={"single"}><h1>Прогноз погоды</h1></div>}}/>
      <Route exact component={() => {return <div className={"single"}><h1>Город не найден</h1></div>}}/>
    </Switch>
  )
}

export default RenderRoutes
