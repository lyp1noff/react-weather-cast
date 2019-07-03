import React from 'react';
import './WeatherDisplay.css'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";
import localization from './localization'

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    try {
      const id = this.props.place.id;
      axios.get("http://api.openweathermap.org/data/2.5/weather?id=" + id +
        "&appid=5cec0145e4c7a8df41c2a081f2b2c509&units=Metric&lang=ru")
        .then(response => response.data)
        .then((data) => {
          this.setState({ weatherData: data });
        });
    } catch (err) {
      this.setState({
        weatherData: "err"
      })
    }
  }

  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <Spinner animation="border" />;
    else if (weatherData === "err") {
      return (
        <div>
          <h1>{localization[0].error[this.props.lang]}</h1>
        </div>
      );
    }
    const iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    if (this.props.lang === "rus") {
      return (
        <div>
          <h1>
            {weatherData.weather[0].main} в {this.props.place.rus_name}
            <img src={iconUrl} alt={weatherData.description} />
          </h1>
          <p>Текущая температура: {weatherData.main.temp}°</p>
          <p>Максимальная температура: {weatherData.main.temp_max}°</p>
          <p>Минимальная температура: {weatherData.main.temp_min}°</p>
          <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>
            {weatherData.weather[0].main} in {this.props.place.name}
            <img src={iconUrl} alt={weatherData.description} />
          </h1>
          <p>Current: {weatherData.main.temp}°</p>
          <p>High: {weatherData.main.temp_max}°</p>
          <p>Low: {weatherData.main.temp_min}°</p>
          <p>Wind Speed: {weatherData.wind.speed} meter/sec</p>
        </div>
      );
    }
  }
}

export default WeatherDisplay;