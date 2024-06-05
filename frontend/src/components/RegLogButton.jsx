import React from "react";
import { Link } from "react-router-dom";

function RegLogButton(props) {
  return (
    <button
      type="submit"
      onClick={props.click}
      className="bg-white font-normal hover:bg-red-500 hover:text-white text-sm text-dblue py-1 px-4 my-1 w-full rounded"
    >
      {props.value}
    </button>
  );
}

export default RegLogButton;
