import React from 'react';
import {Spinner} from "react-bootstrap";

function Loader() {
  return(
    <div className={"error"}>
      <Spinner animation="border"/>
    </div>
  );
}

export default Loader
