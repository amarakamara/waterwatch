import React from "react";
import { useSelector } from "react-redux";

export default function SideInfo() {
  const tankData = useSelector((state) => state.tank.tankinfo);

  let turbidity;

  if (tankData.turbidity >= 3000) {
    turbidity = "Clean";
  } else if (tankData.turbidity < 3000) {
    turbidity = "Dirty";
  }
  return (
    <div className="hidden lg:flex w-1/4 h-full p-5 flex-col items-center justify-center bg-dblue border-[0.1px] text-white">
      <div className="bg-red-500 rounded-md m-2 w-full h-40 flex flex-col justify-center items-center text-base font-semibold p-4">
        <h2> Water Level</h2>
        <h2 className="text-xl">{tankData.waterLevel} Liters</h2>
      </div>
      <div className="bg-red-500 rounded-md m-2 w-full h-40 flex flex-col justify-center items-center text-base font-semibold p-4">
        <h2>Pump State</h2>
        <h2 className="text-xl">{tankData.pumpState ? "ON" : "OFF"}</h2>
      </div>
      <div className="bg-red-500 rounded-md m-2 w-full h-40 flex flex-col justify-center items-center text-base font-semibold p-4">
        <h2>Turbidity Level</h2>
        <h2 className="text-xl">{turbidity}</h2>
      </div>
      <div className="bg-red-500 rounded-md m-2 w-full h-40 flex flex-col justify-center items-center text-base font-semibold p-4">
        <h2>Temperature Level</h2>
        <h2 className="text-xl">{tankData.temp} C</h2>
      </div>
    </div>
  );
}
