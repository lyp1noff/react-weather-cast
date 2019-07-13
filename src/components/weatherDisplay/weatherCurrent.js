import React from 'react';
import './weatherDisplay.css'
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";

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
    if (!weatherData) return <Spinner animation="border" />;
    const iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    return (
      <div>
        <p className="description">
          {this.props.place.name} - {weatherData.main.temp.toFixed()}°С
          <br/>
        </p>
        <div>
          <p className="description" style={{textTransform: "capitalize"}}>
            {weatherData.weather[0].description}<img src={iconUrl} alt={weatherData.description}/>
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

export default WeatherCurrent;
