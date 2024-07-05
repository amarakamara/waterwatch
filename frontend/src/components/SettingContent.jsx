import React from "react";
import SideInfo from "./SideInfo";

export default function SettingContent() {
  return (
    <div className="bg-white main h-full">
      <div className="w-full h-full flex overflow-hidden">
        <div className="w-full lg:w-3/4 h-full border">
          <div className="w-full h-10 bg-red-500 flex items-center px-2 sticky top-0 border-b-2">
            <h1 className="text-white font-semibold">Setting</h1>
          </div>
          <div className="w-full h-full overflow-y-scroll flex flex-col gap-4 px-2 py-5">
            <div className="w-full h-auto">
              <h2 className="text-gray-500 text-xs">Profile</h2>
              <hr className="my-2" />
            </div>
            <div className="w-full h-auto">
              <h2 className="text-gray-500 text-xs">Tank</h2>
              <hr className="my-2" />
            </div>
            <div className="w-full h-auto">
              <h2 className="text-gray-500 text-xs">Others</h2>
              <hr className="my-2" />
            </div>
          </div>
        </div>
        <SideInfo />
      </div>
    </div>
  );
}
