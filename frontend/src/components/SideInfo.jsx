import React from "react";

export default function SideInfo() {
  return (
    <div className="hidden lg:flex w-1/4 h-full p-5 flex-col items-center justify-center bg-dblue border text-white">
      <div className="bg-red-500 rounded-md m-2 w-full h-40">Water Level</div>
      <div className="bg-red-500 rounded-md m-2 w-full h-40">PumpState</div>
      <div className="bg-red-500 rounded-md m-2 w-full h-40">
        Turbidity level
      </div>
      <div className="bg-red-500 rounded-md m-2 w-full h-40">
        Temperature Level
      </div>
    </div>
  );
}
