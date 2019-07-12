import React from 'react';
import Main from "./main/main";
import { BrowserRouter, Route, } from 'react-router-dom'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Route path='/' component={Main} />
      </BrowserRouter>
    );
  }
}

export default App;
