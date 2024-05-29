import React from "react";

function MoreInfo(props) {
  return (
    <div className="text-center text-white w-30 max-h-30 h-30 mx-2 my-4 p-4 rounded bg-white bg-opacity-15">
      <h3>{props.title}</h3>
      <h2>{props.value}</h2>
    </div>
  );
}

export default MoreInfo;
