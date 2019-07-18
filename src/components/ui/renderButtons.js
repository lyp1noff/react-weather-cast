import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Nav} from "react-bootstrap";
import data from "../../assets/json/city.list";

function Buttons() {
  const places = [0, 1, 2, 3, 4];
  const buttons = [];
  for (const [, value] of places.entries()) {
    buttons.push(
      <LinkContainer to={"/"+data[value].url} key={value}>
        <Nav.Link>{data[value].name}</Nav.Link>
      </LinkContainer>
    )
  }
  return buttons
}

export default Buttons
