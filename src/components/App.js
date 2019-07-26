import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Header from "./header/header";
import Main from "./main/main";

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Route path='/' component={Header}/>
        <Route path='/' component={Main}/>
      </BrowserRouter>
    );
  }
}

export default App;
