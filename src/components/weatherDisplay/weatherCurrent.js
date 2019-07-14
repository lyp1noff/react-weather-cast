import React from 'react';
import './weatherDisplay.css'
import axios from 'axios';
import { withRouter } from "react-router-dom";

class WeatherCurrent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const id = this.props.place.id;
    axios.defaults.baseURL = 'http://api.openweathermap.org/';
    axios.get("data/2.5/weather",
      {params: {id, appid: "5cec0145e4c7a8df41c2a081f2b2c509", units: "Metric", lang: "ru"}})
      .then(response => {
        this.setState({ weatherData: response.data });
      });
  }

  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return null;
    const iconUrl = require("../../assets/icons/" + weatherData.weather[0].icon + ".png");
    return (
      <div className={"currentWeather"}>
        <p className="info">
          {this.props.place.name} - {weatherData.main.temp.toFixed()}°С
          <br/>
        </p>
        <div>
          <p className="info description" id={""}>
            {weatherData.weather[0].description}
            <img style={{paddingBottom: '3px'}} width="32" height="34" src={iconUrl} alt={weatherData.description}/>
          </p>
        </div>
        <p>Средняя температура: {weatherData.main.temp}°С</p>
        <p>Максимальная: {weatherData.main.temp_max}°С</p>
        <p>Минимальная: {weatherData.main.temp_min}°С</p>
        <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
      </div>
    );
  }
}

export default withRouter(WeatherCurrent);
