import React from 'react';
import WeatherCurrent from "../weatherDisplay/weatherCurrent";
import { Route, Switch } from "react-router-dom";
import data from "../../assets/json/city.list";
import { Col } from "react-bootstrap";

function RenderCurrentRoutes() {
  const routes = [];
  for (const [index] of data.entries()) {
    routes.push(
      <Route exact path={"/"+data[index].url} key={index} component={() => {
        return <WeatherCurrent key={index} place={data[index]}/>}}
      />
    )
  }
  return(

    <Col lg={8} className={"left"}>
      <Switch>
        {routes}
        <Route exact path={"/"} component={() => {return <h1>Прогноз погоды</h1>}}/>
        <Route component={() => {return <h1>Город не найден</h1>}}/>
      </Switch>
    </Col>
  )

}

export default RenderCurrentRoutes
