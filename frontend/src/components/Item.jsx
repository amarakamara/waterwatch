import React from "react";

export default function Item(props) {
  return (
    <div className="w-1/2 text-white bg-red-500 shadow-md rounded-md m-1 md:m-3 p-2 md:p-4 text-center flex justify-center md:justify-between">
      <div className="text-center md:text-left">
        <h2 className="font-bold text-xs md:font-semibold whitespace-nowrap">{props.title}</h2>
        <h3 className="text-sm whitespace-nowrap">{props.content}</h3>
      </div>
      <span className="md:flex justify-center items-center hidden">{props.icon}</span>
    </div>
  );
}
