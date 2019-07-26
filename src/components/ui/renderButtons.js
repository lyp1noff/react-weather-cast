import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Nav} from "react-bootstrap";

function Buttons(props) {
  const data = props.data;
  const places = [0, 47, 48, 49, 50];
  const buttons = [
    <LinkContainer to={"/table"} key={0}>
      <Nav.Link>Таблица</Nav.Link>
    </LinkContainer>
  ];
  for (const [, value] of places.entries()) {
    buttons.push(
      <LinkContainer to={"/"+data[value].url} key={value  + 1}>
        <Nav.Link>{data[value].name}</Nav.Link>
      </LinkContainer>
    )
  }
  return buttons
}

export default Buttons
