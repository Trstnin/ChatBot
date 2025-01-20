import React from "react";
import { Link } from "react-router-dom";

function NavigationLink(props) {
  return (
    <Link
    className="navlink"
      to={props.to}
      style={{ background: props.bg, color: props.textcolor }}
    >
      {props.text}
    </Link>
  );
}

export default NavigationLink;
