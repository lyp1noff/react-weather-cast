import React from 'react';
import './weatherTable.css'
import {Container, Jumbotron, Spinner} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";

class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      weatherData: null
    };
  }

  // componentDidMount() {
  //   axios.get("http://api.openweathermap.org/data/2.5/weather",
  //     {params: {id: 703448, appid: "5cec0145e4c7a8df41c2a081f2b2c509", units: "Metric", lang: "ru"}})
  //     .then(response => {
  //       this.setState({weatherData: response.data})
  //     });
  // }

  renderTable() {
    const data = this.state.data;
    var tableData = [{}];
    for (const [index] of data.entries()) {
      tableData.push({});
      tableData[index]["id"] = index;
      tableData[index]["name"] = data[index].name;
      tableData[index]["temp"] = 24 + "°С";
    }
    tableData.pop();

    const columns = [{
      dataField: 'name',
      text: 'City',
      sort: true
    }, {
      dataField: 'temp',
      text: 'Temperature',
      sort: true
    }];



    console.log(this.state.weatherData);
    console.log(tableData);
    return(
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={tableData}
        columns={columns}
      />
    )
  }

  render() {
    if (!this.state.data) {
      return(
        <div className={"error center"}>
          <Spinner animation="border"/>
        </div>
      )
    }
    return(
      <Container className={"weatherTable"}>
        <h1 style={{textAlign: "center", marginBottom: '5%'}}>React Weather Forecast</h1>
        <Jumbotron>
          {this.renderTable()}
        </Jumbotron>
      </Container>
    )
  }
}

export default WeatherTable;
