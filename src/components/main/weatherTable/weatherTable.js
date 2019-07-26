import React from 'react';
import './weatherTable.css'
import {Container, Jumbotron, Spinner} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Firebase from "../../../configs/firebase";
import axios from "axios";
import Slider from '@material-ui/core/Slider';

class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
    this.arr = [];
    this.weatherData = [];
    this.tableData = [{}];
    this.state = {
      sliderValue: [-45, 45]
    }
  }

  componentWillMount() {
    const DataBaseData = this.props.DataBaseData;
    if (DataBaseData.weatherData.date + 900000 < Date.now() || !DataBaseData.weatherData.data) {
      console.log("RELOADED FROM API");
      for (const [index] of DataBaseData.cities.entries()) {
        this.arr.push(DataBaseData.cities[index].id)
      }
      this.getData();
    }
    if (Object.keys(DataBaseData.cities).length === Object.keys(DataBaseData.weatherData.data).length) {
      for (const [index] of DataBaseData.cities.entries()) {
        this.tableData.push({});
        this.tableData[index]["id"] = index;
        this.tableData[index]["name"] = DataBaseData.cities[index].name;
        this.tableData[index]["temp"] = DataBaseData.weatherData.data[index].main.temp.toFixed() + "°С";
        this.tableData[index]["tempValue"] = DataBaseData.weatherData.data[index].main.temp.toFixed();
      }
    }
    this.tableData.pop();
  }

  getData() {
    let sub = [];
    for (let i = 0; i < 20; i++){
      if (typeof this.arr[i] !== "undefined") sub.push(this.arr[i]);
    }
    this.arr.splice(0,20);
    axios.get("http://api.openweathermap.org/data/2.5/group",
      {params: {id: sub.join(), appid: "5cec0145e4c7a8df41c2a081f2b2c509", units: "metric", lang: "ru"}})
      .then(response => {
        this.weatherData = this.weatherData.concat(response.data.list);
        if (this.arr.length > 0) {
          this.getData()
        }
        var date = new Date();
        Firebase.database().ref('weatherData').set({
          data: this.weatherData,
          date: Date.now(),
          simpleDate: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        });
      });
  }

  renderTable() {
    var filteredTableData = this.tableData.filter((x) => {
      return x.tempValue <= this.state.sliderValue[1] && x.tempValue >= this.state.sliderValue[0];
    });

    const columns = [{
      dataField: 'name',
      text: 'Город',
      sort: true
    }, {
      dataField: 'temp',
      text: 'Температура',
      sort: true
    }];

    return(
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={filteredTableData}
        columns={columns}
      />
    )
  }

  render() {
    if (!this.props.DataBaseData) {
      return(
        <div className={"loader center"}>
          <Spinner animation="border"/>
        </div>
      )
    } else {
      return(
        <Container className={"weatherTable"}>
          <h1 style={{textAlign: "center", marginBottom: '5%'}}>Таблица температур по городам</h1>
          <Jumbotron>
            <Container className={"slider"}>
              <h5>Диапазон температуры <br/> (от {this.state.sliderValue[0]}°С до {this.state.sliderValue[1]}°С)</h5>
              <Slider
                min={-50} max={50}
                value={this.state.sliderValue}
                onChange={(event, newValue) => {this.setState({sliderValue: newValue});}}
                valueLabelDisplay="auto"
              />
            </Container>
            {this.renderTable()}
          </Jumbotron>
        </Container>
      )
    }
  }
}

export default WeatherTable;
