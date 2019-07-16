import React from 'react';
import axios from 'axios';
import {Col, Jumbotron, Row, Spinner} from "react-bootstrap";

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeatherData: null, dailyWeatherData: null
    };
  }

  componentDidMount() {
    const id = this.props.place.id;
    axios.defaults.baseURL = 'http://api.openweathermap.org/';
    axios.get("data/2.5/weather",
      {params: {id, appid: "5cec0145e4c7a8df41c2a081f2b2c509", units: "Metric", lang: "ru"}})
      .then(response => {
        this.setState({currentWeatherData: response.data})
      });
    axios.get("data/2.5/forecast",
      {params: {id, appid: "5cec0145e4c7a8df41c2a081f2b2c509", units: "Metric"}})
      .then(response => {
        this.setState({dailyWeatherData: response.data})
      });
  }

  renderCurrentWeather() {
    const currentWeatherData = this.state.currentWeatherData;
    const iconUrl = require("../../assets/icons/" + currentWeatherData.weather[0].icon + ".png");
    return (
      <div className={"currentWeather"}>
        <p className="info">
          {this.props.place.name} - {currentWeatherData.main.temp.toFixed()}°С
          <br/>
        </p>
        <div>
          <p className="info description" id={""}>
            {currentWeatherData.weather[0].description}
            <img src={iconUrl} alt={currentWeatherData.description}/>
          </p>
        </div>
        <p>Максимальная: {currentWeatherData.main.temp_max}°С</p>
        <p>Минимальная: {currentWeatherData.main.temp_min}°С</p>
        <p>Влажность воздуха: {currentWeatherData.main.humidity}%</p>
        <p>Скорость ветра: {currentWeatherData.wind.speed} м/с</p>
      </div>
    )
  }

  renderDailyWeather() {
    const dailyWeatherData = this.state.dailyWeatherData;
    const elements = [];
    const days = [];
    const daysName = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
    for (let i = 0; i<36; i++) {
      if (new Date(dailyWeatherData.list[i].dt*1000).getHours() === 18 && i > 6) {
        days.push(i)
      }
    }
    for (const [, value] of days.entries()) {
      elements.push(
        <p key={value}>
          {daysName[new Date(dailyWeatherData.list[value].dt*1000).getDay()]} {
          dailyWeatherData.list[value].main.temp.toFixed()}/
          {dailyWeatherData.list[value+4].main.temp.toFixed()}°С
          <img src={require("../../assets/icons/" + dailyWeatherData.list[value].weather[0].icon + ".png")}
               alt={dailyWeatherData.description} />
        </p>
      )
    }
    return (
      <div className={"dailyBlock"}>
        {elements}
      </div>
    );
  }

  render() {
    if (!this.state.currentWeatherData || !this.state.dailyWeatherData) return (
      <Jumbotron>
        <div className={"error"}>
          <Spinner animation="border"/>
        </div>
      </Jumbotron>
    );
    return (
      <Jumbotron>
        <Row>
          <Col lg={8} className={"left"}>
            {this.renderCurrentWeather()}
          </Col>
          <Col className={"right"}>
            {this.renderDailyWeather()}
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default WeatherDisplay;
