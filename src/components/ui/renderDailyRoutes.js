import React from 'react';
import WeatherDaily from "../weatherDisplay/weatherDaily";
import { Route, Switch } from "react-router-dom";
import data from "../../assets/json/city.list";
import {Col} from "react-bootstrap";

function RenderDailyRoutes() {
  const routes = [];
  for (const [index] of data.entries()) {
    routes.push(
      <Route exact path={"/"+data[index].url} key={index} component={() => {
        return <WeatherDaily key={index} place={data[index]}/>}}
      />
    )
  }
  return(
    <Col className={"right"}>
      <Switch>
        {routes}
        <Route component={() => {return null}}/>
      </Switch>
    </Col>
  );
}

export default RenderDailyRoutes
