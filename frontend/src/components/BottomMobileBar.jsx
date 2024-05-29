import React from "react";
import NavigateButton from "./NavigateButton";

function BottomMobileBar() {
  return (
    <div
      className="bg-blue w-full h-30 absolute bottom-0 n py-2 px-4 flex justify-center"
      style={{
        border: "none",
        borderTop: "1px solid white",
      }}
    >
      <div className="w-full h-auto flex flex-row justify-center">
        <NavigateButton to="/home" icon="home" />
        <NavigateButton to="/forecast" icon="Forecasts" />
        <NavigateButton to="/history" icon="History" />
        <NavigateButton to="/profile" icon="Profile" />
      </div>
    </div>
  );
}

export default BottomMobileBar;
