import React from "react";

export default function Item(props) {
  return (
    <div className="text-white bg-red-500 shadow-md rounded-md w-24 sm:w-32 md:w-44 lg:w-52 h-auto p-2 sm:p-3 md:p-4 text-center flex justify-center items-center md:justify-between">
      <div className="text-center md:text-left flex-1">
        <h2 className="text-[0.70rem] sm:text-[0.25rem] lg:text-sm md:text-sm md:font-semibold whitespace-nowrap">
          {props.title}
        </h2>
        <h3 className="text-[0.70rem] sm:text-[0.25rem] lg:text-sm md:text-sm whitespace-nowrap">
          {props.content}
        </h3>
      </div>
      <span className="hidden md:flex justify-center items-center">
        {props.icon}
      </span>
    </div>
  );
}
