import React from "react";
import { Link } from "react-router-dom";

function NavButton(props) {
  return (
    <button className="bg-white hover:bg-red-500 hover:text-white text-dblue font-bold py-2 px-4 m-4 w-36 rounded">
      <Link to={props.navTo}>{props.value}</Link>
    </button>
  );
}

export default NavButton;
