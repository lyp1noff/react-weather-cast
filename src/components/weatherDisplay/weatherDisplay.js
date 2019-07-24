import React from 'react';
import {Col, Container, Jumbotron, Row, Spinner} from "react-bootstrap";
import './weatherDisplay.css';
import WeatherIcon from 'react-icons-weather';
import localization from '../../assets/json/localization'

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WeatherData: null
    };
  }

  componentDidMount() {
    const name = this.props.city.url;
    if (name) {
      var OAuth = require('oauth');
      var header = {
        "X-Yahoo-App-Id": "mYMrzv64"
      };
      var request = new OAuth.OAuth(
        null,
        null,
        'dj0yJmk9dVRadkp2WktSanJQJmQ9WVdrOWJWbE5jbnAyTmpRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWVk',
        '34f2dcb2d5bb6972c377a171fc2a1f6577b8caa2',
        '1.0',
        null,
        'HMAC-SHA1',
        null,
        header
      );
      request.get(
        'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=' + name + '&format=json&u=c',
        null,
        null,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            this.setState({WeatherData: JSON.parse(data)})
          }
        }
      );
    }
  }

  renderWeather() {
    const WeatherData = this.state.WeatherData;
    const elements = [];
    const daysName = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
    for (let i = 0; i < 5; i++) {
      elements.push(
        <p key={i}>
          {daysName[new Date(WeatherData.forecasts[i].date*1000).getDay()]} {WeatherData.forecasts[i].high}/
          {WeatherData.forecasts[i].low}°С
          <WeatherIcon name="yahoo" iconId={WeatherData.forecasts[i].code.toString()} flip="horizontal" rotate="90" />
        </p>
      )
    }
    console.log(WeatherData.current_observation.condition.text);
    return (
      <Row>
        <Col lg={8} className={"left"}>
          <div className={"currentWeather"}>
            <p className="info">
              {this.props.city.name} - {WeatherData.current_observation.condition.temperature}°С
            </p>
            <div>
              <p className="info description" id={""}>
                {localization[WeatherData.current_observation.condition.text]}
                <WeatherIcon name="yahoo" iconId={WeatherData.current_observation.condition.code.toString()}
                             flip="horizontal" rotate="90" />
              </p>
            </div>
            <p>Максимальная: {WeatherData.forecasts[0].high}°С</p>
            <p>Минимальная: {WeatherData.forecasts[0].low}°С</p>
            <p>Влажность воздуха: {WeatherData.current_observation.atmosphere.humidity}%</p>
            <p>Скорость ветра: {WeatherData.current_observation.wind.speed} м/с</p>
          </div>
        </Col>
        <Col className={"right"}>
          <div className={"dailyBlock"}>
            {elements}
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    if (this.props.city === "err")
      return(
        <div className={"error center"}>
          <Spinner animation="border"/>
        </div>
      );
    else if (!this.state.WeatherData)
      return (
        <Container className={"weatherDisplay"}>
          <Jumbotron className={"weatherDisplay"}>
            <div className={"error weather"}>
              <Spinner animation="border"/>
            </div>
          </Jumbotron>
        </Container>
    );
    return (
      <Container className={"weatherDisplay"}>
        <Jumbotron className={"weatherDisplay"}>
          {this.renderWeather()}
        </Jumbotron>
      </Container>
    );
  }
}

export default WeatherDisplay;
