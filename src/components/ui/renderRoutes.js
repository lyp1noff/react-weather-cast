import React from 'react';
import WeatherCurrent from "../weatherDisplay/weatherCurrent";
import { Route, Switch } from "react-router-dom";
import data from "../../assets/json/city.list";
import { Col, Row, Spinner } from "react-bootstrap";
import WeatherDaily from "../weatherDisplay/weatherDaily";

function RenderRoutes() {
  const routes = [];
  for (const [index] of data.entries()) {
    console.log(WeatherCurrent);
    routes.push(
      <Route exact path={"/"+data[index].url} key={index} component={() => {
        return (
          <Row>
            <Col lg={8} className={"left"}>
              <Switch>
                <Route exact path={"/"+data[index].url} key={index} component={() => {
                  return <WeatherCurrent key={index} place={data[index]}/>}}
                />
              </Switch>
            </Col>
            <Col className={"right"}>
              <Switch>
                <Route exact path={"/"+data[index].url} key={index} component={() => {
                  return <WeatherDaily key={index} place={data[index]}/>}}
                />
              </Switch>
            </Col>
          </Row>
        )}}
      />
    )
  }
  return(
    <Switch>
      {routes}
      <Route exact path={"/200"} component={() => {return <Spinner animation="border"/>}}/>
      <Route exact path={"/"} component={() => {return <h1>Прогноз погоды</h1>}}/>
      <Route exact component={() => {return <h1>Город не найден</h1>}}/>
    </Switch>
  )
}

export default RenderRoutes
