import React from "react";
import {Nav} from "react-bootstrap";

const CityButton = (props) => {
  return <Nav.Link onClick={props.onClick}>{props.title}</Nav.Link>;
};

export default CityButton;
