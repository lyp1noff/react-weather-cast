import React from 'react';
import './weatherTable.css'
import {Container, Jumbotron, Spinner} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Firebase from "../../configs/firebase";
import axios from "axios";

class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
    this.arr = [];
    this.weatherData = [];
    this.tableData = [{}];
  }

  componentWillMount() {
    const DataBaseData = this.props.DataBaseData;
    if (DataBaseData.weatherData.date + 120000 < Date.now() || !DataBaseData.weatherData.data) {
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
        Firebase.database().ref('weatherData').set({
          data: this.weatherData,
          date: Date.now()
        });
      });
  }

  renderTable() {
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
        data={this.tableData}
        columns={columns}
      />
    )
  }

  render() {
    if (!this.props.DataBaseData) {
      return(
        <div className={"error center"}>
          <Spinner animation="border"/>
        </div>
      )
    } else {
      return(
        <Container className={"weatherTable"}>
          <h1 style={{textAlign: "center", marginBottom: '5%'}}>Weather</h1>
          <Jumbotron>
            {this.renderTable()}
          </Jumbotron>
        </Container>
      )
    }
  }
}

export default WeatherTable;
