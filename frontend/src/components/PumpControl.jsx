import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SlidersVertical } from "lucide-react";
import { setHistoryAlert } from "../features/alert/alertSlice";
import addWaterUsage from "../apis/addWaterUsage";
import { updatePump } from "../features/tank/tankSlice";
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
  const dispatch = useDispatch();
  const tankData = useSelector((state) => state.tank.tankinfo);
  const token = useSelector((state) => state.auth.token);
  const pumpState = useSelector((state) => state.tank.tankinfo.pumpState);
  console.log("Pump state being received :", pumpState);
  const [startWaterLevel, setStartWaterLevel] = useState(null);
  const [endWaterLevel, setEndWaterLevel] = useState(null);

  useEffect(() => {
    socket.on("pumpStateChanged", (newPumpState) => {
      dispatch(updatePump(newPumpState));
      if (newPumpState) {
        setStartWaterLevel(tankData.waterLevel);
      } else {
        const date = new Date();
        const localTimeOffset = date.getTimezoneOffset() * 60000;
        const localTime = new Date(date.getTime() - localTimeOffset);
        const formattedTime = localTime.toISOString().slice(0, -1);
        console.log("Formatted time:", formattedTime);
        setEndWaterLevel(tankData.waterLevel);
        if (startWaterLevel !== null) {
          const litersUsed = startWaterLevel - endWaterLevel;
          const success = addWaterUsage(token, litersUsed, formattedTime);
          if (success) {
            dispatch(setHistoryAlert(true));
          } else {
            dispatch(setHistoryAlert(false));
          }
          setEndWaterLevel(0);
        }
      }
    });

    return () => {
      socket.off("pumpStateChanged");
    };
  }, [startWaterLevel, tankData.waterLevel]);

  const handleClick = () => {
    socket.emit("togglePump");
  };

  return (
    <div className="w-full h-full pumpcontrol flex justify-evenly">
      <div className="flex flex-col justify-even">
        <h2 className="font-bold text-base md:font-semibold text-red-500 whitespace-nowrap flex justify-center gap-3 text-center">
          PUMP CONTROL <SlidersVertical />
        </h2>
        <div className="w-full h-full flex flex-col justify-even items-center">
          <div className="w-full h-auto mt-10 flex flex-col lg:flex-row-reverse justify-center items-center lg:pr-8 md:pr-8 gap-12">
            <div
              className={`w-full flex flex-col justify-center text-center h-auto ${
                pumpState ? "bg-green-600" : "bg-red-500"
              } p-3 rounded-md text-white`}
            >
              <h2 className="font-semibold text-2xl my-2 whitespace-nowrap">
                Pump State
              </h2>
              <h3 className="text-lg">{pumpState ? "OPEN" : "CLOSED"}</h3>
            </div>
            <div className="w-full flex justify-center text-center">
              <button
                onClick={handleClick}
                className={`w-15 h-15 sm:w-15 sm:h-15 lg:w-10 md:w-10 lg:h-10 md:h-10 p-16  text-white ${
                  pumpState ? "bg-red-700" : "bg-green-600"
                } shadow-md border-8 border-red-200 border-opacity-2 rounded-full m-1 md:m-3 text-center flex items-center justify-center`}
              >
                <h2 className="font-bold text-xl md:font-semibold whitespace-nowrap">
                  {pumpState ? "OFF" : "ON"}
                </h2>
              </button>
            </div>
          </div>
          <div className="w-full mt-12">
            <p className="text-center text-1xs md:text-xs lg:text-xs text-gray-400">
              *This only controls the pump that supplies your household
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
