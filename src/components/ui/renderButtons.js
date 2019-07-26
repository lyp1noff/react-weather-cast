import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Nav} from "react-bootstrap";

function Buttons(props) {
  const data = props.data;
  const places = [0, 1, 2, 3, 4];
  const buttons = [
    <LinkContainer to={"/table"}>
      <Nav.Link>Таблица</Nav.Link>
    </LinkContainer>
  ];
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
