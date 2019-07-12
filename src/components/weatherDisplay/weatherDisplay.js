import React from 'react';
import './weatherDisplay.css'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";

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
      axios.defaults.baseURL = 'http://api.openweathermap.org/';
      axios.get("data/2.5/weather",
        {params: {id, appid: "5cec0145e4c7a8df41c2a081f2b2c509", units: "Metric", lang: "ru"}})
        .then(response => {
          this.setState({ weatherData: response.data });
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
      return <h1>Город {this.props.activePlace} не найден</h1>
    }
    const iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    return (
      <div>
        <p className="description">
          {this.props.place.name} - {weatherData.weather[0].description}
          <img src={iconUrl} alt={weatherData.description} />
        </p>
        <p>Текущая температура: {weatherData.main.temp}°С</p>
        <p>Максимальная: {weatherData.main.temp_max}°С</p>
        <p>Минимальная: {weatherData.main.temp_min}°С</p>
        <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
      </div>
    );
  }
}

export default WeatherDisplay;
