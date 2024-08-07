import React from "react";

export default function Item(props) {
  return (
    <div className="text-white bg-red-500 shadow-md rounded-md w-24 md:w-52 h-auto p-1 m-1 md:m-3 md:p-4 text-center flex justify-center items-center md:justify-between">
      <div className="text-center md:text-left">
        <h2 className="text-xs md:font-semibold whitespace-nowrap">
          {props.title}
        </h2>
        <h3 className="font-semibold text-sm whitespace-nowrap">
          {props.content}
        </h3>
      </div>
      <span className="md:flex justify-center items-center hidden">
        {props.icon}
      </span>
    </div>
  );
}
