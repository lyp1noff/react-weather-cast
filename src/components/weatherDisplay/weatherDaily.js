import React from 'react';
import './weatherDisplay.css'
import axios from 'axios';

class WeatherDaily extends React.Component {
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
    const iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    return (
      <div className={"dailyBlock"}>
        <p>
          14 Июля - 25/20°С
          <img src={iconUrl} alt={weatherData.description} />
        </p>
        <p>
          15 Июля - 26/19°С
          <img src={iconUrl} alt={weatherData.description} />
        </p>
        <p>
          16 Июля - 22/16°С
          <img src={iconUrl} alt={weatherData.description} />
        </p>
        <p>
          17 Июля - 22/19°С
          <img src={iconUrl} alt={weatherData.description} />
        </p>
        <p>
          18 Июля - 22/18°С
          <img src={iconUrl} alt={weatherData.description} />
        </p>
      </div>
    );
  }
}

export default WeatherDaily;
