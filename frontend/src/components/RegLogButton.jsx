import React from "react";
import { Link } from "react-router-dom";

function RegLogButton(props) {
  return (
    <button
      type="submit"
      onClick={props.click}
      className="bg-white font-normal hover:bg-cyan-700 hover:text-white text-sm text-blue py-1 px-4 my-1 w-full rounded"
    >
      {props.value}
    </button>
  );
}

export default RegLogButton;
