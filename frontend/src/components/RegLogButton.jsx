import React from "react";
import { Link } from "react-router-dom";

function RegLogButton(props) {
  return (
    <button
      type="submit"
      onClick={props.click}
      className="bg-white hover:bg-cyan-700 hover:text-white text-blue font-bold py-2 px-4 m-4 w-full rounded"
    >
      {props.value}
    </button>
  );
}

export default RegLogButton;
