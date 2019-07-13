import React from 'react';
import { BrowserRouter, Route, } from 'react-router-dom'
import Main from "./main/main";
import Header from "./header/header";

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
