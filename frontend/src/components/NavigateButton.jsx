import React from "react";

function NavigateButton(props) {
  return (
    <a className="text-sm text-white mx-4" href={props.to}>
      {props.icon}
    </a>
  );
}

export default NavigateButton;
