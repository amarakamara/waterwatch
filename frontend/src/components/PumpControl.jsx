import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SlidersVertical } from "lucide-react";
import io from "socket.io-client";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

const socket = io(apiBase, {
  transports: ["websocket"],
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default function PumpControl() {
  const tankData = useSelector((state) => state.tank.tankinfo);
  const pumpStatus = tankData.pumpState;
  const [pumpstate, setPumpstate] = useState(false);

  useEffect(() => {
    socket.on("pumpStateChanged", (newPumpState) => {
      setPumpstate(newPumpState);
    });
    return () => {
      socket.off("pumpStateChanged");
    };
  }, []);

  const handleClick = () => {
    socket.emit("togglePump");
  };

  return (
    <div className="box-1 px-2 py-4 border bg-white rounded-md flex justify-evenly">
      <div className="w-auto h-auto flex flex-col justify-even">
        <h2 className="font-bold text-base md:font-semibold text-red-500 whitespace-nowrap flex justify-center gap-3 text-center">
          PUMP CONTROL <SlidersVertical />
        </h2>
        <div className="w-full h-auto mt-10 flex justify-center items-center pr-8 gap-10">
          <button
            onClick={handleClick}
            className={`w-10 h-10 p-16  text-white ${
              pumpstate ? "bg-red-700" : "bg-green-600"
            } shadow-md border-8 border-red-200 border-opacity-2 rounded-full m-1 md:m-3 text-center flex items-center justify-center`}
          >
            <h2 className="font-bold text-md md:font-semibold whitespace-nowrap">
              {pumpstate ? "OFF" : "ON"}
            </h2>
          </button>
          <div className=" w-1/2 flex flex-col justify-center text-center h-auto bg-red-500 p-3 rounded-md text-white">
            <h2 className="font-semibold text-2xl my-2 whitespace-nowrap">
              Pump State
            </h2>
            <h3 className="text-lg">{pumpstate ? "OPEN" : "CLOSED"}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
