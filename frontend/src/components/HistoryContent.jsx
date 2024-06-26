import React from "react";
import ShowHistory from "./ShowHistory";
import SideInfo from "./SideInfo";

export default function HistoryContent() {
  return (
    <div className="bg-white main h-full">
      <div className="w-full h-full flex overflow-hidden">
        <div className="w-full lg:w-3/4 h-full border">
          <div className="w-full h-10 bg-red-500 flex items-center p-5 sticky top-0 border-b-2">
            <h1 className="text-white font-semibold">
              Your Water Usage History
            </h1>
          </div>
          <div className="w-full h-full overflow-y-scroll">
            <div className="w-full h-auto mt-1 p-5">
              <h2 className="text-gray-500 text-xs">Today</h2>
              <hr className="my-2" />
              <ShowHistory literUsed="25" timestamp="24/25/2020" />
            </div>
            <div className="w-full h-auto mt-1 p-5">
              <h2 className="text-gray-500 text-xs">Yesterday</h2>
              <hr className="my-2" />
              <ShowHistory literUsed="25" timestamp="24/25/2020" />
            </div>
            <div className="w-full h-auto mt-1 p-5">
              <h2 className="text-gray-500 text-xs">Past days</h2>
              <hr className="my-2" />
              <ShowHistory literUsed="25" timestamp="24/25/2020" />
              <ShowHistory literUsed="25" timestamp="24/25/2020" />
              <ShowHistory literUsed="25" timestamp="24/25/2020" />
              <ShowHistory literUsed="25" timestamp="24/25/2020" />
            </div>
          </div>
        </div>
        <SideInfo />
      </div>
    </div>
  );
}
