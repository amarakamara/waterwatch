import React, { useState } from "react";

export default function PumpControl() {
  const [pumpstate, setPumpstate] = useState(false);

  const handleClick = () => {
    setPumpstate(!pumpstate);
  };
  return (
    <div className="box-1 p-2 border bg-red-500 text-white rounded-md flex justify-evenly">
      <button
        onClick={handleClick}
        className={`w-10 h-10 p-16 text-white ${
          pumpstate ? "bg-red-700" : "bg-green-600"
        } shadow-md border-8 border-red-200 border-opacity-2 rounded-full m-1 md:m-3 text-center flex items-center justify-center`}
      >
        <h2 className="font-bold text-md md:font-semibold whitespace-nowrap">
          {pumpstate ? "OFF" : "ON"}
        </h2>
      </button>
      <div className="flex flex-col justify-center text-center">
        <h2 className="font-semibold text-2xl my-2">Pump State</h2>
        <h3 className="text-lg">{pumpstate ? "OPEN" : "CLOSED"}</h3>
      </div>
    </div>
  );
}
